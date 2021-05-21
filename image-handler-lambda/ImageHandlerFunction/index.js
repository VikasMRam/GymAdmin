/** *******************************************************************************************************************
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 ******************************************************************************************************************** */

const ImageRequest = require('./image-request.js');
const ImageHandler = require('./image-handler.js');

exports.handler = async (event) => {
  const imageRequest = new ImageRequest();
  const imageHandler = new ImageHandler();

  try {
    const request = await imageRequest.setup(event);
    const processedRequest = await imageHandler.process(request);
    const cacheControl = 'public, max-age=31536000';
    await imageRequest.uploadEditedImage(processedRequest, {
      CacheControl: cacheControl,
      ContentType: request.contentType,
    });

    return response = {
      statusCode: 200,
      headers: getResponseHeaders(request.contentType, cacheControl),
      body: processedRequest.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error(err);
    const response = {
      statusCode: err.status,
      headers: getResponseHeaders('application/json'),
      body: JSON.stringify(err),
      isBase64Encoded: false,
    };
    return response;
  }
};

/**
 * Generates the appropriate set of response headers based on a success
 * or error condition.
 * @param {boolean} isErr - has an error been thrown?
 */
const getResponseHeaders = (contentType, cacheControl) => {
  const corsEnabled = (process.env.CORS_ENABLED === 'Yes');
  const headers = {
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cache-Control',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': contentType,
  };
  if (corsEnabled) {
    headers['Access-Control-Allow-Origin'] = process.env.CORS_ORIGIN;
  }
  if (cacheControl) {
    headers['Cache-Control'] = cacheControl;
  }
  return headers;
};
