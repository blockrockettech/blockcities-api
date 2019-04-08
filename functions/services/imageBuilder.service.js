const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./colourways');
const colourLogic = require('./colour-logic');

class ImageBuilderService {

    async loadSpecial(specialId) {

        try {
            const path = `${__dirname}/../raw_svgs/specials/${specialId}.svg`;
            const rawSvg = await readFilePromise(path, 'utf8');
            return rawSvg;
        } catch (e) {
            console.error(e);
        }
    }

    async generateImage(
        {
            building,
            base,
            body,
            roof,
            exteriorColorway,
        }) {

        try {
            if (parseInt(building) === 8) {
                return await this.generateNoRoofImage(
                    {
                        building,
                        base,
                        body,
                        exteriorColorway,
                    }
                );
            }

            const rootPath = `${__dirname}/../raw_svgs/${building}`;

            const basePath = `${rootPath}/Bases/${base}.svg`;
            const bodyPath = `${rootPath}/Bodies/${body}.svg`;
            const roofPath = `${rootPath}/Roofs/${roof}.svg`;

            const rawBaseSvg = await readFilePromise(basePath, 'utf8');
            const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
            const rawRoofSvg = await readFilePromise(roofPath, 'utf8');

            const {
                svg: processedBaseSvg,
                anchorX: processedBaseAnchorX,
                anchorY: processedBaseAnchorY,
                anchorWidthPath: processedBaseAnchorWidthPath
            } = cheerioSVGService.process(
                rawBaseSvg,
                colourways.exteriors[colourLogic[exteriorColorway][0]],
                colourways.windows[colourLogic[exteriorColorway][3]],
                colourways.curtains[colourLogic[exteriorColorway][3]],
            );
            
            const {
                svg: processedBodySvg,
                anchorX: processedBodyAnchorX,
                anchorY: processedBodyAnchorY,
                anchorWidthPath: processedBodyAnchorWidthPath
            } = cheerioSVGService.process(
                rawBodySvg,
                colourways.exteriors[colourLogic[exteriorColorway][0]],
                colourways.windows[colourLogic[exteriorColorway][2]],
                colourways.curtains[colourLogic[exteriorColorway][2]],
            );

            const {svg: processedRoofSvg} = cheerioSVGService.process(
                rawRoofSvg,
                colourways.exteriors[colourLogic[exteriorColorway][0]],
                colourways.windows[colourLogic[exteriorColorway][1]],
                colourways.curtains[colourLogic[exteriorColorway][1]],
            );

            const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
            const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
            const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));

            const baseConfig = {
                width: baseImage.width,
                height: baseImage.height,
                anchorX: parseFloat(processedBaseAnchorX),
                anchorY: parseFloat(processedBaseAnchorY),
                anchorWidthPath: parseFloat(processedBaseAnchorWidthPath),
                svg: baseImage
            };
            const bodyConfig = {
                width: bodyImage.width,
                height: bodyImage.height,
                anchorX: parseFloat(processedBodyAnchorX),
                anchorY: parseFloat(processedBodyAnchorY),
                anchorWidthPath: parseFloat(processedBodyAnchorWidthPath),
                svg: bodyImage
            };
            const roofConfig = {
                width: roofImage.width,
                height: roofImage.height,
                svg: roofImage
            };

            // check and log for dodgy anchors
            if (
                isNaN(baseConfig.anchorWidthPath) ||
                isNaN(bodyConfig.anchorWidthPath) ||
                isNaN(baseConfig.anchorX) ||
                isNaN(baseConfig.anchorY) ||
                isNaN(bodyConfig.anchorX) ||
                isNaN(bodyConfig.anchorY)
            ) {
                console.error(`NaN detected: Building ${building} Base ${base} Body ${body} Roof ${roof}`);
            }

            const adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);
            const adjustedBodyAnchorY = bodyConfig.anchorY * (adjustedBodyHeight / bodyConfig.height);

            const adjustedBodyWidthPath = bodyConfig.anchorWidthPath * (baseConfig.anchorWidthPath / bodyConfig.width);
            const adjustedBodyAnchorX = bodyConfig.anchorX * (baseConfig.anchorWidthPath / bodyConfig.width);

            const adjustedRoofHeight = roofConfig.height * (adjustedBodyHeight / bodyConfig.height);

            // Used when debuggin'
            // console.log(`base`, baseConfig);
            // console.log(`body`, bodyConfig);
            // console.log(`roof`, roofConfig);
            // console.log(`height`, bodyConfig.height, adjustedBodyHeight);
            // console.log(`body Y `, bodyConfig.anchorY, adjustedBodyAnchorY);
            // console.log(`adjustedRoofHeight `, roofConfig.height, adjustedRoofHeight);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
            let canvasHeight = baseConfig.height
                + adjustedBodyHeight
                + adjustedRoofHeight
                - baseConfig.anchorY
                - adjustedBodyAnchorY;

            // roof nudge is used if the roof does not overlap the top of the body fully
            let roofNudge = 0;
            if (adjustedBodyAnchorY > adjustedRoofHeight) {
                roofNudge = adjustedBodyAnchorY - adjustedRoofHeight;
                canvasHeight = canvasHeight + roofNudge;
            }

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width;

            const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
            const ctx = canvas.getContext('2d');

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - adjustedBodyHeight;

            // Base
            ctx.drawImage(
                baseConfig.svg,
                0,
                startBaseY
            );

            // Body
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
                baseConfig.anchorX + adjustedBodyAnchorX,
                0 + roofNudge,
                adjustedBodyWidthPath,
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

    // FIXME - extract common logic
    async generateNoRoofImage(
        {
            building,
            base,
            body,
            exteriorColorway
        }) {

        try {
            const rootPath = `${__dirname}/../raw_svgs/${building}`;

            const basePath = `${rootPath}/Bases/${base}.svg`;
            const bodyPath = `${rootPath}/Bodies/${body}.svg`;

            const rawBaseSvg = await readFilePromise(basePath, 'utf8');
            const rawBodySvg = await readFilePromise(bodyPath, 'utf8');

            const {
                svg: processedBaseSvg,
                anchorX: processedBaseAnchorX,
                anchorY: processedBaseAnchorY,
                anchorWidthPath: processedBaseAnchorWidthPath
            } = cheerioSVGService.process(
                rawBaseSvg,
                colourways.exteriors[colourLogic[exteriorColorway][0]],
                colourways.windows[colourLogic[exteriorColorway][3]],
                colourways.curtains[colourLogic[exteriorColorway][3]],
            );

            const {
                svg: processedBodySvg,
                anchorX: processedBodyAnchorX,
                anchorY: processedBodyAnchorY,
                anchorWidthPath: processedBodyAnchorWidthPath
            } = cheerioSVGService.process(
                rawBodySvg,
                colourways.exteriors[colourLogic[exteriorColorway][0]],
                colourways.windows[colourLogic[exteriorColorway][2]],
                colourways.curtains[colourLogic[exteriorColorway][2]],
            );

            const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
            const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));

            const baseConfig = {
                width: baseImage.width,
                height: baseImage.height,
                anchorX: parseFloat(processedBaseAnchorX),
                anchorY: parseFloat(processedBaseAnchorY),
                anchorWidthPath: parseFloat(processedBaseAnchorWidthPath),
                svg: baseImage
            };
            const bodyConfig = {
                width: bodyImage.width,
                height: bodyImage.height,
                svg: bodyImage
            };

            const adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
            const canvasHeight = baseConfig.height
                + adjustedBodyHeight
                - baseConfig.anchorY;

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width;

            const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
            const ctx = canvas.getContext('2d');

            // console.log(`base config`, baseConfig);
            // console.log(`body config`, bodyConfig);

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - adjustedBodyHeight;

            // Base
            ctx.drawImage(
                baseConfig.svg,
                0,
                startBaseY
            );

            // Body
            ctx.drawImage(
                bodyConfig.svg,
                baseConfig.anchorX,
                startBodyY - baseConfig.height + baseConfig.anchorY,
                baseConfig.anchorWidthPath,
                adjustedBodyHeight,
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
