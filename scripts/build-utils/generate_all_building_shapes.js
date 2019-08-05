const fs = require('fs');
const _ = require('lodash');
const imageBuilderService = require('../../functions/services/imageBuilder.service');

void async function () {

    const buildingRange = _.range(0, 29);

    let total = 0;

    if (!fs.existsSync(__dirname + `/output/`)) {
        fs.mkdirSync(__dirname + `/output/`);
    }

    _.forEach(buildingRange, (buildId) => {

        const bases = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Bases/`);
        // console.log(bases);

        const bodies = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Bodies/`);
        // console.log(bodies);

        const roofs = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Roofs/`);
        // console.log(roofs);

        for (let base in bases) {
            for (let body in bodies) {
                for (let roof in roofs) {

                    if (!fs.existsSync(__dirname + `/output/${buildId}`)) {
                        fs.mkdirSync(__dirname + `/output/${buildId}`);
                    }

                    total++;

                    imageBuilderService.generatePureSvg({
                        building: buildId,
                        base: base,
                        body: body,
                        roof: roof,
                        exteriorColorway: 0,
                        backgroundColorway: 0,
                    })
                        .then((image) => {
                            console.log(`Creating - build [${buildId}] base [${base}] body [${body}] roof [${roof}]`);
                            fs.writeFileSync(__dirname + `/output/${buildId}/${base} - ${body} - ${roof}.svg`, image);
                        });
                }
            }
        }

    });

    console.log(`Attempting to generate [${total}] buildings`);

}();
