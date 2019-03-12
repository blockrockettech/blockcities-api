const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, exteriorFill = {}, windowsFill = {}, curtainsFill = {}, concreteFill = {}) {

        try {
            const $ = require('cheerio').load(svgXml, {xmlMode: true});

            _.forEach(exteriorFill.left, (v, k) => {$(`.exterior-L-${k}`).attr('style', `fill: ${v}`);});
            _.forEach(exteriorFill.right, (v, k) => $(`.exterior-R-${k}`).attr('style', `fill: ${v}`));
            _.forEach(exteriorFill.top, (v, k) => $(`.top-${k}`).attr('style', `fill: ${v}`));

            _.forEach(windowsFill.left, (v, k) => $(`.window-L-${k}`).attr('style', `fill: ${v}`));
            _.forEach(windowsFill.right, (v, k) => $(`.window-R-${k}`).attr('style', `fill: ${v}`));

            _.forEach(curtainsFill.left, (v, k) => $(`.curtain-L-${k.replace('_', '-')}`).attr('style', `fill: ${v}`));
            _.forEach(curtainsFill.right, (v, k) => $(`.curtain-R-${k.replace('_', '-')}`).attr('style', `fill: ${v}`));

            // FIXME if darkgrey exterior then dark concrete
            _.forEach(concreteFill.classic, (v, k) => $(`.concrete-${k}`).attr('style', `fill: ${v}`));

            let anchorElement = $('[id^=anchor_]').first();
            let anchorX = undefined;
            let anchorY = undefined;

            if (anchorElement && anchorElement.attr('id')) {
                let id = anchorElement.attr('id');
                console.log(`id ${id}`);
                anchorX = id.split('_')[1];
                anchorY = id.split('_')[2];
                console.log(`anchorX ${anchorX}`);
                console.log(`anchorY ${anchorY}`);
            }

            return {
                svg: $.xml(),
                anchorX: anchorX,
                anchorY: anchorY,
            };
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new CheerioSVGService();
