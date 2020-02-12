const _ = require('lodash');

const blockcitiesContractService = require('./blockcities.contract.service');
const webflowUpdateQueue = require('./webflow/webflowUpdateQueue.service');
const imageBuilderService = require('./imageBuilder.service');
const buildingDataService = require('./building.data.service');

const {backgroundColorwaySwitch} = require('./metadata/background-colours');
const {decorateMetadataName} = require('./metadata/metadata.decorator');
const specialMapping = require('./metadata/special-data-mapping');
const {shortCityNameMapper} = require('./metadata/citymapper');
const {ratioMapper, heightInFootDescription} = require('./metadata/ratio-mapper');
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

        const res = await imageBuilderService.generateImageStats(tokenAttrs);
        const bodyConfig = res.bodyConfig;
        const canvasHeight = res.canvasHeight;

        const height = ratioMapper({
            adjustedWidth: bodyConfig.adjustedBodyWidth,
            pixels: canvasHeight,
            buildingId: tokenAttrs.building,
        });
        const heightClass = heightInFootDescription(height);

        // push width through the "ratio mapper"
        const gridSizeInFoot = 100; // 100 ft grid
        const width = ratioMapper({
            adjustedWidth: bodyConfig.adjustedBodyWidth,
            pixels: bodyConfig.adjustedBodyWidth,
            buildingId: tokenAttrs.building,
        });

        const grid = Math.ceil(width / gridSizeInFoot);

        const attrs = decorateMetadataName(tokenAttrs);

        if (tokenAttrs.special !== 0) {
            return {
                name: `${specialMapping[tokenAttrs.special].name}`,
                description: `#${padTokenId(tokenId)}`,
                image: `${tokenBaseURI[0]}image/${tokenId}.png`,
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
            image: `${tokenBaseURI[0]}image/${tokenId}.png`,
            background_color: backgroundColorwaySwitch(tokenAttrs.backgroundColorway).hex,
            attributes: {
                ...attrs,
                height,
                heightClass,
                width,
                grid: `${grid}x${grid}`,
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
        let buildingData = {
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
            // Add to process queue
            await webflowUpdateQueue.addToQueue(tokenId);

            // load existing data
            const currentBuilding = await buildingDataService.getBuildingByTokenId(network, tokenId);

            // maintain webflow mapping
            if (currentBuilding && currentBuilding.webflowItemId) {
                buildingData.webflowItemId = currentBuilding.webflowItemId;
            }
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

    async getBuildingsForOwner(network, owner) {
        return buildingDataService.getBuildingsForOwner(network, owner);
    }

    async getArchitectedBuildingsForAddress(network, address, fromTimestamp) {
        return buildingDataService.getArchitectedBuildingsForAddress(network, address, fromTimestamp);
    }

    async getBuildingData(network, buildingId) {
        return buildingDataService.getBuildingByTokenId(network, buildingId);
    }
}

module.exports = new BlockCitiesDataService();
