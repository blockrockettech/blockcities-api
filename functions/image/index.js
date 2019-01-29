const {createCanvas, loadImage} = require('canvas');
const cheerio = require('cheerio');
const blockcitiesContractService = require('../services/blockcities.contract.service');

const loadSvgs = async function () {
    const base0 = await loadImage('./image/svgs/bases/432-park-curt-base.svg');
    const base1 = await loadImage('./image/svgs/bases/432-park-horiz-base.svg');
    const base2 = await loadImage('./image/svgs/bases/432-park-rect-base.svg');
    const base3 = await loadImage('./image/svgs/bases/432-park-vert-base.svg');

    const body0 = await loadImage('./image/svgs/bodies/body-curt-windows.svg');
    const body1 = await loadImage('./image/svgs/bodies/body-horiz-windows.svg');
    const body2 = await loadImage('./image/svgs/bodies/body-rect-windows.svg');
    const body3 = await loadImage('./image/svgs/bodies/body-vert-windows.svg');

    const roof0 = await loadImage('./image/svgs/roofs/432-park-roof.svg');
    const roof1 = await loadImage('./image/svgs/roofs/200-vesey-roof.svg');
    const roof2 = await loadImage('./image/svgs/roofs/pool-roof-11.svg');

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

            // new Image("data:image/svg+xml," + svgdata);

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

    async fillSVG (request, response) {

        try {
            let svgRaw = require('./testSvg');

            const $ = cheerio.load(svgRaw);

            // <style type="text/css">
            // .exterior_x002D_L1{fill:#2E2E2E;}
            // .exterior_x002D_R2{fill:#5D5D5D;}
            // .top_x002D_T1{fill:#E8E8E8;}
            // .window_x002D_R1{fill:#171717;}
            // .st0{fill:#A2A2A2;}
            // .st1{fill:#D1D1D1;}
            // .st2{fill:#8B8B8B;}
            // </style>

            $('.exterior_x002D_L1').attr('fill', 'pink');
            $('.exterior_x002D_R2').attr('fill', 'yellow');
            $('.top_x002D_T1').attr('fill', 'red');
            $('.window_x002D_R1').attr('fill', 'green');
            $('.st0').attr('fill', 'purple');
            $('.st1').attr('fill', 'cyan');
            $('.st2').attr('fill', 'blue');

            // console.log(canvas.svg());
            response.contentType('image/svg+xml');
            return response.send($.xml());
        } catch (e) {
            console.error(e);
        }
    }

}
;
