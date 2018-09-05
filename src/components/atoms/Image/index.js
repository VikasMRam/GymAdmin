import React from 'react';
import { string, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { assetPath } from 'sly/components/themes';

const StyledImage = styled.img`
  user-select: none;
  border: none;
`;

const paddingTop = ({ aspectRatio }) => size('picture.proportions', aspectRatio);

const ResponsiveWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: ${paddingTop};

  > img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// TODO: a note for the future if we do the resampling of the images with lambda,
// <Image /> should accept formatting props so we can manipulate the url to get the right size.
export default class Image extends React.Component {
  static propTypes = {
    src: string.isRequired,
    alt: string,
    aspectRatio: oneOf(['4:3', '16:9']),
  };

  static generateAlt(src) {
    if (typeof src === 'undefined') {
      return 'Seniorly Image';
    }
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
    if (this.props.src) {
      this.setState({
        failed: true,
      });
    }
  };

  renderImage = (props) => <StyledImage {...props} />;

  render() {
    const { src, alt, aspectRatio, children, ...props } = this.props;
    const { failed } = this.state;

    const srcProps = failed
      ? { src: assetPath('images/img-placeholder.png') }
      : { src, onError: this.failedLoadImageHandler };

    const imageProps = {
      ...srcProps,
      alt: alt || this.constructor.generateAlt(src),
    };

    if (aspectRatio) {
      return (
        <ResponsiveWrapper aspectRatio={aspectRatio} {...props}>
          {this.renderImage(imageProps)}
          {children}
        </ResponsiveWrapper>
      );
    } else {
      return this.renderImage({ ...imageProps, ...props });
    }
  }
}

