const _ = require('lodash');

class CheerioSVGService {

    findAnchorPoint(svg) {
        const svgId = svg.attr('id');
        return svgId.split('_')[1];
    }

    process(svgXml, exteriorFill = {}, windowsFill = {}, concreteFill = {}) {
        const $ = require('cheerio').load(svgXml, {xmlMode: true});

        // console.log(svgXml, exteriorFill, windowsFill, concreteFill);

        <!--.concrete_x002D_left{fill:#A2A2A2;}-->
        <!--.concrete_x002D_right{fill:#D1D1D1;}-->
        <!--.concrete_x002D_top{fill:#E8E8E8;}-->
        <!--.exterior_x002D_L_x002D_prim{fill:#2E2E2E;}-->
        <!--.exterior_x002D_R_x002D_prim{fill:#5D5D5D;}-->
        <!--.window_x002D_R_x002D_prim{fill:#202020;}-->
        <!--.window_x002D_L_x002D_light{fill:#242424;}-->
        <!--.window_x002D_L_x002D_light_x0020_2{fill:#1C1C1C;}-->
        <!--.window_x002D_R_x002D_light{fill:#353535;}-->
        <!--.top_x002D_prim{fill:#B9B9B9;}-->

        _.forEach(exteriorFill.left, (v, k) => $(`.exterior_x002D_L_x002D_${k}`).attr('fill', v));
        _.forEach(exteriorFill.right, (v, k) => $(`.exterior_x002D_R_x002D_${k}`).attr('fill', v));
        _.forEach(exteriorFill.top, (v, k) => $(`.top_x002D_${k}`).attr('fill', v));

        _.forEach(windowsFill.left, (v, k) => $(`.window_x002D_L_x002D_${k}`).attr('fill', v));
        _.forEach(windowsFill.right, (v, k) => $(`.window_x002D_R_x002D_${k}`).attr('fill', v));

        // _.forEach(exteriorFill, (v, k) => $(`.top_x002D_${k}`).attr('fill', v));
        // _.forEach(windowsFill, (v, k) => $(`.window_x002D_${k}`).attr('fill', v));
        // _.forEach(concreteFill, (v, k) => $(`.concrete_x002D_${k}`).attr('fill', v));

        return {
            svg: $.xml(),
            anchor: this.findAnchorPoint($('svg'))
        };
    }
}

module.exports = new CheerioSVGService();
