import React from 'react';
import { string, bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { Lazy } from 'react-lazy';

import { size } from 'sly/components/themes';
import { getSrcset } from 'sly/services/images';

const CUSHION = 500;

const StyledImage = styled(({ alt, ...props }) => <img alt={alt} {...props} />)`
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
  static typeHydrationId = 'Image';
  static propTypes = {
    loading: oneOf(['lazy', 'auto', 'eager']),
    path: string.isRequired,
    alt: string,
    sizes: string,
  };

  static defaultProps = {
    loading: 'lazy',
  };

  render() {
    const {
      path, sizes, alt, loading, ...props
    } = this.props;

    const imageProps = {
      alt: alt || getAlt(path),
      srcSet: getSrcset(path),
      loading,
      sizes,
    };

    return (
      <StyledImage
        {...imageProps}
        {...props}
      />
    );
  }
}
