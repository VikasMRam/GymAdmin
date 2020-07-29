import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import S3Upload from 'react-s3-uploader/s3upload';
import objectAssign from 'object-assign';
import { apiUrl } from 'sly/web/config'
import FileField from 'sly/web/components/molecules/FileField';

/* eslint-disable */

const getSignedUrl = (file, callback) => {
  return fetch(`${apiUrl}/v0/platform/uploads/s3-signed-url?file=${encodeURIComponent(file.name)}`)
    .then(result => result.json())
    .then(callback);
};

// http://stackoverflow.com/a/24608023/194065
function clearInputFile(f) {
  if (f.value) {
    try {
      f.value = ''; // for IE11, latest Chrome/Firefox/Opera...
    } catch (err) { }
    if (f.value) { // for IE5 ~ IE10
      const form = document.createElement('form');
      const { parentNode } = f; const
        ref = f.nextSibling;
      form.appendChild(f);
      form.reset();
      parentNode.insertBefore(f, ref);
    }
  }
}

export default class S3Uploader extends React.Component {
  static propTypes = {
    signingUrl: PropTypes.string,
    preprocess: PropTypes.func,
    onSignedUrl: PropTypes.func,
    onProgress: PropTypes.func,
    onFinish: PropTypes.func,
    onError: PropTypes.func,
    signingUrlMethod: PropTypes.string,
    signingUrlHeaders: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    signingUrlQueryParams: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),
    signingUrlWithCredentials: PropTypes.bool,
    uploadRequestHeaders: PropTypes.object,
    contentDisposition: PropTypes.string,
    server: PropTypes.string,
    scrubFilename: PropTypes.func,
    s3path: PropTypes.string,
    inputRef: PropTypes.func,
    autoUpload: PropTypes.bool,
  };

  static defaultProps = {
    preprocess(file, next) {
      next(file);
    },
    onSignedUrl(signingServerResponse) {
      console.log('Signing server response: ', signingServerResponse);
    },
    onProgress(percent, message, file) {
      console.log(`Upload progress: ${percent}% ${message}`);
    },
    onFinish(signResult) {
      console.log(`Upload finished: ${signResult.publicUrl}`);
    },
    onError(message) {
      console.log(`Upload error: ${message}`);
    },
    server: '',
    signingUrlMethod: 'GET',
    scrubFilename(filename) {
      return filename.replace(/[^\w\d_\-\.]+/ig, '');
    },
    s3path: '',
    autoUpload: true,
  };

  ref = this.props.inputRef || React.createRef();

  state = {
    fileName: null,
    percent: 0,
  };

  preprocess = (file, next) => {
    const { preprocess } = this.props;
    this.setState({
      fileName: file.name,
    }, () => preprocess(file, next))
  };

  progress = (percent, message, file) => {
    const { onProgress } = this.props;
    this.setState({
      percent,
    }, () => onProgress(percent, message, file));
  };

  uploadFile = () => {
    this.myUploader = new S3Upload({
      fileElement: this.ref.current,
      signingUrl: this.props.signingUrl,
      getSignedUrl,
      preprocess: this.preprocess,
      onSignedUrl: this.props.onSignedUrl,
      onProgress: this.progress,
      onFinishS3Put: this.props.onFinish,
      onError: this.props.onError,
      signingUrlMethod: this.props.signingUrlMethod,
      signingUrlHeaders: this.props.signingUrlHeaders,
      signingUrlQueryParams: this.props.signingUrlQueryParams,
      signingUrlWithCredentials: this.props.signingUrlWithCredentials,
      uploadRequestHeaders: this.props.uploadRequestHeaders,
      contentDisposition: this.props.contentDisposition,
      server: this.props.server,
      scrubFilename: this.props.scrubFilename,
      s3path: this.props.s3path,
    });
  };

  abort = () => {
    this.myUploader && this.myUploader.abortUpload();
  };

  clear = () => {
    clearInputFile(ReactDOM.findDOMNode(this));
  };

  getInputProps = () => {
    // declare ref beforehand and filter out
    // `inputRef` by `S3Uploader.propTypes`
    const additional = {
      type: 'file',
      ref: this.ref,
    };

    if (this.props.autoUpload) {
      additional.onChange = this.uploadFile;
    }

    const temporaryProps = objectAssign({}, this.props, additional);
    const inputProps = {};

    const invalidProps = Object.keys(S3Uploader.propTypes);

    Object.keys(temporaryProps).forEach((key) => {
      if (invalidProps.indexOf(key) === -1) {
        inputProps[key] = temporaryProps[key];
      }
    });

    return inputProps;
  };

  render = () => {
    const { trigger, percent } = this.state;
    return (
      <FileField
        trigger={trigger}
        percent={percent}
        {...this.getInputProps()}
      />
    );
  };
}

