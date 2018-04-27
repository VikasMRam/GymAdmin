import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { assetPath } from 'sly/components/themes';

const StyledImage = styled.img`
  user-select: none;
`;

// TODO: a note for the future if we do the resampling of the images with lambda,
// <Image /> should accept formatting props so we can manipulate the url to get the right size.
export default class Image extends React.Component {
  static propTypes = {
    src: string.isRequired,
    alt: string,
  };

  static generateAlt(src) {
    const srcParts = src.split('/');
    return decodeURIComponent(srcParts.pop());
  }

  state = {
    failed: false,
  };

  componentWillReceiveProps(nextProps) {
    // what if src of a failed image is changed(a failed image has placeholder as src),
    // state change here won't trigger render
    if (nextProps.src !== this.props.src && this.state.failed) {
      this.setState({
        failed: false,
      });
    }
  }

  failedLoadImageHandler = () => {
    if (this.props.src.length) {
      this.setState({
        failed: true,
      });
    }
  };

  render() {
    const { src } = this.props;
    const alt = this.props.alt || this.constructor.generateAlt(src);
    const defaultImage = <StyledImage {...this.props} src={assetPath('placeholder.png')} alt={alt} />;

    if (this.state.failed) return defaultImage;
    return <StyledImage src={src} {...this.props} alt={alt} onError={this.failedLoadImageHandler} />;
  }
}

