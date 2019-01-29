const _ = require('lodash');

class CheerioSVGService {

    process (svgXml, fillClasses = [], opacityClasses = []) {
        const $ = require('cheerio').load(svgXml);

        _.forEach(fillClasses, (c) => $(c.className).attr('fill', c.fill));

        console.log($.xml());
        return $.xml();
    }
}

module.exports = new CheerioSVGService();
