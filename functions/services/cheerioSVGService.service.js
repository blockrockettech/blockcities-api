const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, exteriorFill = {}, windowsFill = {}, concreteFill = {}) {
        const $ = require('cheerio').load(svgXml, {xmlMode: true});

        _.forEach(exteriorFill, (v, k) => $(`.exterior_x002D_${k}`).attr('fill', v));
        _.forEach(windowsFill, (v, k) => $(`.window_x002D_${k}`).attr('fill', v));
        _.forEach(concreteFill, (v, k) => $(`.concrete_x002D_${k}`).attr('fill', v));

        const svgId = $('svg').attr('id');
        const anchor = svgId.split('_')[1];

        return {svg: $.xml(), anchor};
    }
}

module.exports = new CheerioSVGService();
