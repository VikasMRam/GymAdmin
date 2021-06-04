import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import S3Upload from 'react-s3-uploader/s3upload';
import objectAssign from 'object-assign';
import { apiUrl } from 'sly/web/config';
import FileField from 'sly/web/components/molecules/FileField';

/* eslint-disable */

const getSignedUrl = (file, callback) => {
  return fetch(`${apiUrl}/platform/uploads/s3-signed-url?file=${encodeURIComponent(file.name)}`, {
    credentials: 'include',
  })
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
    onFinish: PropTypes.func,
    onError: PropTypes.func,
  };

  static defaultProps = {
    autoUpload: true,
  };

  ref = this.props.inputRef || React.createRef();

  state = {
    percent: 0,
  };

  progress = (percent, i) => {
    this.myProgress[i] = percent;
    this.setState({
      percent: this.myProgress.reduce((acc, progress) => acc + (progress / this.myProgress.length)),
    });
  };

  uploadFile = (e) => {
    const files = Array.from(e.target.files);

    this.myUploader = [];
    this.myProgress = Array(files.length).fill(0);

    const promises = files.map((file, i) => new Promise((resolve, reject) => {
      this.myUploader[i] = new S3Upload({
        files: [file],
        getSignedUrl,
        onProgress: (percent) => this.progress(percent, i),
        onFinishS3Put: (result) => resolve({ path: result.path, name: file.name }),
        onError: reject,
        uploadRequestHeaders: {},
      });
      this.myUploader[i].progress = 0;
    }));

    Promise.all(promises)
      .then(this.props.onFinish)
      .catch(this.props.onError);
  };

  abort = () => {
    this.myUploader && this.myUploader.forEach(up => up.abortUpload());
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
    const { percent } = this.state;
    return (
      <FileField
        percent={percent}
        {...this.getInputProps()}
      />
    );
  };
}

