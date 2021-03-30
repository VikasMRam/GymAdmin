/* eslint-disable */
// const addIdToSVGElement = require('./svgoPlugins/addIdToSVGElement');
const removeXLinks = require('./svgoPlugins/removeXLinks');

module.exports = {
  "comment": "This is the settings file for the SVGO Compressor Plugin. For more info, please check <https://github.com/BohemianCoding/svgo-compressor>",
  "multipass": true,
  "floatPrecision": 3,
  "js2svg": {
    "pretty": true,
    "indent": 2,
  },
  "plugins": [
    {
      "name": "removeDoctype",
      "active": true
    },
    {
      "name": "removeXMLProcInst",
      "active": true
    },
    {
      "name": "removeComments",
      "active": true
    },
    {
      "name": "removeMetadata",
      "active": true
    },
    {
      "name": "removeXMLNS",
      "active": true
    },
    {
      "name": "removeEditorsNSData",
      "active": true
    },
    {
      "name": "cleanupAttrs",
      "active": true
    },
    {
      "name": "inlineStyles",
      "active": false
    },
    {
      "name": "minifyStyles",
      "active": true
    },
    {
      "name": "convertStyleToAttrs",
      "active": true
    },
    {
      "name": "cleanupIDs",
      "active": true
    },
    {
      "name": "prefixIds",
      "active": false
    },
    {
      "name": "removeRasterImages",
      "active": false
    },
    {
      "name": "removeUselessDefs",
      "active": true
    },
    {
      "name": "cleanupNumericValues",
      "active": true
    },
    {
      "name": "cleanupListOfValues",
      "active": true
    },
    {
      "name": "convertColors",
      "active": true
    },
    {
      "name": "removeUnknownsAndDefaults",
      "active": true
    },
    {
      "name": "removeNonInheritableGroupAttrs",
      "active": true
    },
    {
      "name": "removeUselessStrokeAndFill",
      "active": true
    },
    {
      "name": "removeViewBox",
      "active": false
    },
    {
      "name": "cleanupEnableBackground",
      "active": false
    },
    {
      "name": "removeHiddenElems",
      "active": false
    },
    {
      "name": "removeEmptyText",
      "active": true
    },
    {
      "name": "convertShapeToPath",
      "active": false
    },
    {
      "name": "moveElemsAttrsToGroup",
      "active": false
    },
    {
      "name": "moveGroupAttrsToElems",
      "active": false
    },
    {
      "name": "collapseGroups",
      "active": true
    },
    {
      "name": "convertPathData",
      "active": false
    },
    {
      "name": "convertTransform",
      "active": true
    },
    {
      "name": "removeEmptyAttrs",
      "active": true
    },
    {
      "name": "removeEmptyContainers",
      "active": true
    },
    {
      "name": "mergePaths",
      "active": true
    },
    {
      "name": "removeUnusedNS",
      "active": true
    },
    {
      "name": "sortAttrs",
      "active": true
    },
    {
      "name": "removeTitle",
      "active": true
    },
    {
      "name": "removeDesc",
      "active": true,
      "params": {
        "removeAny": true
      }
    },
    {
      "name": "removeDimensions",
      "active": false
    },
    {
      "name": "removeAttrs",
      "params": {
        "attrs": ["fill", "color", "width", "height"]
      }
    },
    {
      "name": "removeElementsByAttr",
      "active": false
    },
    {
      "name": "addClassesToSVGElement",
      "active": false
    },
    {
      "name": "removeStyleElement",
      "active": false
    },
    {
      "name": "removeScriptElement",
      "active": false
    },
    {
      "name": "addAttributesToSVGElement",
      "params": {
        "attribute": {
          "fill": "currentColor"
        }
      }
    },
    // addIdToSVGElement,
    removeXLinks,
  ],
};
