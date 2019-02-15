const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, exteriorFill = {}, windowsFill = {}, concreteFill = {}) {

        try {
            const $ = require('cheerio').load(svgXml, {xmlMode: true});

            _.forEach(exteriorFill.left, (v, k) => {$(`.exterior-L-${k}`).attr('style', `fill: ${v}`);});
            _.forEach(exteriorFill.right, (v, k) => $(`.exterior-R-${k}`).attr('style', `fill: ${v}`));
            _.forEach(exteriorFill.top, (v, k) => $(`.top-${k}`).attr('style', `fill: ${v}`));

            _.forEach(windowsFill.left, (v, k) => $(`.window-L-${k}`).attr('style', `fill: ${v}`));
            _.forEach(windowsFill.right, (v, k) => $(`.window-R-${k}`).attr('style', `fill: ${v}`));

            // FIXME if darkgrey exterior then dark concrete
            _.forEach(concreteFill.classic, (v, k) => $(`.concrete-${k}`).attr('style', `fill: ${v}`));

            let anchorElement = $('[id^=anchor-01_]').first();
            let anchor = undefined;

            if (anchorElement && anchorElement.attr('id')) {
                anchor = anchorElement.attr('id').split('_')[1];
            }

            return {
                svg: $.xml(),
                anchor: anchor
            };
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new CheerioSVGService();
