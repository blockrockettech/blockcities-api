const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./colourways');

const exteriorsKeys = Object.keys(colourways.exteriors);
const windowsKeys = Object.keys(colourways.windows);
const curtainsKeys = Object.keys(colourways.curtains);

class ImageBuilderService {

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

            const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(
                rawBaseSvg,
                colourways.exteriors[exteriorsKeys[exteriorColorway]],
                colourways.windows[windowsKeys[windowColorway]],
                colourways.curtains[curtainsKeys[windowColorway]],
                colourways.concrete,
            );
            const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(
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
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new ImageBuilderService();
