const readFilePromise = require('fs-readfile-promise');
const {loadImage} = require('canvas');

const cheerio = require('cheerio');

const cheerioSVGService = require('./cheerioSVGService.service');

const colourways = require('./metadata/colourways');
const colourLogic = require('./metadata/colour-logic');

class ImageBuilderService {

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
            } = cheerioSVGService.process(rawBaseSvg);

            const {
                svg: processedBodySvg,
                anchorX: processedBodyAnchorX,
                anchorY: processedBodyAnchorY,
                anchorWidthPath: processedBodyAnchorWidthPath
            } = cheerioSVGService.process(rawBodySvg);

            const {svg: processedRoofSvg} = cheerioSVGService.process(rawRoofSvg);

            const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
            const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
            const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));

            const baseConfig = {
                width: baseImage.width,
                height: baseImage.height,
                anchorX: parseFloat(processedBaseAnchorX),
                anchorY: parseFloat(processedBaseAnchorY),
                anchorWidthPath: parseFloat(processedBaseAnchorWidthPath),
                svg: baseImage,
                rawSvg: processedBaseSvg,
            };
            const bodyConfig = {
                width: bodyImage.width,
                height: bodyImage.height,
                anchorX: parseFloat(processedBodyAnchorX),
                anchorY: parseFloat(processedBodyAnchorY),
                anchorWidthPath: parseFloat(processedBodyAnchorWidthPath),
                svg: bodyImage,
                rawSvg: processedBodySvg,
            };
            const roofConfig = {
                width: roofImage.width,
                height: roofImage.height,
                svg: roofImage,
                rawSvg: processedRoofSvg,
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

            // scales the body height based off the base
            bodyConfig.adjustedBodyHeight = bodyConfig.height * (baseConfig.anchorWidthPath / bodyConfig.width);

            // scales the body anchor Y (this is the amount we drop the component to fit snugly)
            bodyConfig.adjustedBodyAnchorY = bodyConfig.anchorY * (bodyConfig.adjustedBodyHeight / bodyConfig.height);

            // scales the body width path (this is the adjusted width of the "lading" space for the body (and roof))
            bodyConfig.adjustedBodyWidthPath = bodyConfig.anchorWidthPath * (baseConfig.anchorWidthPath / bodyConfig.width);
            bodyConfig.adjustedBodyWidth = bodyConfig.width * (baseConfig.anchorWidthPath / bodyConfig.width);

            // scales the body anchor X (this is the amount move from left to right (common if base does not align to edge))
            bodyConfig.adjustedBodyAnchorX = bodyConfig.anchorX * (baseConfig.anchorWidthPath / bodyConfig.width);

            // fixes 12 - is this the solution to scale roofs?
            roofConfig.adjustedRoofHeight = roofConfig.height * (bodyConfig.adjustedBodyWidthPath / roofConfig.width);

            // height of the baseConfig, bodyConfig, roofConfig - minus the difference in the offset anchor from bodyConfig and height
            let canvasHeight = baseConfig.height
                + bodyConfig.adjustedBodyHeight
                + roofConfig.adjustedRoofHeight
                - baseConfig.anchorY
                - bodyConfig.adjustedBodyAnchorY;

            // roof nudge is used if the roof does not overlap the top of the body fully
            roofConfig.roofNudge = 0;
            if (bodyConfig.adjustedBodyAnchorY > roofConfig.adjustedRoofHeight) {
                roofConfig.roofNudge = bodyConfig.adjustedBodyAnchorY - roofConfig.adjustedRoofHeight;
                canvasHeight = canvasHeight + roofConfig.roofNudge;
            }

            // Always assume the baseConfig if the widest part for now
            const canvasWidth = baseConfig.width;

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

    async generatePureSvg({
                              building,
                              base,
                              body,
                              roof,
                              exteriorColorway,
                              backgroundColorway,
                          },
                          viewportBackground = null,
                          pad = 0,
    ) {

        try {

            const skeletonSvg = `
<svg id="bc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <style></style>
    </defs>
    <g id="building">
        <g id="base"></g>
        <g id="body"></g>
        <g id="roof"></g>
    </g>
</svg>
`;

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

            const startBaseY = canvasHeight - baseConfig.height;
            const startBodyY = canvasHeight - bodyConfig.adjustedBodyHeight;

            // console.log('base', baseConfig.svg);
            // console.log('body', bodyConfig);
            // console.log('roof', roofConfig);
            // console.log('height', canvasHeight);
            // console.log('width', canvasWidth);

            // console.log('startBaseY', startBaseY);
            // console.log('startBodyY', startBodyY);

            // colour the components
            const styledBaseSvg = cheerioSVGService.styleFill(
                baseConfig.rawSvg,
                colourways.exteriors[colourLogic[exteriorColorway].exterior.base],
                colourways.windows[colourLogic[exteriorColorway].windows.base],
                colourways.curtains[colourLogic[exteriorColorway].windows.base],
                colourways.concrete[colourLogic[exteriorColorway].concrete],
            );

            const styledBodySvg = cheerioSVGService.styleFill(
                bodyConfig.rawSvg,
                colourways.exteriors[colourLogic[exteriorColorway].exterior.body],
                colourways.windows[colourLogic[exteriorColorway].windows.body],
                colourways.curtains[colourLogic[exteriorColorway].windows.body],
                colourways.concrete[colourLogic[exteriorColorway].concrete],
            );

            const styledRoofSvg = cheerioSVGService.styleFill(
                roofConfig.rawSvg,
                colourways.exteriors[colourLogic[exteriorColorway].exterior.roof],
                colourways.windows[colourLogic[exteriorColorway].windows.roof],
                colourways.curtains[colourLogic[exteriorColorway].windows.roof],
                colourways.concrete[colourLogic[exteriorColorway].concrete],
            );

            // this is the DOM skeleton we squirt into...
            const $ = cheerio.load(skeletonSvg, {xmlMode: true, normalizeWhitespace: true,});

            const boxEdge = canvasHeight > canvasWidth ? canvasHeight : canvasWidth;
            $('#bc').attr('viewBox', `-${pad} -${pad} ${canvasWidth + (pad * 2)} ${canvasHeight + (pad * 2)}`);

            // this is add a background colour (rather than transparent)
            // required for custom images for MarbleCards, for example
            if (viewportBackground) {
                $('#bc').attr('style', `background: #${viewportBackground}`);
            }

            $('style').html(cheerioSVGService.getStyle(styledBaseSvg, 'base'));
            $('style').append(cheerioSVGService.getStyle(styledBodySvg, 'body'));
            $('style').append(cheerioSVGService.getStyle(styledRoofSvg, 'roof'));

            // Gradients - used for trees
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledBaseSvg, 'linearGradient'));
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledRoofSvg, 'linearGradient'));

            // Masks - used for something I don't understand ;)
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledBaseSvg, 'mask'));
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledBodySvg, 'mask'));
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledRoofSvg, 'mask'));

            // ClipPaths -  used for something I don't understand ;)
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledBaseSvg, 'clipPath'));
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledBodySvg, 'clipPath'));
            $('defs').append(cheerioSVGService.getAdditionlDefs(styledRoofSvg, 'clipPath'));

            // BASE
            // NB: we scale off the base
            $('#base').html(cheerioSVGService.getRoot(styledBaseSvg));
            $('#base').attr('transform', `
            translate(0, ${startBaseY}) 
            scale(1, 1) 
            `);

            // BODY
            $('#body').html(cheerioSVGService.getRoot(styledBodySvg));
            $('#body').attr('transform', `
            translate(${baseConfig.anchorX}, ${(startBodyY - baseConfig.height + baseConfig.anchorY)}) 
            scale(${bodyConfig.adjustedBodyWidthPath / bodyConfig.anchorWidthPath}, ${bodyConfig.adjustedBodyHeight / bodyConfig.height})
            `);

            // ROOF
            $('#roof').html(cheerioSVGService.getRoot(styledRoofSvg));
            $('#roof').attr('transform', `
            translate(${(baseConfig.anchorX + bodyConfig.adjustedBodyAnchorX)}, ${(0 + roofConfig.roofNudge)})
            scale(${bodyConfig.adjustedBodyWidthPath / roofConfig.width}, ${roofConfig.adjustedRoofHeight / roofConfig.height})
            `);

            return $.xml();
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    async loadSpecialPureSvg(specialId, viewportBackground = null, pad = 0) {

        try {
            const path = `${__dirname}/../raw_svgs/specials/${specialId}.svg`;
            const rawSvg = await readFilePromise(path, 'utf8');

            if (viewportBackground) {
                const $ = cheerio.load(rawSvg, {xmlMode: true, normalizeWhitespace: true,});
                $('svg').attr('style', `background: #${viewportBackground}`);

                return $.xml();
            }

            return rawSvg;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new ImageBuilderService();
