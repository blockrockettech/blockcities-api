const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const blockcitiesContractService = require('../services/blockcities.contract.service');
const cheerioSVGService = require('../services/cheerioSVGService.service');

const colourways = {
    exteriors: {
        red: {
            L1: '#2D0E0C',
            L2: '#461B19',
            L3: '#512220',
            L4: '#2D0E0C',
            C1: '#512220',
            C2: '#73302E',
            C3: '#712624',
            C4: '#933835',
            R1: '#712624',
            R2: '#933835',
            R3: '#A64C49',
            R4: '#D05752',
            T1: '#DD8A87',
            T2: '#ECA09E',
            T3: '#FFB3B0',
            T4: '#FFC8C6',
        },
        darkgrey: {
            L1: '#2E2E2E',
            L2: '#3B3B3B',
            L3: '#404040',
            L4: '#A4A4A4',
            C1: '#404040',
            C2: '#A4A4A4',
            C3: '#B3B3B3',
            C4: '#444444',
            R1: '#B3B3B3',
            R2: '#444444',
            R3: '#515050',
            R4: '#D5D5D5',
            T1: '#B8B8B8',
            T2: '#B9B9B9',
            T3: '#B9B9B9',
            T4: '#E8E8E8',
        },
        lightbeige: {
            L1: '#938A82',
            L2: '#B0A59B',
            L3: '#BFAF9F',
            L4: '#D7C5B4',
            C1: '#D7C5B4',
            C2: '#A4A4A4',
            C3: '#B3B3B3',
            C4: '#D0CAC5',
            R1: '#D0CAC5',
            R2: '#D0CAC5',
            R3: '#DBD7D4',
            R4: '#F7F2EF',
            T1: '#F7F3F1',
            T2: '#F7F3F2',
            T3: '#FFFCFA',
            T4: '#FFFCFA',
        }
    },
    windows: {
        black: {
            L1: '#000000',
            L2: '#000000',
            L3: '#050505',
            L4: '#050505',
            C1: '#0B0B0B',
            C2: '#0B0B0B',
            C3: '#101010',
            C4: '#101010',
            R1: '#171717',
            R2: '#171717',
            R3: '#1C1C1C',
            R4: '#1C1C1C',
        },
        aquablue: {
            L1: '#224F64',
            L2: '#224F64',
            L3: '#457D95',
            L4: '#457D95',
            C1: '#48849D',
            C2: '#48849D',
            C3: '#4686A2',
            C4: '#4686A2',
            R1: '#4C8FAC',
            R2: '#4C8FAC',
            R3: '#59ADD0',
            R4: '#59ADD0',
        },
        lightgrey: {
            L1: '#9A9C9F',
            L2: '#9A9C9F',
            L3: '#AEB0B3',
            L4: '#AEB0B3',
            C1: '#B9BBBD',
            C2: '#B9BBBD',
            C3: '#C5C6C8',
            C4: '#C5C6C8',
            R1: '#C5C8CC',
            R2: '#C5C8CC',
            R3: '#D0D3D7',
            R4: '#D0D3D7',
        }
    },
    concrete: {
        classic: {
            L1: '#A2A2A2',
            R1: '#D1D1D1',
            T1: '#E8E8E8',
        },
        dark: {
            L1: '#8B8B8B',
            R1: '#E8E8E8',
            T1: '#A2A2A2',
        },
    }
};

const exteriorsKeys = Object.keys(colourways.exteriors);
const windowsKeys = Object.keys(colourways.windows);
const concreteKeys = Object.keys(colourways.concrete);

const loadSvgs = async function () {
    const base0 = await loadImage('./image/raw_svgs/svgs/bases/432-park-curt-base.svg');
    const base1 = await loadImage('./image/raw_svgs/svgs/bases/432-park-horiz-base.svg');
    const base2 = await loadImage('./image/raw_svgs/svgs/bases/432-park-rect-base.svg');
    const base3 = await loadImage('./image/raw_svgs/svgs/bases/432-park-vert-base.svg');

    const body0 = await loadImage('./image/raw_svgs/svgs/bodies/body-curt-windows.svg');
    const body1 = await loadImage('./image/raw_svgs/svgs/bodies/body-horiz-windows.svg');
    const body2 = await loadImage('./image/raw_svgs/svgs/bodies/body-rect-windows.svg');
    const body3 = await loadImage('./image/raw_svgs/svgs/bodies/body-vert-windows.svg');

    const roof0 = await loadImage('./image/raw_svgs/svgs/roofs/432-park-roof.svg');
    const roof1 = await loadImage('./image/raw_svgs/svgs/roofs/200-vesey-roof.svg');
    const roof2 = await loadImage('./image/raw_svgs/svgs/roofs/pool-roof-11.svg');

    const bases = [
        {width: base0.width, height: base0.height, anchor: 81, svg: base0},
        {width: base1.width, height: base1.height, anchor: 81, svg: base1},
        {width: base2.width, height: base2.height, anchor: 81, svg: base2},
        {width: base3.width, height: base3.height, anchor: 81, svg: base3}
    ];

    const bodies = [
        {width: body0.width, height: body0.height, anchor: 230, svg: body0},
        {width: body1.width, height: body1.height, anchor: 230, svg: body1},
        {width: body2.width, height: body2.height, anchor: 230, svg: body2},
        {width: body3.width, height: body3.height, anchor: 230, svg: body3}
    ];

    const roofs = [
        {width: roof0.width, height: roof0.height, svg: roof0},
        {width: roof1.width, height: roof1.height, svg: roof1},
        {width: roof2.width, height: roof2.height, svg: roof2}
    ];

    return {bases, bodies, roofs};
};

module.exports = {

    // async generateRandomSVG (request, response) {
    //     console.log('generateRandomSVG:', request.params, request.headers);
    //
    //     console.log(blockcitiesContractService.details(1));
    //
    //     try {
    //         const {bases, bodies, roofs} = await loadSvgs();
    //
    //         const randomBase = Math.floor(Math.random() * bases.length);
    //         const randomBody = Math.floor(Math.random() * bodies.length);
    //         const randomRoof = Math.floor(Math.random() * roofs.length);
    //
    //         console.log(`base ${randomBase} body ${randomBody} roof ${randomRoof}`);
    //
    //         // height of the base, body, roof - minus the difference in the offset anchor from body and height
    //         const canvasHeight = bases[randomBase].height
    //             + bodies[randomBody].height
    //             + roofs[randomRoof].height
    //             - (bases[randomBase].height - bases[randomBase].anchor)
    //             - (bodies[randomBody].height - bodies[randomBody].anchor);
    //
    //         // Always assume the base if the widest post for now
    //         const canvasWidth = bases[randomBase].width;
    //
    //         const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
    //
    //         const ctx = canvas.getContext('2d');
    //
    //         // Base
    //         ctx.drawImage(bases[randomBase].svg, (canvasWidth - bases[randomBase].width) / 2, canvasHeight - bases[randomBase].height);
    //
    //         // Body
    //         ctx.drawImage(bodies[randomBody].svg, (canvasWidth - bodies[randomBody].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].height);
    //
    //         // Roof
    //         ctx.drawImage(roofs[randomRoof].svg, (canvasWidth - roofs[randomRoof].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].anchor - roofs[randomRoof].height);
    //
    //         response.contentType('image/svg+xml');
    //         const buffer = canvas.toBuffer('image/svg+xml', {
    //             title: `base ${randomBase} body ${randomBody} roof ${randomRoof}`,
    //             keywords: 'BlockCities',
    //             creationDate: new Date()
    //         });
    //         return response.send(buffer);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },
    //
    // async generateSVG (request, response) {
    //     console.log('generateSVG:', request.params, request.headers);
    //
    //     try {
    //         const {bases, bodies, roofs} = await loadSvgs();
    //
    //         const randomBase = request.params.base;
    //         const randomBody = request.params.body;
    //         const randomRoof = request.params.roof;
    //
    //         console.log(`base ${randomBase} body ${randomBody} roof ${randomRoof}`);
    //
    //         // height of the base, body, roof - minus the difference in the offset anchor from body and height
    //         const canvasHeight = bases[randomBase].height
    //             + bodies[randomBody].height
    //             + roofs[randomRoof].height
    //             - (bases[randomBase].height - bases[randomBase].anchor)
    //             - (bodies[randomBody].height - bodies[randomBody].anchor);
    //
    //         // Always assume the base if the widest post for now
    //         const canvasWidth = bases[randomBase].width;
    //
    //         const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
    //
    //         const ctx = canvas.getContext('2d');
    //
    //         // Base
    //         ctx.drawImage(bases[randomBase].svg, (canvasWidth - bases[randomBase].width) / 2, canvasHeight - bases[randomBase].height);
    //
    //         // Body
    //         ctx.drawImage(bodies[randomBody].svg, (canvasWidth - bodies[randomBody].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].height);
    //
    //         // Roof
    //         ctx.drawImage(roofs[randomRoof].svg, (canvasWidth - roofs[randomRoof].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].anchor - roofs[randomRoof].height);
    //
    //         response.contentType('image/svg+xml');
    //         const buffer = canvas.toBuffer('image/svg+xml', {
    //             title: `base ${randomBase} body ${randomBody} roof ${randomRoof}`,
    //             keywords: 'BlockCities',
    //             creationDate: new Date()
    //         });
    //         return response.send(buffer);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },
    //
    // /*
    //     https://us-central1-block-cities.cloudfunctions.net/api/stitch?exterior_x002D_L1=yellow&exterior_x002D_R2=cyan&top_x002D_T1=pink&top_x002D_T2=purple&window_x002D_R1=lime&window_x002D_L1=magenta
    // */
    // async processAndStack (request, response) {
    //     console.log('processAndStack:', request.params, request.headers);
    //
    //     const qOr = (r, p, d) => r.query[p] ? r.query[p] : d;
    //
    //     try {
    //         <!--.windows_x002D_R1{fill:#171717;}-->
    //         <!--.body_x002D_L1{fill:#2E2E2E;}-->
    //         <!--.body_x002D_R1{fill:#5D5D5D;}-->
    //         <!--.top_x002D_T1{fill:#8B8B8B;}-->
    //
    //         const fills = [
    //             {className: '.exterior_x002D_L1', fill: qOr(request, 'exterior_x002D_L1', '#2E2E2E')},
    //             {className: '.exterior_x002D_R2', fill: qOr(request, 'exterior_x002D_R2', '#5D5D5D')},
    //             {className: '.top_x002D_T1', fill: qOr(request, 'top_x002D_T1', '#E8E8E8')},
    //             {className: '.top_x002D_T2', fill: qOr(request, 'top_x002D_T2', '#B9B9B9')},
    //             <!--.body_x002D_L1{fill:#2E2E2E;}-->
    //             <!--.body_x002D_R1{fill:#5D5D5D;}-->
    //             {className: '.window_x002D_R1', fill: qOr(request, 'window_x002D_R1', '#171717')},
    //             {className: '.window_x002D_L1', fill: qOr(request, 'window_x002D_L1', '#171717')},
    //         ];
    //
    //         const rawBaseSvg = await readFilePromise('./image/raw_svgs/svgs/equitable-standard-base.svg', 'utf8');
    //         // const rawBodySvg = await readFilePromise('./image/raw_svgs/svgs/equitable-body-01.svg', 'utf8');
    //         const rawBodySvg = await readFilePromise('./image/raw_svgs/svgs/equitable-body-tall-01.svg', 'utf8');
    //         const rawRoofSvg = await readFilePromise('./image/raw_svgs/svgs/equitable-standard-roof-01.svg', 'utf8');
    //         // const rawRoofSvg = await readFilePromise('./image/raw_svgs/svgs/pool-roof-7-01.svg', 'utf8');
    //
    //         const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(rawBaseSvg, fills);
    //         const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(rawBodySvg, fills);
    //         const {svg: processedRoofSvg} = cheerioSVGService.process(rawRoofSvg, fills);
    //
    //         const baseImage = await loadImage(Buffer.from(processedBaseSvg, 'utf8'));
    //         const bodyImage = await loadImage(Buffer.from(processedBodySvg, 'utf8'));
    //         const roofImage = await loadImage(Buffer.from(processedRoofSvg, 'utf8'));
    //
    //         const base = {
    //             width: baseImage.width,
    //             height: baseImage.height,
    //             anchor: processedBaseAnchor,
    //             svg: baseImage
    //         };
    //         const body = {
    //             width: bodyImage.width,
    //             height: bodyImage.height,
    //             anchor: processedBodyAnchor,
    //             svg: bodyImage
    //         };
    //         const roof = {
    //             width: roofImage.width,
    //             height: roofImage.height,
    //             svg: roofImage
    //         };
    //
    //         // height of the base, body, roof - minus the difference in the offset anchor from body and height
    //         const canvasHeight = base.height
    //             + body.height
    //             + roof.height
    //             - (base.height - base.anchor)
    //             - (body.height - body.anchor);
    //
    //         // Always assume the base if the widest post for now
    //         const canvasWidth = base.width;
    //
    //         const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');
    //
    //         const ctx = canvas.getContext('2d');
    //
    //         // Base
    //         ctx.drawImage(base.svg, (canvasWidth - base.width) / 2, canvasHeight - base.height);
    //
    //         // Body
    //         ctx.drawImage(body.svg, (canvasWidth - body.width) / 2, canvasHeight - base.anchor - body.height);
    //
    //         // Roof
    //         ctx.drawImage(roof.svg, (canvasWidth - roof.width) / 2, canvasHeight - base.anchor - body.anchor - roof.height);
    //
    //         response.contentType('image/svg+xml');
    //         const buffer = canvas.toBuffer('image/svg+xml', {
    //             title: `BlockCities`,
    //             keywords: 'BlockCities',
    //             creationDate: new Date()
    //         });
    //         return response.send(buffer);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },

    // async processSVG (request, response) {
    //
    //     try {
    //         const fills = [
    //             {className: '.exterior_x002D_L1', fill: 'pink'},
    //             {className: '.exterior_x002D_R2', fill: 'yellow'},
    //             {className: '.top_x002D_T1', fill: 'red'},
    //             {className: '.window_x002D_R1', fill: 'green'},
    //             {className: '.st0', fill: 'purple'},
    //             {className: '.st1', fill: 'cyan'},
    //             {className: '.st2', fill: 'blue'}
    //         ];
    //
    //         const processedSvg = cheerioSVGService.process(
    //             require('./testSvg'),
    //             fills
    //         );
    //
    //         response.contentType('image/svg+xml');
    //         return response.send(processedSvg);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // },

    async generateTokenImage (request, response) {

        const cityMapping = (id) => {
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

        const basePath = `${rootPath}/bases/${baseMapping(tokenBase)}.svg`;
        const bodyPath = `${rootPath}/bodies/${bodyMapping(tokenBody)}.svg`;
        const roofPath = `${rootPath}/roofs/${roofMapping(tokenRoof)}.svg`;

        const rawBaseSvg = await readFilePromise(basePath, 'utf8');
        const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
        const rawRoofSvg = await readFilePromise(roofPath, 'utf8');


        const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(
            rawBaseSvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete.classic
        );
        const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(
            rawBodySvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete.classic
        );
        const {svg: processedRoofSvg} = cheerioSVGService.process(
            rawRoofSvg,
            colourways.exteriors[exteriorsKeys[bodyExteriorColorway]],
            colourways.windows[windowsKeys[bodyWindowColorway]],
            colourways.concrete.classic,
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
