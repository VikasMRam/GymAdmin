'use strict';

const bestMatch = require('./mimeparse').bestMatch;

const imageOptions = [
  'image/jpeg',
  'image/webp',
//  let's avoid avif for the moment
//  'image/avif',
];

const slashExt = imageOptions.map(o => `/${o.split('/')[1]}`);
const imagesRegexp = new RegExp(`^/images(?!${slashExt.join('|')})/a?\\d*x\\d*/.+`);

exports.handler = async (event) => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  let currentImageFormat = 0;
  if (imagesRegexp.test(request.uri)) {
    const accept = headers.accept || [];
    for (let i = 0; i < headers.accept.length; i++) {
      const res = bestMatch(imageOptions, headers.accept[i].value);
      console.log('requested', res);
      const resIndex = imageOptions.indexOf(res);
      // if we prefer that format and it's explicitly mentioned in the header (not )
      if (resIndex > currentImageFormat && headers.accept[i].value.indexOf(res) !== -1) {
        currentImageFormat = resIndex;
      }
    }
    const [_, chunk] = imageOptions[currentImageFormat].split('/');
    request.uri = request.uri.replace(/^\/images/, `/images/${chunk}`);
  }

  return request;
};
