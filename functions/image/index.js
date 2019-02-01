const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const blockcitiesContractService = require('../services/blockcities.contract.service');
const cheerioSVGService = require('../services/cheerioSVGService.service');

const colourways = require('./colourways');

const exteriorsKeys = Object.keys(colourways.exteriors);
const windowsKeys = Object.keys(colourways.windows);
const concreteKeys = Object.keys(colourways.concrete);

const cityMapping = (id) => {
    // contract has 4 cities - only two types currently
    // 1,2,3 is 55%
    return id <= 3 ? 4 : 11;
};

const baseMapping = (id) => {
    return 0;
};

const bodyMapping = (id) => {
    return id;
};

const roofMapping = (id) => {
    return id;
};

const concreteMapping = (exteriorId) => {
    // if dark exterior use dark concrete else normal
    return exteriorId === 2 ? 1 : 0;
};

module.exports = {

    async generateTokenImage (request, response) {

        const tokenId = request.params.tokenId;
        if (!tokenId) {
            return response.status(400).json({
                failure: `Token ID not provided`
            });
        }

        const network = request.params.network;

        const {
            city: tokenCity,
            base: tokenBase, baseExteriorColorway, baseWindowColorway,
            body: tokenBody, bodyExteriorColorway, bodyWindowColorway,
            roof: tokenRoof, roofExteriorColorway, roofWindowColorway,
        } = await blockcitiesContractService.tokenDetails(network, tokenId);

        const buildingSize = cityMapping(tokenCity);
        const rootPath = `./raw_svgs/${buildingSize}`;

        const basePath = `${rootPath}/bases/${baseMapping(buildingSize)}.svg`;
        const bodyPath = `${rootPath}/bodies/${bodyMapping(tokenBody)}.svg`;
        const roofPath = `${rootPath}/roofs/${roofMapping(tokenRoof)}.svg`;

        const rawBaseSvg = await readFilePromise(basePath, 'utf8');
        const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
        const rawRoofSvg = await readFilePromise(roofPath, 'utf8');

        const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(
            rawBaseSvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(bodyExteriorColorway)]],
        );
        const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(
            rawBodySvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(bodyExteriorColorway)]],
        );
        const {svg: processedRoofSvg} = cheerioSVGService.process(
            rawRoofSvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(bodyExteriorColorway)]],
        );

        const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
        const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
        const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));

        const base = {
            width: baseImage.width,
            height: baseImage.height,
            anchor: processedBaseAnchor,
            svg: baseImage
        };
        const body = {
            width: bodyImage.width,
            height: bodyImage.height,
            anchor: processedBodyAnchor,
            svg: bodyImage
        };
        const roof = {
            width: roofImage.width,
            height: roofImage.height,
            svg: roofImage
        };

        // height of the base, body, roof - minus the difference in the offset anchor from body and height
        const canvasHeight = base.height
            + body.height
            + roof.height
            - (base.height - base.anchor)
            - (body.height - body.anchor);

        // Always assume the base if the widest post for now
        const canvasWidth = base.width;

        const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');

        const ctx = canvas.getContext('2d');

        // Base
        ctx.drawImage(base.svg, (canvasWidth - base.width) / 2, canvasHeight - base.height);

        // Body
        ctx.drawImage(body.svg, (canvasWidth - body.width) / 2, canvasHeight - base.anchor - body.height);

        // Roof
        ctx.drawImage(roof.svg, (canvasWidth - roof.width) / 2, canvasHeight - base.anchor - body.anchor - roof.height);

        response.contentType('image/svg+xml');
        const buffer = canvas.toBuffer('image/svg+xml', {
            title: `BlockCities`,
            keywords: 'BlockCities',
            creationDate: new Date()
        });
        return response.send(buffer);

    }

};
