const blockcitiesContractService = require('./blockcities.contract.service');
const webflowDataService = require('./webflow/webflowDataService');
const imageBuilderService = require('./imageBuilder.service');
const buildingDataService = require('./building.data.service');

const {backgroundColorwaySwitch} = require('./metadata/background-colours');
const {decorateMetadataName} = require('./metadata/metadata.decorator');
const specialMapping = require('./metadata/special-data-mapping');
const {shortCityNameMapper} = require('./metadata/citymapper');
const {heightMapper, heightInFootDescription} = require('./metadata/height-mapper');

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

    async updateBuilding(network, tokenId) {
        const buildingConstructionData = await this.birthEventForToken(network, tokenId);
        const tokenDetails = await this.tokenDetails(network, tokenId);
        const metaData = await this.tokenMetadata(network, tokenId);
        const owner = await this.ownerOfToken(network, tokenId);


        const data = {
            id: tokenId, // primary key of building record data
            ...tokenDetails,
            ...metaData,
            ...buildingConstructionData,
            tokenId,
            architectShort: dot(metaData.attributes.architect),
            owner,
            ownerShort: dot(owner),
            slug: tokenId.toString(), // slug is used to define URL in webflow CMS
            era: '0',
            eraClass: 'Modern',
            cityShort: shortCityNameMapper(tokenDetails.city),
        };

        return buildingDataService.saveBuilding(network, data);

        // TODO persist data to DB
        // TODO add data to webflow
        // TODO once saved update DB with CMS reference
    }


    // // TODO move this method
    async exportWebflowBuildProfile(network, tokenId) {
        const buildingConstructionData = await this.birthEventForToken(network, tokenId);
        const tokenDetails = await this.tokenDetails(network, tokenId);
        const metaData = await this.tokenMetadata(network, tokenId);
        const owner = await this.ownerOfToken(network, tokenId);

        // join all info into a data object
        const data = {
            ...tokenDetails,
            ...metaData,
            ...buildingConstructionData,
            tokenId,
            owner
        };

        console.log(`token ID ${data.tokenId}, building ID ${data.building}`);

        await webflowDataService.addItemToCollection(config.webflow.collections.buildings, {
            'token-id': data.attributes.tokenId,
            'building-image-primary': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
            'building-image-link': `https://us-central1-block-cities.cloudfunctions.net/api/network/1/token/image/${data.attributes.tokenId}.png`,
            'background-color': `#${data.background_color}`,
            'city': shortCityNameMapper(data.city),
            'city-full-name': data.attributes.city,
            'era': '0',
            'era-class': 'Modern',
            'architect': data.attributes.architect,
            'original-architect-short': dot(data.attributes.architect),
            'current-owner': data.owner,
            'current-owner-short': dot(data.owner),
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
            'slug': data.attributes.tokenId.toString(), // slug is used to define URL
        });

        console.log(`Added token [${tokenId}] to webflow`);
        return tokenId;
    }
}

module.exports = new BlockCitiesDataService();
