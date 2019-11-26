import React from 'react';
import { string, bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';

import { size } from 'sly/components/themes';
import { getSrcset } from 'sly/services/images';

const StyledImage = styled(({ alt, ...props }) => (
  <img alt={alt} {...props} />
))`
  user-select: none;
  border: none;
  object-fit: cover;
`;

const paddingTop = ({ aspectRatio }) => size('picture.ratios', aspectRatio);

const getAlt = (src) => {
  if (typeof src === 'undefined') {
    return 'Seniorly Image';
  }
  const srcParts = src.split('/');
  return decodeURIComponent(srcParts.pop());
};

// TODO: a note for the future if we do the resampling of the images with lambda,
// <Image /> should accept formatting props so we can manipulate the url to get the right size.
export default class ResponsiveImage extends React.Component {
  static propTypes = {
    className: string,
    loading: oneOf(['lazy', 'auto', 'eager']),
    path: string.isRequired,
    alt: string,
    sizes: string,
    aspectRatio: oneOf(['16:9', 'golden', '3:2', '4:3', '1:1']),
  };

  static defaultProps = {
    className: '',
    loading: 'lazy',
    aspectRatio: '3:2',
  };

  render() {
    const {
      path, sizes, alt, loading, className: classNameProp, ...props
    } = this.props;

    const { srcset, webpSrcset, src } = getSrcset(path);

    const srcProp = loading === 'lazy' ? 'data-src' : 'src';
    const srcSetProp = loading === 'lazy' ? 'data-srcset' : 'srcset';
    const className = loading === 'lazy' ? `lazy ${classNameProp}` : classNameProp;

    const imageProps = {
      alt: alt || getAlt(path),
      className,
      [srcProp]: src,
      sizes,
    };

    const jpegSourceProps = {
      [srcSetProp]: srcset,
    };

    const webpSourceProps = {
      [srcSetProp]: webpSrcset,
    };

    return (
      <picture>
        <source type="image/webp" {...webpSourceProps} />
        <source type="image/jpeg" {...jpegSourceProps} />
        <StyledImage
          {...imageProps}
          {...props}
        />
      </picture>
    );
  }
}
