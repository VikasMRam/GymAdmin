'use strict';

exports.type = 'perItemReverse';

exports.name = 'removeXLinks';

exports.active = true;

exports.description = 'removeXLinks from svg leaving hrefs';

exports.fn = function (item, params, config) {
  if (item.isElem('svg') && item.hasAttr('xmlns:xlink')) {
    item.removeAttr('xmlns:xlink');
  }

  if(item.hasAttr('xlink:href')) {
    const attr = item.attr('xlink:href');
    attr.prefix = '';
    attr.name = 'href';
  }
};
