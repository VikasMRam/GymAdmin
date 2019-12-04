import React from 'react';
import { string, oneOf, node, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { Lazy } from 'react-lazy';

import { size, assetPath } from 'sly/components/themes';

const CUSHION = '500px';

const StyledImage = styled.img`
  user-select: none;
  border: none;
`;

const StyledLazy = styled(Lazy)`
  display: inline;
  width: 100%;
  height: 100%;
`;

const paddingTop = ({ aspectRatio }) => size('picture.ratios', aspectRatio);

const responsiveImageStyles = css`
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

const ResponsiveLazyWrapper = styled(({ aspectRatio, ...props }) => <Lazy cushion={CUSHION} {...props} />)`
  ${responsiveImageStyles};
`;

const ResponsiveActiveWrapper = styled.div`
  ${responsiveImageStyles};
`;

const ltIE9 = true;

// TODO: a note for the future if we do the resampling of the images with lambda,
// <Image /> should accept formatting props so we can manipulate the url to get the right size.
export default class Image extends React.Component {
  static typeHydrationId = 'Image';
  static propTypes = {
    lazy: bool.isRequired,
    src: string.isRequired,
    alt: string,
    aspectRatio: oneOf(['16:9', 'golden', '3:2', '4:3', '1:1']),
    children: node,
  };

  static defaultProps = {
    lazy: true,
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

  render() {
    const {
      src, alt, aspectRatio, children, lazy, ...props
    } = this.props;

    const { failed } = this.state;

    const srcProps = failed
      ? { src: assetPath('images/img-placeholder.png') }
      : { src, onError: this.failedLoadImageHandler };

    const imageProps = {
      ...srcProps,
      alt: alt || this.constructor.generateAlt(src),
    };

    if (aspectRatio) {
      const ResponsiveComponent = lazy
        ? ResponsiveLazyWrapper
        : ResponsiveActiveWrapper;

      const responsiveProps = lazy
        ? { ltIE9, ...props }
        : props;

      return (
        <ResponsiveComponent aspectRatio={aspectRatio} {...responsiveProps}>
          <StyledImage {...imageProps} />
          {children}
        </ResponsiveComponent>
      );
    }

    const image = <StyledImage {...imageProps} {...props} />;
    return lazy
      ? <StyledLazy cushion={CUSHION} ltIE9>{image}</StyledLazy>
      : image;
  }
}
