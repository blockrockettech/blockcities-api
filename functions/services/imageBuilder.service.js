const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const blockcitiesContractService = require('./blockcities.contract.service');
const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./colourways');

const exteriorsKeys = Object.keys(colourways.exteriors);
const windowsKeys = Object.keys(colourways.windows);
const concreteKeys = Object.keys(colourways.concrete);

const cityMapping = (id) => {
    // TODO we are using city to map these correct
    if (id < 2) {
        return 4;
    }
    if (id < 3) {
        return 7;
    }
    return 11;
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

class ImageBuilderService {

    async generateTokenImage(network = 1, tokenId) {

        // FIXME - notes
        // - clean up unused XML from illustrator - see svgo.js
        // - same number of bases, bodies, roofs
        // - handle being able to replace the custom style
        // - how does city impact this

        const {
            exteriorColorway,
            windowColorway,
            city,
            base,
            body,
            roof,
            architect
        } = await blockcitiesContractService.tokenDetails(network, tokenId);

        const buildingSize = cityMapping(city);
        const rootPath = `./raw_svgs/${buildingSize}`;

        const basePath = `${rootPath}/bases/${baseMapping(base)}.svg`;
        const bodyPath = `${rootPath}/bodies/${bodyMapping(body)}.svg`;
        const roofPath = `${rootPath}/roofs/${roofMapping(roof)}.svg`;

        const rawBaseSvg = await readFilePromise(basePath, 'utf8');
        const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
        const rawRoofSvg = await readFilePromise(roofPath, 'utf8');

        const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(
            rawBaseSvg,
            colourways.exteriors[exteriorsKeys[exteriorColorway]],
            colourways.windows[windowsKeys[windowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(exteriorColorway)]],
        );
        const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(
            rawBodySvg,
            colourways.exteriors[exteriorsKeys[exteriorColorway]],
            colourways.windows[windowsKeys[windowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(exteriorColorway)]],
        );
        const {svg: processedRoofSvg} = cheerioSVGService.process(
            rawRoofSvg,
            colourways.exteriors[exteriorsKeys[exteriorColorway]],
            colourways.windows[windowsKeys[windowColorway]],
            colourways.concrete[concreteKeys[concreteMapping(exteriorColorway)]],
        );

        const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
        const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
        const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));

        const baseConfig = {
            width: baseImage.width,
            height: baseImage.height,
            anchor: processedBaseAnchor,
            svg: baseImage
        };
        const bodyConfig = {
            width: bodyImage.width,
            height: bodyImage.height,
            anchor: processedBodyAnchor,
            svg: bodyImage
        };
        const roofConfig = {
            width: roofImage.width,
            height: roofImage.height,
            svg: roofImage
        };

        // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
        const canvasHeight = baseConfig.height
            + bodyConfig.height
            + roofConfig.height
            - (baseConfig.height - baseConfig.anchor)
            - (bodyConfig.height - bodyConfig.anchor);

        // Always assume the baseConfig if the widest post for now
        const canvasWidth = baseConfig.width;

        const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');

        const ctx = canvas.getContext('2d');

        // Base
        ctx.drawImage(baseConfig.svg, (canvasWidth - baseConfig.width) / 2, canvasHeight - baseConfig.height);

        // Body
        ctx.drawImage(bodyConfig.svg, (canvasWidth - bodyConfig.width) / 2, canvasHeight - baseConfig.anchor - bodyConfig.height);

        // Roof
        ctx.drawImage(roofConfig.svg, (canvasWidth - roofConfig.width) / 2, canvasHeight - baseConfig.anchor - bodyConfig.anchor - roofConfig.height);

        return canvas.toBuffer('image/svg+xml', {
            title: `BlockCities`,
            keywords: 'BlockCities',
            creationDate: new Date()
        });
    }

}

module.exports = new ImageBuilderService();
