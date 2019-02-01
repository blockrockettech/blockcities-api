const readFilePromise = require('fs-readfile-promise');
const {createCanvas, loadImage, Image} = require('canvas');

const blockcitiesContractService = require('../services/blockcities.contract.service');
const cheerioSVGService = require('../services/cheerioSVGService.service');

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

    async generateRandomSVG (request, response) {
        console.log('generateRandomSVG:', request.params, request.headers);

        console.log(blockcitiesContractService.details(1));

        try {
            const {bases, bodies, roofs} = await loadSvgs();

            const randomBase = Math.floor(Math.random() * bases.length);
            const randomBody = Math.floor(Math.random() * bodies.length);
            const randomRoof = Math.floor(Math.random() * roofs.length);

            console.log(`base ${randomBase} body ${randomBody} roof ${randomRoof}`);

            // height of the base, body, roof - minus the difference in the offset anchor from body and height
            const canvasHeight = bases[randomBase].height
                + bodies[randomBody].height
                + roofs[randomRoof].height
                - (bases[randomBase].height - bases[randomBase].anchor)
                - (bodies[randomBody].height - bodies[randomBody].anchor);

            // Always assume the base if the widest post for now
            const canvasWidth = bases[randomBase].width;

            const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');

            const ctx = canvas.getContext('2d');

            // Base
            ctx.drawImage(bases[randomBase].svg, (canvasWidth - bases[randomBase].width) / 2, canvasHeight - bases[randomBase].height);

            // Body
            ctx.drawImage(bodies[randomBody].svg, (canvasWidth - bodies[randomBody].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].height);

            // Roof
            ctx.drawImage(roofs[randomRoof].svg, (canvasWidth - roofs[randomRoof].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].anchor - roofs[randomRoof].height);

            response.contentType('image/svg+xml');
            const buffer = canvas.toBuffer('image/svg+xml', {
                title: `base ${randomBase} body ${randomBody} roof ${randomRoof}`,
                keywords: 'BlockCities',
                creationDate: new Date()
            });
            return response.send(buffer);
        } catch (e) {
            console.error(e);
        }
    },

    async generateSVG (request, response) {
        console.log('generateSVG:', request.params, request.headers);

        try {
            const {bases, bodies, roofs} = await loadSvgs();

            const randomBase = request.params.base;
            const randomBody = request.params.body;
            const randomRoof = request.params.roof;

            console.log(`base ${randomBase} body ${randomBody} roof ${randomRoof}`);

            // height of the base, body, roof - minus the difference in the offset anchor from body and height
            const canvasHeight = bases[randomBase].height
                + bodies[randomBody].height
                + roofs[randomRoof].height
                - (bases[randomBase].height - bases[randomBase].anchor)
                - (bodies[randomBody].height - bodies[randomBody].anchor);

            // Always assume the base if the widest post for now
            const canvasWidth = bases[randomBase].width;

            const canvas = createCanvas(canvasWidth, canvasHeight, 'svg');

            const ctx = canvas.getContext('2d');

            // Base
            ctx.drawImage(bases[randomBase].svg, (canvasWidth - bases[randomBase].width) / 2, canvasHeight - bases[randomBase].height);

            // Body
            ctx.drawImage(bodies[randomBody].svg, (canvasWidth - bodies[randomBody].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].height);

            // Roof
            ctx.drawImage(roofs[randomRoof].svg, (canvasWidth - roofs[randomRoof].width) / 2, canvasHeight - bases[randomBase].anchor - bodies[randomBody].anchor - roofs[randomRoof].height);

            response.contentType('image/svg+xml');
            const buffer = canvas.toBuffer('image/svg+xml', {
                title: `base ${randomBase} body ${randomBody} roof ${randomRoof}`,
                keywords: 'BlockCities',
                creationDate: new Date()
            });
            return response.send(buffer);
        } catch (e) {
            console.error(e);
        }
    },

    /*
        https://us-central1-block-cities.cloudfunctions.net/api/stitch?exterior_x002D_L1=yellow&exterior_x002D_R2=cyan&top_x002D_T1=pink&top_x002D_T2=purple&window_x002D_R1=lime&window_x002D_L1=magenta
    */
    async processAndStack (request, response) {
        console.log('processAndStack:', request.params, request.headers);

        const qOr = (r, p, d) => r.query[p] ? r.query[p] : d;

        try {
            <!--.windows_x002D_R1{fill:#171717;}-->
            <!--.body_x002D_L1{fill:#2E2E2E;}-->
            <!--.body_x002D_R1{fill:#5D5D5D;}-->
            <!--.top_x002D_T1{fill:#8B8B8B;}-->

            const fills = [
                {className: '.exterior_x002D_L1', fill: qOr(request, 'exterior_x002D_L1', '#2E2E2E')},
                {className: '.exterior_x002D_R2', fill: qOr(request, 'exterior_x002D_R2', '#5D5D5D')},
                {className: '.top_x002D_T1', fill: qOr(request, 'top_x002D_T1', '#E8E8E8')},
                {className: '.top_x002D_T2', fill: qOr(request, 'top_x002D_T2', '#B9B9B9')},
                <!--.body_x002D_L1{fill:#2E2E2E;}-->
                <!--.body_x002D_R1{fill:#5D5D5D;}-->
                {className: '.window_x002D_R1', fill: qOr(request, 'window_x002D_R1', '#171717')},
                {className: '.window_x002D_L1', fill: qOr(request, 'window_x002D_L1', '#171717')},
            ];

            const rawBaseSvg = await readFilePromise('./image/raw_svgs/svgs/equitable-standard-base.svg', 'utf8');
            // const rawBodySvg = await readFilePromise('./image/raw_svgs/svgs/equitable-body-01.svg', 'utf8');
            const rawBodySvg = await readFilePromise('./image/raw_svgs/svgs/equitable-body-tall-01.svg', 'utf8');
            const rawRoofSvg = await readFilePromise('./image/raw_svgs/svgs/equitable-standard-roof-01.svg', 'utf8');
            // const rawRoofSvg = await readFilePromise('./image/raw_svgs/svgs/pool-roof-7-01.svg', 'utf8');

            const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(rawBaseSvg, fills);
            const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(rawBodySvg, fills);
            const {svg: processedRoofSvg} = cheerioSVGService.process(rawRoofSvg, fills);

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
        } catch (e) {
            console.error(e);
        }
    },

    async processSVG (request, response) {

        try {
            const fills = [
                {className: '.exterior_x002D_L1', fill: 'pink'},
                {className: '.exterior_x002D_R2', fill: 'yellow'},
                {className: '.top_x002D_T1', fill: 'red'},
                {className: '.window_x002D_R1', fill: 'green'},
                {className: '.st0', fill: 'purple'},
                {className: '.st1', fill: 'cyan'},
                {className: '.st2', fill: 'blue'}
            ];

            const processedSvg = cheerioSVGService.process(
                require('./testSvg'),
                fills
            );

            response.contentType('image/svg+xml');
            return response.send(processedSvg);
        } catch (e) {
            console.error(e);
        }
    },

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

        console.log(basePath);
        console.log(bodyPath);
        console.log(roofPath);

        const fills = [
            {className: '.exterior_x002D_L1', fill: '#2E2E2E'},
            {className: '.exterior_x002D_R2', fill: '#5D5D5D'},
            {className: '.top_x002D_T1', fill: '#E8E8E8'},
            {className: '.top_x002D_T2', fill: '#B9B9B9'},
            {className: '.window_x002D_R1', fill: '#171717'},
            {className: '.window_x002D_L1', fill: '#171717'},
        ];

        const rawBaseSvg = await readFilePromise(basePath, 'utf8');
        const rawBodySvg = await readFilePromise(bodyPath, 'utf8');
        const rawRoofSvg = await readFilePromise(roofPath, 'utf8');

        // console.log(rawBaseSvg);
        // console.log(rawBodySvg);
        // console.log(rawRoofSvg);

        const {svg: processedBaseSvg, anchor: processedBaseAnchor} = cheerioSVGService.process(rawBaseSvg, fills);
        const {svg: processedBodySvg, anchor: processedBodyAnchor} = cheerioSVGService.process(rawBodySvg, fills);
        const {svg: processedRoofSvg} = cheerioSVGService.process(rawRoofSvg, fills);

        // console.log(processedBaseSvg);
        // console.log(rawBodySvg);
        // console.log(rawRoofSvg);

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
