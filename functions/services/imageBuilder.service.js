const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./colourways');

const exteriorsKeys = Object.keys(colourways.exteriors);
const windowsKeys = Object.keys(colourways.windows);
const curtainsKeys = Object.keys(colourways.curtains);

class ImageBuilderService {

    async loadSpecial (specialId) {

        try {
            const path = `${__dirname}/../raw_svgs/specials/${specialId}.svg`;
            const rawSvg = await readFilePromise(path, 'utf8');
            return rawSvg;
        } catch (e) {
            console.error(e);
        }
    }

    async generateImage (
        {
            building,
            base,
            body,
            roof,
            exteriorColorway,
            windowColorway
        }) {

        try {
            const rootPath = `${__dirname}/../raw_svgs/${building}`;

            const basePath = `${rootPath}/Bases/${base}.svg`;
            const bodyPath = `${rootPath}/Bodies/${body}.svg`;
            const roofPath = `${rootPath}/Roofs/${roof}.svg`;

            const rawBaseSvg = await readFilePromise(basePath, 'utf8');
            const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
            const rawRoofSvg = await readFilePromise(roofPath, 'utf8');

            const {svg: processedBaseSvg, anchorX: processedBaseAnchorX, anchorY: processedBaseAnchorY} = cheerioSVGService.process(
                rawBaseSvg,
                colourways.exteriors[exteriorsKeys[exteriorColorway]],
                colourways.windows[windowsKeys[windowColorway]],
                colourways.curtains[curtainsKeys[windowColorway]],
                colourways.concrete,
            );
            const {svg: processedBodySvg, anchorX: processedBodyAnchorX, anchorY: processedBodyAnchorY} = cheerioSVGService.process(
                rawBodySvg,
                colourways.exteriors[exteriorsKeys[exteriorColorway]],
                colourways.windows[windowsKeys[windowColorway]],
                colourways.curtains[curtainsKeys[windowColorway]],
                colourways.concrete,
            );
            const {svg: processedRoofSvg} = cheerioSVGService.process(
                rawRoofSvg,
                colourways.exteriors[exteriorsKeys[exteriorColorway]],
                colourways.windows[windowsKeys[windowColorway]],
                colourways.curtains[curtainsKeys[windowColorway]],
                colourways.concrete,
            );

            const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
            const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
            const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));

            const baseConfig = {
                width: baseImage.width,
                height: baseImage.height,
                anchorX: parseFloat(processedBaseAnchorX),
                anchorY: parseFloat(processedBaseAnchorY),
                anchorWidthPath: 150,
                svg: baseImage
            };
            const bodyConfig = {
                width: bodyImage.width,
                height: bodyImage.height,
                anchorX: parseFloat(processedBodyAnchorX),
                anchorY: parseFloat(processedBodyAnchorY),
                svg: bodyImage
            };
            const roofConfig = {
                width: roofImage.width,
                height: roofImage.height,
                svg: roofImage
            };

            const adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);
            const adjustedRoofHeight = roofConfig.height * (baseConfig.anchorWidthPath / roofConfig.width);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
            const canvasHeight = baseConfig.height
                + adjustedBodyHeight
                + adjustedRoofHeight
                - baseConfig.anchorY;
                // - adjustedBodyConfigAnchorY;

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width;

            const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
            const ctx = canvas.getContext('2d');

            console.log(`base config`, baseConfig);
            console.log(`body config`, bodyConfig);
            console.log(`roof config`, roofConfig);

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - adjustedBodyHeight;

            // Base
            ctx.drawImage(
                baseConfig.svg,
                0,
                startBaseY
            );

            // Body
            console.log(`% body`, baseConfig.anchorWidthPath / bodyConfig.width);
            ctx.drawImage(
                bodyConfig.svg,
                baseConfig.anchorX,
                startBodyY - baseConfig.height + baseConfig.anchorY,
                baseConfig.anchorWidthPath,
                adjustedBodyHeight,
            );

            // Roof
            ctx.drawImage(
                roofConfig.svg,
                baseConfig.anchorX,
                startBodyY - baseConfig.height + baseConfig.anchorY,
                baseConfig.anchorWidthPath,
                adjustedRoofHeight
            );

            return canvas.toBuffer('image/svg+xml', {
                title: `BlockCities`,
                keywords: 'BlockCities',
                creationDate: new Date()
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new ImageBuilderService();
