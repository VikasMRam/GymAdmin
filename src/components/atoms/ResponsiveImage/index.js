import React from 'react';
import { string, array, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size, getKey } from 'sly/components/themes';
import { getSrcset } from 'sly/services/images';

const paddingTop = ({ aspectRatio }) => size('picture.ratios', aspectRatio);

const ResponsiveWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: ${paddingTop};

  img {
    user-select: none;
    border: none;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

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
    // provided to signify the s3 path in our bucket without /uploads, optional but src has to be provided
    path: string.isRequired,
    // provided to signify absolute route to asset or relative to env domain, optional but path has to be provided
    src: string,
    alt: string,
    sizes: string,
    sources: array,
    aspectRatio: oneOf(['16:9', 'golden', '3:2', '4:3', '1:1']),
  };

  static defaultProps = {
    className: '',
    loading: 'lazy',
    aspectRatio: '3:2',
  };

  render() {
    const {
      src, path, sizes, sources, alt, loading, className: classNameProp, aspectRatio, ...props
    } = this.props;

    // at least ONE of path (bucket s3 path without /uploads) or src (absolute; e.g. static in public) should be provided
    const isS3Path = !!path;

    const srcProp = loading === 'lazy' ? 'data-src' : 'src';
    const className = loading === 'lazy' ? 'lazy' : '';

    const imageProps = {
      [srcProp]: src,
    };

    let sourceSets = null;
    if (isS3Path) {
      // aspect ratio is a number in getSrcset
      const aspectRatioString = getKey(`sizes.picture.ratios.${aspectRatio}`);
      const aspectRatioValue = (parseFloat(aspectRatioString) / 100).toFixed(4);
      const { jpegSrcset, webpSrcset, src } = getSrcset(path, {
        aspectRatio: aspectRatioValue,
        sources: sources || getKey('defaultImageSources'),
      });

      // override imageProps src, as it's undefined
      imageProps[srcProp] = src;

      const srcSetProp = loading === 'lazy' ? 'data-srcset' : 'srcSet';

      const jpegSourceProps = {
        [srcSetProp]: jpegSrcset,
      };

      const webpSourceProps = {
        [srcSetProp]: webpSrcset,
      };

      sourceSets = (
        <>
          <source type="image/webp" {...webpSourceProps} sizes={sizes} />
          <source type="image/jpeg" {...jpegSourceProps} sizes={sizes} />
        </>
      );
    }

    return (
      <ResponsiveWrapper aspectRatio={aspectRatio} className={classNameProp}>
        <picture>
          {sourceSets}
          <img
            alt={alt || getAlt(path)}
            className={className}
            {...imageProps}
            {...props}
          />
        </picture>
      </ResponsiveWrapper>
    );
  }
}
