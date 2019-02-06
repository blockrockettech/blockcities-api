const _ = require('lodash');

class CheerioSVGService {

    findAnchorPoint(svg) {
        const svgId = svg.attr('id');
        return svgId.split('_')[1];
    }

    process(svgXml, exteriorFill = {}, windowsFill = {}, concreteFill = {}) {
        const $ = require('cheerio').load(svgXml, {xmlMode: true});

        _.forEach(exteriorFill.left, (v, k) => $(`.exterior_x002D_L_x002D_${k}`).attr('fill', v));
        _.forEach(exteriorFill.right, (v, k) => $(`.exterior_x002D_R_x002D_${k}`).attr('fill', v));
        _.forEach(exteriorFill.top, (v, k) => $(`.top_x002D_${k}`).attr('fill', v));

        _.forEach(windowsFill.left, (v, k) => $(`.window_x002D_L_x002D_${k}`).attr('fill', v));
        _.forEach(windowsFill.right, (v, k) => $(`.window_x002D_R_x002D_${k}`).attr('fill', v));

        // FIXME if darkgrey exterior then dark concrete
        _.forEach(concreteFill.classic, (v, k) => $(`.concrete_x002D_${k}`).attr('fill', v));

        return {
            svg: $.xml(),
            anchor: this.findAnchorPoint($('svg'))
        };
    }
}

module.exports = new CheerioSVGService();
