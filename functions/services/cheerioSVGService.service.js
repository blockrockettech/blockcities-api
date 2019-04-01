const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, exteriorFill = {}, windowsFill = {}, curtainsFill = {}) {
        try {
            const $ = require('cheerio').load(svgXml, {xmlMode: true});

            _.forEach(exteriorFill.left, (v, k) => {$(`.exterior-L-${k}`).attr('style', `fill: ${v}`);});
            _.forEach(exteriorFill.right, (v, k) => $(`.exterior-R-${k}`).attr('style', `fill: ${v}`));
            _.forEach(exteriorFill.top, (v, k) => $(`.top-${k}`).attr('style', `fill: ${v}`));

            _.forEach(windowsFill.left, (v, k) => $(`.window-L-${k}`).attr('style', `fill: ${v}`));
            _.forEach(windowsFill.right, (v, k) => $(`.window-R-${k}`).attr('style', `fill: ${v}`));

            _.forEach(curtainsFill.left, (v, k) => $(`.curtain-L-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
            _.forEach(curtainsFill.right, (v, k) => $(`.curtain-R-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));

            let anchorElement = $('[id^=anchor_]').first();
            let anchorX = undefined;
            let anchorY = undefined;
            let anchorWidthPath = undefined;

            if (anchorElement && anchorElement.attr('id')) {
                let id = anchorElement.attr('id');
                let split = id.split('_');
                anchorX = split[1];
                anchorY = split[2];
                anchorWidthPath = split[3];
            }

            return {
                svg: $.xml(),
                anchorX: anchorX,
                anchorY: anchorY,
                anchorWidthPath: anchorWidthPath,
            };
        } catch (e) {
            console.error(e);
        }
    }

    // isCurtainBody(svgXml) {
    //     try {
    //         const $ = require('cheerio').load(svgXml, {xmlMode: true});
    //         return $('[class^=curtain-]').length;
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
}

module.exports = new CheerioSVGService();
