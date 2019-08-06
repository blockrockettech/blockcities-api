const fs = require('fs');
const _ = require('lodash');
const imageBuilderService = require('../../functions/services/imageBuilder.service');

void async function () {

    const buildingRange = _.range(24, 25);

    let total = 0;

    if (!fs.existsSync(__dirname + `/output/`)) {
        fs.mkdirSync(__dirname + `/output/`);
    }

    const failures = [];
    const promises = [];

    _.forEach(buildingRange, (buildId) => {

        const bases = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Bases/`);
        // console.log(bases);

        const bodies = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Bodies/`);
        // console.log(bodies);

        const roofs = fs.readdirSync(__dirname + `/../../functions/raw_svgs/${buildId}/Roofs/`);
        // console.log(roofs);

        for (let base in bases) {
            // console.log('base', base);
            for (let body in bodies) {
                // console.log('body', body);
                for (let roof in roofs) {
                    // console.log('body', body);

                    if (!fs.existsSync(__dirname + `/output/${buildId}`)) {
                        fs.mkdirSync(__dirname + `/output/${buildId}`);
                    }

                    total++;

                    promises.push(imageBuilderService
                        .generatePureSvg({
                            building: buildId,
                            base: base,
                            body: body,
                            roof: roof,
                            exteriorColorway: 0,
                            backgroundColorway: 0,
                        })
                        .then((image) => {
                            console.log(`Creating - building [${buildId}] base [${base}] body [${body}] roof [${roof}]`);
                            fs.writeFileSync(__dirname + `/output/${buildId}/${base} - ${body} - ${roof}.svg`, image);
                        })
                        .catch((error) => {
                            console.log('failure', error);
                            failures.push(`Failed to generate - building [${buildId}] base [${base}] body [${body}] roof [${roof}]`);
                        }));
                }
            }
        }

    });

    console.log(`Attempting to generate [${total}] buildings`);

    await Promise.all(promises);

    _.forEach(failures, (failure) => {
        console.log(failure);
    });

}();
