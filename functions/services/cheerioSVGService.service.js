const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, fillClasses = [], opacityClasses = []) {
        const $ = require('cheerio').load(svgXml, {xmlMode: true});

        // _.forEach(fillClasses, (c) => $(c.className).attr('fill', c.fill));

        const svgId = $('svg').attr('id');
        const anchor = svgId.split('_')[1];
        console.log(anchor);
        return {svg: $.xml(), anchor};
    }
}

module.exports = new CheerioSVGService();
