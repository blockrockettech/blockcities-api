const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./metadata/colourways');
const colourLogic = require('./metadata/colour-logic');

const yPadding = 0;
const xPadding = 0;

class ImageBuilderService {

    async loadSpecial(specialId, imageType = 'svg') {

        try {
            const path = `${__dirname}/../raw_svgs/specials/${specialId}.svg`;
            const rawSvg = await readFilePromise(path, 'utf8');

            const special = await loadImage(Buffer.from(rawSvg, 'utf8'));
            console.log(special.width, special.height);

            const canvas = createCanvas(special.width, special.height, imageType);
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                special,
                0,
                0
            );

            const streamType = (imageType === 'svg') ? 'image/svg+xml' : 'image/png';
            return canvas.toBuffer(streamType, {
                title: `BlockCities special`,
                keywords: 'BlockCities special',
                creationDate: new Date()
            });

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
            backgroundColorway,
        }, imageType = 'svg') {

        try {
            if (parseInt(building) === 8) {
                return await this.generateNoRoofImage(
                    {
                        building,
                        base,
                        body,
                        exteriorColorway,
                        backgroundColorway,
                    },
                    imageType
                );
            }

            const {
                baseConfig,
                bodyConfig,
                roofConfig,
                canvasHeight,
                canvasWidth,
            } = await this.generateImageStats({
                building,
                base,
                body,
                roof,
                exteriorColorway,
                backgroundColorway,
            });

            const canvas = createCanvas(canvasWidth, canvasHeight, imageType);
            const ctx = canvas.getContext('2d');

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - bodyConfig.adjustedBodyHeight;

            // Base
            ctx.drawImage(
                baseConfig.svg,
                xPadding,
                startBaseY - yPadding
            );

            // Body
            ctx.drawImage(
                bodyConfig.svg,
                baseConfig.anchorX + xPadding,
                startBodyY - baseConfig.height + baseConfig.anchorY - yPadding,
                baseConfig.anchorWidthPath,
                bodyConfig.adjustedBodyHeight,
            );

            // Roof
            ctx.drawImage(
                roofConfig.svg,
                baseConfig.anchorX + bodyConfig.adjustedBodyAnchorX + xPadding,
                0 + roofConfig.roofNudge + yPadding,
                bodyConfig.adjustedBodyWidthPath,
                roofConfig.adjustedRoofHeight
            );

            const streamType = (imageType === 'svg') ? 'image/svg+xml' : 'image/png';
            return canvas.toBuffer(streamType, {
                title: `BlockCities`,
                keywords: 'BlockCities',
                creationDate: new Date()
            });
        } catch (e) {
            console.error(e);
        }
    }

    async generateNoRoofImage(
        {
            building,
            base,
            body,
            exteriorColorway,
            backgroundColorway,
        }, imageType = 'svg') {

        try {
            const {
                baseConfig,
                bodyConfig,
                canvasHeight,
                canvasWidth,
            } = await this.generateNoRoofImageStats({
                building,
                base,
                body,
                exteriorColorway,
                backgroundColorway,
            });

            const canvas = createCanvas(canvasWidth, canvasHeight, imageType);
            const ctx = canvas.getContext('2d');

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - bodyConfig.adjustedBodyHeight;

            // Base
            ctx.drawImage(
                baseConfig.svg,
                xPadding,
                startBaseY - yPadding
            );

            // Body
            ctx.drawImage(
                bodyConfig.svg,
                baseConfig.anchorX + xPadding,
                startBodyY - baseConfig.height + baseConfig.anchorY - yPadding,
                baseConfig.anchorWidthPath,
                bodyConfig.adjustedBodyHeight,
            );

            const streamType = (imageType === 'svg') ? 'image/svg+xml' : 'image/png';
            return canvas.toBuffer(streamType, {
                title: `BlockCities`,
                keywords: 'BlockCities',
                creationDate: new Date()
            });
        } catch (e) {
            console.error(e);
        }
    }

    async generateImageStats({building, base, body, roof, exteriorColorway, backgroundColorway}) {
        try {
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

            bodyConfig.adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);
            bodyConfig.adjustedBodyAnchorY = bodyConfig.anchorY * (bodyConfig.adjustedBodyHeight / bodyConfig.height);

            bodyConfig.adjustedBodyWidthPath = bodyConfig.anchorWidthPath * (baseConfig.anchorWidthPath / bodyConfig.width);
            bodyConfig.adjustedBodyWidth = bodyConfig.width * (baseConfig.anchorWidthPath / bodyConfig.width);
            bodyConfig.adjustedBodyAnchorX = bodyConfig.anchorX * (baseConfig.anchorWidthPath / bodyConfig.width);

            // fixes 12 - is this the solution to scale roofs?
            roofConfig.adjustedRoofHeight = roofConfig.height * (bodyConfig.adjustedBodyWidthPath / roofConfig.width);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height

            let canvasHeight = baseConfig.height
                + bodyConfig.adjustedBodyHeight
                + roofConfig.adjustedRoofHeight
                - baseConfig.anchorY
                - bodyConfig.adjustedBodyAnchorY
                + (yPadding * 2);

            // roof nudge is used if the roof does not overlap the top of the body fully
            roofConfig.roofNudge = 0;
            if (bodyConfig.adjustedBodyAnchorY > roofConfig.adjustedRoofHeight) {
                roofConfig.roofNudge = bodyConfig.adjustedBodyAnchorY - roofConfig.adjustedRoofHeight;
                canvasHeight = canvasHeight + roofConfig.roofNudge;
            }

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width + (xPadding * 2);

            return {
                baseConfig,
                bodyConfig,
                roofConfig,
                canvasHeight,
                canvasWidth,
            };

        } catch (e) {
            console.error(e);
        }
    }

    async generateNoRoofImageStats(
        {
            building,
            base,
            body,
            roof,
            exteriorColorway,
            backgroundColorway,
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

            bodyConfig.adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);
            bodyConfig.adjustedBodyWidth = bodyConfig.width * (baseConfig.anchorWidthPath / bodyConfig.width);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
            const canvasHeight = baseConfig.height
                + bodyConfig.adjustedBodyHeight
                - baseConfig.anchorY
                + (yPadding * 2);

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width + (xPadding * 2);

            return {
                baseConfig,
                bodyConfig,
                roofConfig: {},
                canvasHeight,
                canvasWidth,
            };
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new ImageBuilderService();
