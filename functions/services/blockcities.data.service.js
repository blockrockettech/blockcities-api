const _ = require('lodash');

const blockcitiesContractService = require('./blockcities.contract.service');
const webflowDataService = require('./webflow/webflowDataService');
const imageBuilderService = require('./imageBuilder.service');
const buildingDataService = require('./building.data.service');

const {backgroundColorwaySwitch} = require('./metadata/background-colours');
const {decorateMetadataName} = require('./metadata/metadata.decorator');
const specialMapping = require('./metadata/special-data-mapping');
const {shortCityNameMapper} = require('./metadata/citymapper');
const {heightMapper, heightInFootDescription} = require('./metadata/height-mapper');
const {isMainnet} = require('./abi/networks');

const config = require('./config');

const padTokenId = (tokenId) => ('000' + tokenId).slice(-4);

const dot = (ethAccount) => ethAccount.substr(0, 4) + '...' + ethAccount.substr(ethAccount.length - 4, ethAccount.length);

class BlockCitiesDataService {

    async tokenPointers(network) {
        return blockcitiesContractService.tokenPointers(network);
    }

    async tokenDetails(network, tokenId) {
        return blockcitiesContractService.tokenDetails(network, tokenId);
    }

    async tokenDetails(network, tokenId) {
        return blockcitiesContractService.tokenDetails(network, tokenId);
    }

    async ownerOfToken(network, tokenId) {
        return blockcitiesContractService.ownerOfToken(network, tokenId);
    }

    async tokensOfOwner(network, owner) {
        return blockcitiesContractService.tokensOfOwner(network, owner);
    }

    async birthEventForToken(network, tokenId) {
        return blockcitiesContractService.birthEventForToken(network, tokenId);
    }

    async tokenMetadata(network, tokenId) {

        const tokenBaseURI = await blockcitiesContractService.tokenBaseURI(network);
        const tokenAttrs = await blockcitiesContractService.tokenDetails(network, tokenId);

        // FIXME this is pony...fix the whole 8 thing
        let bodyConfig, canvasHeight;
        if (parseInt(tokenAttrs.building) === 8) {
            const res = await imageBuilderService.generateNoRoofImageStats(tokenAttrs);
            bodyConfig = res.bodyConfig;
            canvasHeight = res.canvasHeight;
        } else {
            const res = await imageBuilderService.generateImageStats(tokenAttrs);
            bodyConfig = res.bodyConfig;
            canvasHeight = res.canvasHeight;
        }

        const height = heightMapper({
            adjustedWidth: bodyConfig.adjustedBodyWidth,
            pixelHeight: canvasHeight,
            buildingId: tokenAttrs.building,
        });
        const heightClass = heightInFootDescription(height);

        const attrs = decorateMetadataName(tokenAttrs);

        if (tokenAttrs.special !== 0) {
            return {
                name: `${specialMapping[tokenAttrs.special].name}`,
                description: `#${padTokenId(tokenId)}`,
                image: `${tokenBaseURI[0]}${tokenId}/image`,
                background_color: backgroundColorwaySwitch(tokenAttrs.backgroundColorway, tokenAttrs.special).hex,
                attributes: {
                    ...attrs,
                    height: specialMapping[tokenAttrs.special].heightInFt, // override calculated height
                    heightClass: heightInFootDescription(specialMapping[tokenAttrs.special].heightInFt),
                }
            };
        }

        return {
            name: `Building #${padTokenId(tokenId)}`,
            description: `#${padTokenId(tokenId)}`,
            image: `${tokenBaseURI[0]}${tokenId}/image`,
            background_color: backgroundColorwaySwitch(tokenAttrs.backgroundColorway).hex,
            attributes: {
                ...attrs,
                height,
                heightClass,
            }
        };
    }

    /**
     * This will update all building data we store in both firebase and webflow
     * @return {Promise<void>}
     */
    async updateBuildingData(network, tokenId) {
        const buildingConstructionData = await this.birthEventForToken(network, tokenId);
        const tokenDetails = await this.tokenDetails(network, tokenId);
        const metaData = await this.tokenMetadata(network, tokenId);
        const owner = await this.ownerOfToken(network, tokenId);

        // Firestore formatted data
        const buildingData = {
            tokenId, // primary key of building record data
            webflowCollectionId: config.webflow.collections.buildings,
            network,
            ...tokenDetails,
            ...metaData,
            ...buildingConstructionData,
            architectShort: dot(metaData.attributes.architect),
            owner,
            ownerShort: dot(owner),
            slug: tokenId.toString(), // slug is used to define URL in webflow CMS
            era: '0',
            eraClass: 'Modern',
            cityShort: shortCityNameMapper(tokenDetails.city),
        };

        // Webflow only supports mainnet
        if (isMainnet(network)) {

            // Load any existing building data
            const currentBuilding = await buildingDataService.getBuildingByTokenId(network, tokenId);

            // Create Webflow CMS formatted data
            const webflowCmsData = FirebaseToWebflowConverter.constructWebFlowCmsData(buildingData);

            // Ensure the CMS mapping remains
            if (_.has(currentBuilding, 'webflowItemId')) {
                console.log(`Updating existing building on CMS - token ID [${tokenId}] collection [${buildingData.webflowCollectionId}] item [${currentBuilding.webflowItemId}]`);
                buildingData.webflowItemId = currentBuilding.webflowItemId;
                await webflowDataService.updateItemInCollection(buildingData.webflowCollectionId, currentBuilding.webflowItemId, webflowCmsData);
            } else {
                console.log(`Added new building [${tokenId}] to webflow`);
                // _cid = collection ID | _id = item Id
                const {_cid, _id} = await webflowDataService.addItemToCollection(config.webflow.collections.buildings, webflowCmsData);
                console.log(`Webflow CMS item added - token ID [${tokenId}] collection [${_cid}] item [${_id}]`);
                buildingData.webflowItemId = _id;
                buildingData.webflowCollectionId = _cid;
            }

        } else {
            console.info(`Skipping webflow update as not on mainnet`);
        }

        // Save the data in the DB
        await buildingDataService.saveBuilding(network, buildingData);
    }

    /**
     * This allows you to set the CMS ID on the firebase data we store for each building, if one is not found then we create a simple place holder mapping object
     * @return {Promise<void>}
     */
    async forceSetWebflowIdOnBuildingData(network, tokenId, webflowItemId) {
        if (!isMainnet(network)) {
            throw new Error('Webflow does not support non mainnet tokens');
        }

        // Load any existing building data
        let currentBuilding = await buildingDataService.getBuildingByTokenId(network, tokenId);

        // If its a new token just construct the basic info so we can save the mapping
        if (!currentBuilding) {
            currentBuilding = {
                tokenId,
                network
            };
        }
        console.log(`Force updating building with tokenId [${tokenId}] and to webflow CMS ID [${webflowItemId}]`);
        currentBuilding.webflowItemId = webflowItemId;
        currentBuilding.webflowCollectionId = config.webflow.collections.buildings;

        // Save the data in the DB
        await buildingDataService.saveBuilding(network, currentBuilding);
    }

}

class FirebaseToWebflowConverter {
    static constructWebFlowCmsData(data) {
        return {
            'token-id': data.attributes.tokenId,
            'building-image-primary': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
            'building-image-link': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
            'background-color': `#${data.background_color}`,
            'city': data.cityShort,
            'city-full-name': data.attributes.city,
            'era': data.era,
            'era-class': data.eraClass,
            'architect': data.attributes.architect,
            'original-architect-short': data.architectShort,
            'current-owner': data.owner,
            'current-owner-short': data.ownerShort,
            'buildingdescription': data.description,
            'height': data.attributes.height,
            'height-class': data.attributes.heightClass,
            'date-built': data.blockTimestampPretty,
            'groundfloor': data.attributes.groundFloorType,
            'body': data.attributes.coreType,
            'roof': data.attributes.rooftopType,
            'ground-floor-exterior-color': data.attributes.exteriorColorway,
            'ground-floor-window-color': data.attributes.baseWindowColorway,
            'ground-floor-window-type': data.attributes.windowType,
            'ground-floor-use': data.attributes.groundFloorUse,
            'body-name': data.attributes.building,
            'body-exterior-color': data.attributes.exteriorColorway,
            'body-window-color': data.attributes.bodyWindowColorway,
            'body-window-type': data.attributes.windowType,
            'body-use': data.attributes.coreUse,
            'roof-exterior-color': data.attributes.exteriorColorway,
            'roof-window-color': data.attributes.roofWindowColorway,
            'roof-window-type': data.attributes.windowType,
            'roof-use': data.attributes.rooftopUse,
            'name': data.name,
            'slug': data.slug, // slug is used to define URL
        };
    }
}

module.exports = new BlockCitiesDataService();
