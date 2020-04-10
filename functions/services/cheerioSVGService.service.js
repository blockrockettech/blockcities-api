const _ = require('lodash');
const cheerio = require('cheerio');

class CheerioSVGService {

    process(svgXml) {
        try {
            const $ = cheerio.load(svgXml, { xmlMode: true });

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

    styleFill(svgXml, exteriorFill = {}, windowsFill = {}, curtainsFill = {}, slopeFill = {}, crownFill = {}, concreteFill = {}) {
        try {
            const $ = cheerio.load(svgXml, { xmlMode: true });

            _.forEach(exteriorFill.left, (v, k) => { $(`.exterior-L-${k}`).attr('style', `fill: ${v}`); });
            _.forEach(exteriorFill.right, (v, k) => $(`.exterior-R-${k}`).attr('style', `fill: ${v}`));
            _.forEach(exteriorFill.top, (v, k) => $(`.top-${k}`).attr('style', `fill: ${v}`));

            _.forEach(windowsFill.left, (v, k) => $(`.window-L-${k}`).attr('style', `fill: ${v}`));
            _.forEach(windowsFill.right, (v, k) => $(`.window-R-${k}`).attr('style', `fill: ${v}`));

            _.forEach(curtainsFill.left, (v, k) => $(`.curtain-L-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
            _.forEach(curtainsFill.right, (v, k) => $(`.curtain-R-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));

            _.forEach(curtainsFill.left, (v, k) => $(`.curtain-L-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
            _.forEach(curtainsFill.right, (v, k) => $(`.curtain-R-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));

            if (slopeFill) {
                _.forEach(slopeFill.left, (v, k) => $(`.slope-L-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
                _.forEach(slopeFill.right, (v, k) => $(`.slope-R-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
                _.forEach(slopeFill.top, (v, k) => $(`.slope-top-${k}`).attr('style', `fill: ${v}`));
            }

            if (crownFill) {
                _.forEach(crownFill.left, (v, k) => $(`.crown-L-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
                _.forEach(crownFill.right, (v, k) => $(`.crown-R-${k.replace('_', '-').replace('_', '-')}`).attr('style', `fill: ${v}`));
                _.forEach(crownFill.top, (v, k) => $(`.crown-top-${k}`).attr('style', `fill: ${v}`));
            }

            _.forEach(concreteFill, (v, k) => $(`.concrete-${k}`).attr('style', `fill: ${v}`));

            return $.xml();
        } catch (e) {
            console.error(e);
        }
    }

    getRoot(svgXml) {
        const $ = cheerio.load(svgXml, { xmlMode: true, normalizeWhitespace: true, });
        const root = $('#root').html();
        if (!root) {
            console.error('ERROR - Failed to get root');
        }
        return root;
    };

    getStyle(svgXml, targetDiv) {
        const $ = cheerio.load(svgXml, { xmlMode: true, normalizeWhitespace: true, });

        let processedStyle = $('style').html();

        // namespace to related section of building
        processedStyle = processedStyle.replace(/.cls-/g, `#${targetDiv} .cls-`);
        processedStyle = processedStyle.replace(/.concrete/g, `#${targetDiv} .concrete`);

        return processedStyle;
    };

    getAdditionlDefs(svgXml, element) {
        const $ = cheerio.load(svgXml, { xmlMode: true, normalizeWhitespace: true, });
        return $(element);
    };
}

module.exports = new CheerioSVGService();
