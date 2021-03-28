'use strict';

exports.type = 'full';

exports.name = 'addIdToSVGElement';

exports.active = true;

exports.description = 'adds Id to the <svg> element based on file name';

exports.fn = function (data, params, config) {
  const svg = data.content[0];
  if (svg.isElem('svg')) {
    const { path } = config;
    const filename = path.split(/\.svg$/)[0].split('/').pop();
    const ret = svg.addAttr({
      name: 'id',
      value: `sly-svg_${filename}`,
      prefix: '',
      local: '',
    });
  }
  return data;
};
