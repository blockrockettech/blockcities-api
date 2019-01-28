const {createCanvas, loadImage} = require('canvas');

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
            let svgRaw = `
        <?xml version="1.0" standalone="no"?>
<!-- Generator: Gravit.io -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="745 75.056 130 305.996" width="130" height="305.996">
    <switch>
        <g id="Group">
            <path d=" M 810 305.996 L 875 343.523 L 810 381.051 L 745 343.523 L 810 305.996 Z " id="top-T2" fill="rgb(255,255,255)" />
            <g id="Group">
                <path d=" M 810 230.94 L 875 268.468 L 810 305.996 L 745 268.468 L 810 230.94 Z " id="top-T2" fill="rgb(255,255,255)" />
                <path d=" M 810 305.996 L 875 268.468 L 875 343.523 L 810 381.051 L 810 305.996 Z " id="body-R2" fill="rgb(247,242,239)" />
                <path d=" M 810 305.996 L 745 268.468 L 745 343.523 L 810 381.051 L 810 305.996 Z " id="body-L2" fill="rgb(176,165,155)" />
                <g id="windows-R2">
                    <path d=" M 815 308.882 L 825 303.109 L 825 314.656 L 815 320.429 L 815 308.882 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 830 300.222 L 840 294.449 L 840 305.996 L 830 311.769 L 830 300.222 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 845 291.562 L 855 285.788 L 855 297.335 L 845 303.109 L 845 291.562 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 860 282.902 L 870 277.128 L 870 288.675 L 860 294.449 L 860 282.902 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 815 343.523 L 825 337.75 L 825 349.297 L 815 355.07 L 815 343.523 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 830 334.863 L 840 329.09 L 840 340.637 L 830 346.41 L 830 334.863 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 845 326.203 L 855 320.429 L 855 331.976 L 845 337.75 L 845 326.203 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 860 317.543 L 870 311.769 L 870 323.316 L 860 329.09 L 860 317.543 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 815 326.203 L 825 320.429 L 825 331.976 L 815 337.75 L 815 326.203 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 830 317.543 L 840 311.769 L 840 323.316 L 830 329.09 L 830 317.543 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 845 308.882 L 855 303.109 L 855 314.656 L 845 320.429 L 845 308.882 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 860 300.222 L 870 294.449 L 870 305.996 L 860 311.769 L 860 300.222 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 815 360.844 L 825 355.07 L 825 366.617 L 815 372.391 L 815 360.844 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 830 352.184 L 840 346.41 L 840 357.957 L 830 363.731 L 830 352.184 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 845 343.523 L 855 337.75 L 855 349.297 L 845 355.07 L 845 343.523 Z " class="window" fill="rgb(76,143,172)" />
                    <path d=" M 860 334.863 L 870 329.09 L 870 340.637 L 860 346.41 L 860 334.863 Z " class="window" fill="rgb(76,143,172)" />
                </g>
                <g id="windows-L2">
                    <path d=" M 805 308.882 L 795 303.109 L 795 314.656 L 805 320.429 L 805 308.882 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 790 300.222 L 780 294.449 L 780 305.996 L 790 311.769 L 790 300.222 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 775 291.562 L 765 285.788 L 765 297.335 L 775 303.109 L 775 291.562 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 760 282.902 L 750 277.128 L 750 288.675 L 760 294.449 L 760 282.902 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 805 343.523 L 795 337.75 L 795 349.297 L 805 355.07 L 805 343.523 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 790 334.863 L 780 329.09 L 780 340.637 L 790 346.41 L 790 334.863 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 775 326.203 L 765 320.429 L 765 331.976 L 775 337.75 L 775 326.203 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 760 317.543 L 750 311.769 L 750 323.316 L 760 329.09 L 760 317.543 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 805 326.203 L 795 320.429 L 795 331.976 L 805 337.75 L 805 326.203 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 790 317.543 L 780 311.769 L 780 323.316 L 790 329.09 L 790 317.543 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 775 308.882 L 765 303.109 L 765 314.656 L 775 320.429 L 775 308.882 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 760 300.222 L 750 294.449 L 750 305.996 L 760 311.769 L 760 300.222 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 805 360.844 L 795 355.07 L 795 366.617 L 805 372.391 L 805 360.844 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 790 352.184 L 780 346.41 L 780 357.957 L 790 363.731 L 790 352.184 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 775 343.523 L 765 337.75 L 765 349.297 L 775 355.07 L 775 343.523 Z " class="window" fill="rgb(34,79,100)" />
                    <path d=" M 760 334.863 L 750 329.09 L 750 340.637 L 760 346.41 L 760 334.863 Z " class="window" fill="rgb(34,79,100)" />
                </g>
            </g>
            <g id="gradient-L2-R2">
                <g id="Group">
                    <linearGradient id="_lgradient_0" x1="0.018518518518518157" y1="0.70896107030498" x2="0.9962962962962959" y2="0.6627730487698112" gradientTransform="matrix(90,0,0,24.321,765,237.374)" gradientUnits="userSpaceOnUse">
                        <stop offset="1.3043478260869565%" stop-opacity="1" style="stop-color:rgb(147,138,130)" />
                        <stop offset="97.82608695652173%" stop-opacity="1" style="stop-color:rgb(219,215,212)" />
                    </linearGradient>
                    <rect x="765" y="237.374" width="90" height="24.321" transform="matrix(1,0,0,1,0,0)" id="Rectangle" fill="url(#_lgradient_0)" />
                    <linearGradient id="_lgradient_1" x1="0" y1="0.5" x2="1.249756335282654" y2="0.5038599019832323" gradientTransform="matrix(90,0,0,51.962,765,235.714)" gradientUnits="userSpaceOnUse">
                        <stop offset="2.608695652173913%" stop-opacity="1" style="stop-color:rgb(147,138,130)" />
                        <stop offset="66.08695652173913%" stop-opacity="1" style="stop-color:rgb(219,215,212)" />
                    </linearGradient>
                    <ellipse vector-effect="non-scaling-stroke" cx="809.9999999999999" cy="261.69437729208573" rx="44.99999999999966" ry="25.980762113533103" id="Ellipse" fill="url(#_lgradient_1)" />
                </g>
                <ellipse vector-effect="non-scaling-stroke" cx="809.9999999999999" cy="237.373869216397" rx="44.99999999999966" ry="25.980762113533103" id="Ellipse" fill="rgb(247,242,239)" />
            </g>
            <path d=" M 825 268.468 L 820 265.581 L 820 294.449 L 825 297.335 L 825 268.468 Z " id="body-L2" fill="rgb(176,165,155)" />
            <path d=" M 795 268.468 L 800 265.581 L 800 294.449 L 795 297.335 L 795 268.468 Z " id="body-R2" fill="rgb(247,242,239)" />
            <path d=" M 840 259.808 L 835 256.921 L 835 285.788 L 840 288.675 L 840 259.808 Z " id="body-L2" fill="rgb(176,165,155)" />
            <path d=" M 780 259.808 L 785 256.921 L 785 285.788 L 780 288.675 L 780 259.808 Z " id="body-R2" fill="rgb(247,242,239)" />
            <path d=" M 855 251.147 L 850 248.261 L 850 277.128 L 855 280.015 L 855 251.147 Z " id="body-L2" fill="rgb(176,165,155)" />
            <path d=" M 765 251.147 L 770 248.261 L 770 277.128 L 765 280.015 L 765 251.147 Z " id="body-R2" fill="rgb(247,242,239)" />
            <path d=" M 870 242.487 L 865 239.6 L 865 268.468 L 870 271.355 L 870 242.487 Z " id="body-L2" fill="rgb(176,165,155)" />
            <path d=" M 750 242.487 L 755 239.6 L 755 268.468 L 750 271.355 L 750 242.487 Z " id="body-R2" fill="rgb(247,242,239)" />
            <path d=" M 810 75.056 L 875 112.583 L 810 150.111 L 745 112.583 L 810 75.056 Z " id="top-T2" fill="rgb(255,255,255)" />
            <path d=" M 810 150.111 L 875 112.583 L 875 239.6 L 810 277.128 L 810 150.111 Z " id="body-R2" fill="rgb(247,242,239)" />
            <path d=" M 810 150.111 L 745 112.583 L 745 239.6 L 810 277.128 L 810 150.111 Z " id="body-L2" fill="rgb(176,165,155)" />
            <g id="windows-R2">
                <path d=" M 815 152.998 L 825 147.224 L 825 158.771 L 815 164.545 L 815 152.998 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 144.338 L 840 138.564 L 840 150.111 L 830 155.885 L 830 144.338 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 135.677 L 855 129.904 L 855 141.451 L 845 147.224 L 845 135.677 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 127.017 L 870 121.244 L 870 132.791 L 860 138.564 L 860 127.017 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 187.639 L 825 181.865 L 825 193.412 L 815 199.186 L 815 187.639 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 178.979 L 840 173.205 L 840 184.752 L 830 190.526 L 830 178.979 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 170.318 L 855 164.545 L 855 176.092 L 845 181.865 L 845 170.318 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 161.658 L 870 155.885 L 870 167.432 L 860 173.205 L 860 161.658 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 222.28 L 825 216.506 L 825 228.053 L 815 233.827 L 815 222.28 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 213.62 L 840 207.846 L 840 219.393 L 830 225.167 L 830 213.62 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 204.959 L 855 199.186 L 855 210.733 L 845 216.506 L 845 204.959 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 196.299 L 870 190.526 L 870 202.073 L 860 207.846 L 860 196.299 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 170.318 L 825 164.545 L 825 176.092 L 815 181.865 L 815 170.318 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 161.658 L 840 155.885 L 840 167.432 L 830 173.205 L 830 161.658 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 152.998 L 855 147.224 L 855 158.771 L 845 164.545 L 845 152.998 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 144.338 L 870 138.564 L 870 150.111 L 860 155.885 L 860 144.338 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 204.959 L 825 199.186 L 825 210.733 L 815 216.506 L 815 204.959 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 196.299 L 840 190.526 L 840 202.073 L 830 207.846 L 830 196.299 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 187.639 L 855 181.865 L 855 193.412 L 845 199.186 L 845 187.639 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 178.979 L 870 173.205 L 870 184.752 L 860 190.526 L 860 178.979 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 239.6 L 825 233.827 L 825 245.374 L 815 251.147 L 815 239.6 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 230.94 L 840 225.167 L 840 236.714 L 830 242.487 L 830 230.94 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 222.28 L 855 216.506 L 855 228.053 L 845 233.827 L 845 222.28 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 213.62 L 870 207.846 L 870 219.393 L 860 225.167 L 860 213.62 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 815 256.921 L 825 251.147 L 825 262.694 L 815 268.468 L 815 256.921 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 830 248.261 L 840 242.487 L 840 254.034 L 830 259.808 L 830 248.261 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 845 239.6 L 855 233.827 L 855 245.374 L 845 251.147 L 845 239.6 Z " class="window" fill="rgb(76,143,172)" />
                <path d=" M 860 230.94 L 870 225.167 L 870 236.714 L 860 242.487 L 860 230.94 Z " class="window" fill="rgb(76,143,172)" />
            </g>
            <g id="windows-L2">
                <path d=" M 805 152.998 L 795 147.224 L 795 158.771 L 805 164.545 L 805 152.998 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 144.338 L 780 138.564 L 780 150.111 L 790 155.885 L 790 144.338 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 135.677 L 765 129.904 L 765 141.451 L 775 147.224 L 775 135.677 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 127.017 L 750 121.244 L 750 132.791 L 760 138.564 L 760 127.017 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 187.639 L 795 181.865 L 795 193.412 L 805 199.186 L 805 187.639 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 178.979 L 780 173.205 L 780 184.752 L 790 190.526 L 790 178.979 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 170.318 L 765 164.545 L 765 176.092 L 775 181.865 L 775 170.318 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 161.658 L 750 155.885 L 750 167.432 L 760 173.205 L 760 161.658 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 222.28 L 795 216.506 L 795 228.053 L 805 233.827 L 805 222.28 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 213.62 L 780 207.846 L 780 219.393 L 790 225.167 L 790 213.62 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 204.959 L 765 199.186 L 765 210.733 L 775 216.506 L 775 204.959 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 196.299 L 750 190.526 L 750 202.073 L 760 207.846 L 760 196.299 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 170.318 L 795 164.545 L 795 176.092 L 805 181.865 L 805 170.318 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 161.658 L 780 155.885 L 780 167.432 L 790 173.205 L 790 161.658 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 152.998 L 765 147.224 L 765 158.771 L 775 164.545 L 775 152.998 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 144.338 L 750 138.564 L 750 150.111 L 760 155.885 L 760 144.338 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 204.959 L 795 199.186 L 795 210.733 L 805 216.506 L 805 204.959 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 196.299 L 780 190.526 L 780 202.073 L 790 207.846 L 790 196.299 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 187.639 L 765 181.865 L 765 193.412 L 775 199.186 L 775 187.639 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 178.979 L 750 173.205 L 750 184.752 L 760 190.526 L 760 178.979 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 239.6 L 795 233.827 L 795 245.374 L 805 251.147 L 805 239.6 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 230.94 L 780 225.167 L 780 236.714 L 790 242.487 L 790 230.94 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 222.28 L 765 216.506 L 765 228.053 L 775 233.827 L 775 222.28 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 213.62 L 750 207.846 L 750 219.393 L 760 225.167 L 760 213.62 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 805 256.921 L 795 251.147 L 795 262.694 L 805 268.468 L 805 256.921 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 790 248.261 L 780 242.487 L 780 254.034 L 790 259.808 L 790 248.261 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 775 239.6 L 765 233.827 L 765 245.374 L 775 251.147 L 775 239.6 Z " class="window" fill="rgb(34,79,100)" />
                <path d=" M 760 230.94 L 750 225.167 L 750 236.714 L 760 242.487 L 760 230.94 Z " class="window" fill="rgb(34,79,100)" />
            </g>
            <path d=" M 810 288.675 L 745 251.147 L 745 256.921 L 810 294.449 L 810 288.675 Z " id="body-L2" fill="rgb(176,165,155)" />
            <g id="body-R2">
                <path d=" M 810 288.675 L 875 251.147 L 875 256.921 L 810 294.449 L 810 288.675 Z " id="Path" fill="rgb(247,242,239)" />
                <path d=" M 810 277.128 L 815 274.241 L 815 303.109 L 810 305.996 L 810 277.128 Z " id="Path" fill="rgb(247,242,239)" />
                <path d=" M 840 259.808 L 845 256.921 L 845 285.788 L 840 288.675 L 840 259.808 Z " id="Path" fill="rgb(247,242,239)" />
                <path d=" M 825 268.468 L 830 265.581 L 830 294.449 L 825 297.335 L 825 268.468 Z " id="Path" fill="rgb(247,242,239)" />
                <path d=" M 855 251.147 L 860 248.261 L 860 277.128 L 855 280.015 L 855 251.147 Z " id="Path" fill="rgb(247,242,239)" />
                <path d=" M 870 242.487 L 875 239.6 L 875 268.468 L 870 271.355 L 870 242.487 Z " id="Path" fill="rgb(247,242,239)" />
            </g>
            <g id="body-L2">
                <path d=" M 810 277.128 L 805 274.241 L 805 303.109 L 810 305.996 L 810 277.128 Z " id="Path" fill="rgb(176,165,155)" />
                <path d=" M 780 259.808 L 775 256.921 L 775 285.788 L 780 288.675 L 780 259.808 Z " id="Path" fill="rgb(176,165,155)" />
                <path d=" M 795 268.468 L 790 265.581 L 790 294.449 L 795 297.335 L 795 268.468 Z " id="Path" fill="rgb(176,165,155)" />
                <path d=" M 765 251.147 L 760 248.261 L 760 277.128 L 765 280.015 L 765 251.147 Z " id="Path" fill="rgb(176,165,155)" />
                <path d=" M 750 242.487 L 745 239.6 L 745 268.468 L 750 271.355 L 750 242.487 Z " id="Path" fill="rgb(176,165,155)" />
            </g>
            <g id="top-T1">
                <path d=" M 815 280.015 L 820 277.128 L 825 280.015 L 815 285.788 L 815 280.015 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 845 262.694 L 850 259.808 L 855 262.694 L 845 268.468 L 845 262.694 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 830 271.355 L 835 268.468 L 840 271.355 L 830 277.128 L 830 271.355 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 860 254.034 L 865 251.147 L 870 254.034 L 860 259.808 L 860 254.034 Z " id="Path" fill="rgb(255,252,250)" />
            </g>
            <g id="top-T1">
                <path d=" M 805 280.015 L 800 277.128 L 795 280.015 L 805 285.788 L 805 280.015 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 775 262.694 L 770 259.808 L 765 262.694 L 775 268.468 L 775 262.694 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 790 271.355 L 785 268.468 L 780 271.355 L 790 277.128 L 790 271.355 Z " id="Path" fill="rgb(255,252,250)" />
                <path d=" M 760 254.034 L 755 251.147 L 750 254.034 L 760 259.808 L 760 254.034 Z " id="Path" fill="rgb(255,252,250)" />
            </g>
        </g>
    </switch>
</svg>
`;

// returns a window with a document and an svg root node
            const window = require('svgdom');
            const SVG = require('svg.js')(window);
            const document = window.document;

// create svg.js instance
            const canvas = SVG(document.documentElement);

            canvas.svg(svgRaw);

            canvas.select('#windows-R2 .window').fill(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
            canvas.select('#windows-L2 .window').fill(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

            // console.log(canvas.svg());
            response.contentType('image/svg+xml');
            return response.send(canvas.svg());
        } catch (e) {
            console.error(e);
        }
    }

}
;
