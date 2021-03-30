const JPG = 'jpg';
const JJPG = 'JPG';
const JPEG = 'jpeg';
const WEBP = 'webp';
const PNG = 'png';
const GIF = 'gif';
const SVG = 'svg';

const extPriority = [JPG, JJPG, JPEG, WEBP, PNG, GIF, SVG];

const getContentType = (ext) => {
  switch (ext) {
    case JPG: return 'image/jpeg';
    case JJPG: return 'image/jpeg';
    case JPEG: return 'image/jpeg';
    case PNG: return 'image/png';
    case GIF: return 'image/gif';
    case WEBP: return 'image/webp';
    default: return 'image';
  }
};

class ImageRequest {
  /**
     * Initializer function for creating a new image request, used by the image
     * handler to perform image modifications.
     * @param {Object} event - Lambda request body.
     */
  async setup(event) {
    try {
      this.bucket = event.stageVariables.bucket;
      this.regional = event.stageVariables.regional;
      this.requestType = this.parseRequestType(event);
      this.outputFormat = this.requestType.ext;
      this.contentType = getContentType(this.outputFormat);
      this.originalKey = '';
      this.destKey = this.parseDestImageKey(this.requestType);
      this.edits = this.parseImageEdits(this.requestType);
      this.originalImage = await this.getOriginalImage();
      return Promise.resolve(this);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
     * Parses the name of the appropriate Amazon S3 key corresponding to the
     * original image.
     * @param {String} requestType - Type, either "Default"
     */
  parseOriginalImageKey(request, override = {}) {
    const {
      folder,
      name,
      ext,
    } = { ...request, ...override };

    return `uploads/${folder}/${name}.${ext}`;
  }

  /**
     * Parses the name of the appropriate Amazon S3 key corresponding to the
     * original image.
     * @param {String} requestType - Type, either "Default"
     */
  parseDestImageKey(request, override = {}) {
    const {
      edits,
      folder,
      name,
      ext,
    } = { ...request, ...override };

    return `images/${edits}/${folder}/${name}.${ext}`;
  }

  /**
     * Gets the original image from an Amazon S3 bucket.
     * @param {String} bucket - The name of the bucket containing the image.
     * @param {String} key - The key name corresponding to the image.
     * @return {Promise} - The original image or an error.
     */
  async getOriginalImage() {
    console.time('acquiring');
    const S3 = require('aws-sdk/clients/s3');
    const s3 = new S3({
      region: this.regional,
    });
    for (let i = 0; i < extPriority.length; i++) {
      const ext = extPriority[i];
      const key = this.parseOriginalImageKey(this.requestType, { ext });
      console.log('try key', key);
      const imageLocation = { Bucket: this.bucket, Key: key };
      const request = s3.getObject(imageLocation).promise();
      try {
        const originalImage = await request;
        this.originalKey = key;
        return Promise.resolve(originalImage.Body);
      } catch (err) {
        if (i >= (extPriority.length - 1)) {
          return Promise.reject({
            status: 500,
            code: err.code,
            message: err.message,
          });
        }
      } finally {
        console.timeEnd('acquiring');
      }
    }
  }

  async uploadEditedImage(buffer, extraParams={}) {
    console.time('putting object');
    const key = this.parseDestImageKey(this.requestType);

    const S3 = require('aws-sdk/clients/s3');
    const s3 = new S3({
      region: this.regional,
    });

    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ...extraParams,
    };

    const request = s3.putObject(params).promise();

    try {
      return await request;
    } catch (err) {
      return Promise.reject({
        status: 500,
        code: err.code,
        message: err.message,
      });
    } finally {
      console.timeEnd('putting object');
      const { Body, ...extra } = params;
      console.log('with params:', JSON.stringify(extra, null, 2));
    }
  }

  /**
     * Parses the edits to be made to the original image.
     * @param {String} event - Lambda request body.
     * @param {String} requestType - Image handler request type.
     */
  parseImageEdits(requestType) {
    const edits = {};

    const fit = requestType.atLeast
      ? 'outside'
      : 'cover';

    edits.resize = {
      withoutEnlargement: true,
      fit,
    };

    if (requestType.width) {
      edits.resize.width = requestType.width;
    }

    if (requestType.height) {
      edits.resize.height = requestType.height;
    }

    return edits;
  }

  /**
     * Determines how to handle the request being made based on the URL path
     * prefix to the image request. Categorizes a request as either "image"
     * (uses the Sharp library)
     * @param {Object} event - Lambda request body.
    */
  parseRequestType(event) {
    const { path } = event;
    // ----
    const matchDefault = /\/(?<type>[\w\/]+)\/(?<edits>(?<atLeast>a){0,1}(?<width>[\d]{0,4})x(?<height>[\d]{0,4}))\/(?<folder>[\S]+)\/(?<name>\S+)\.(?<ext>\w+)$/;
    const result = matchDefault.exec(path);
    if (result) {  // use sharp
      const {
        type,
        edits,
        atLeast,
        width,
        height,
        folder,
        name,
        ext,
      } = result.groups;

      return {
        type,
        edits,
        atLeast: !!atLeast,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
        folder,
        name: decodeURIComponent(name),
        ext,
      };
    }
    throw {
      status: 400,
      code: 'RequestTypeError',
      message: 'The type of request you are making could not be processed. Please ensure that your original image is of a supported file type (jpg, png, tiff, webp) and that your image request is provided in the correct syntax. Refer to the documentation for additional guidance on forming image requests.',
    };
  }
}

// Exports
module.exports = ImageRequest;
