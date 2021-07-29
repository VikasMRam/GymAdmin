'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const Sharp = require('sharp');

// set the S3 and API GW endpoints
const parseRequestUri = (path) => {
  const matchDefault = /\/(?<type>[\w\/]+)\/(?<format>[\w\/]+)\/(?<edits>(?<boundingBox>a){0,1}(?<width>[\d]{0,4})x(?<height>[\d]{0,4}))\/(?<originalKey>\S+)$/;
  const result = matchDefault.exec(path);
  if (result) {  // use sharp
    const {
      type,
      format,
      edits,
      boundingBox,
      width,
      height,
      originalKey,
    } = result.groups;

    return {
      type,
      format,
      edits,
      boundingBox: !!boundingBox,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      originalKey: `uploads/${decodeURIComponent(originalKey)}`,
      destKey: path.substring(1),
    };
  }

  return null;
};

const getResponseHeaders = (contentType, cacheControl) => {
  const headers = {
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cache-Control',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': contentType,
  };
  const corsEnabled = (process.env.CORS_ENABLED === 'Yes');
  if (corsEnabled) {
    headers['Access-Control-Allow-Origin'] = process.env.CORS_ORIGIN;
  }
  if (cacheControl) {
    headers['Cache-Control'] = cacheControl;
  }
  return headers;
};

const makeResponse = (status, body, contentType, options = {}) => {
  const { cacheControl, ...rest } = options;
  return {
    statusCode: status,
    body: body,
    headers: getResponseHeaders(contentType, cacheControl),
    ...rest,
  };
};

exports.handler = (event, context, callback) => {
  //check if image is not present
  const BUCKET = event.stageVariables.bucket;

  const params = parseRequestUri(event.path);
  if(!params) {
    // malformed request
    const response = makeResponse(400, `malformed uri: ${event.path}`, 'text/plain');
    callback(null, response);
    return;
  }

  const {
    originalKey,
    destKey,
    width,
    height,
    format,
    boundingBox,
  } = params;

  console.log('params', params);

  console.time('Acquiring');
  // get the source image file
  S3.getObject({ Bucket: BUCKET, Key: originalKey }).promise()
    // perform the resize operation
    .then(data => {
      console.timeEnd('Acquiring');
      console.time('Resampling');
      return Sharp(data.Body)
        .resize({
          width,
          height,
          withoutEnlargement: true,
          fit: boundingBox ? 'inside' : 'cover',
        })
        .toFormat(format)
        .toBuffer();
    })
    .then(buffer => {
      console.timeEnd('Resampling');
      console.time('Putting object');
      // save the resized object to S3 bucket with appropriate object key.
      // generate a binary response with resized image
      const response = makeResponse(200, buffer.toString('base64'), `image/${format}`, {
        isBase64Encoded: true,
        cacheControl: 'public, max-age=31536000',
      });
      callback(null, response);

      S3.putObject({
          Body: buffer,
          Bucket: BUCKET,
          ContentType: 'image/' + format,
          CacheControl: 'max-age=31536000',
          Key: destKey,
          StorageClass: 'STANDARD'
      }).promise()
        .then(() => console.timeEnd('Putting object'))
        // even if there is exception in saving the object we send back the generated
        // image back to viewer below
        .catch(() => console.log("Exception while writing resized image to bucket"));
    })
    .catch( err => {
      const response = makeResponse(404, `could not find: ${event.path}`, 'text/plain');
      callback(null, response);
    });
};
