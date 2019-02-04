const _ = require('lodash');

class CheerioSVGService {

    findAnchorPoint(svg) {
        const svgId = svg.attr('id');
        return svgId.split('_')[1];
    }

    process(svgXml, exteriorFill = {}, windowsFill = {}, concreteFill = {}) {
        const $ = require('cheerio').load(svgXml, {xmlMode: true});

        _.forEach(exteriorFill, (v, k) => $(`.exterior_x002D_${k}`).attr('fill', v));
        _.forEach(exteriorFill, (v, k) => $(`.top_x002D_${k}`).attr('fill', v));
        _.forEach(windowsFill, (v, k) => $(`.window_x002D_${k}`).attr('fill', v));
        _.forEach(concreteFill, (v, k) => $(`.concrete_x002D_${k}`).attr('fill', v));

        return {
            svg: $.xml(),
            anchor: this.findAnchorPoint($('svg'))
        };
    }
}

module.exports = new CheerioSVGService();
