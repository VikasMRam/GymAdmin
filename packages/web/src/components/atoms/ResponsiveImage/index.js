import React from 'react';
import { string, array, oneOf, any, func, number } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { getSrcset } from 'sly/web/services/images';
import { Block } from 'sly/common/components/atoms';

const paddingTop = ({ aspectRatio }) => size('picture.ratios', aspectRatio);

const ResponsiveWrapper = styled(Block)`
  display: inline-block;

  ${ifProp('aspectRatio', css`
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: ${paddingTop};

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `)}

  img {
    user-select: none;
    border: none;
    object-fit: cover;
  }

  * {
    border-radius: inherit;
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
    path: string,
    // provided to signify absolute route to asset or relative to env domain, optional but path has to be provided
    src: string,
    placeholder: string,
    // use height to force a height for all sources like in a hero banner
    height: number,
    alt: string,
    sizes: string,
    sources: array,
    children: any,
    onLoadFailed: func,
    aspectRatio: oneOf(['16:9', 'golden', '3:2', '4:3', '1:1']),
  };

  static defaultProps = {
    className: '',
    loading: 'eager',
    onLoadFailed: () => {},
  };

  state = {
    failed: false,
  };

  failedLoadImageHandler = () => {
    const { onLoadFailed } = this.props;
    this.setState({
      failed: true,
    }, onLoadFailed);
  };

  render() {
    const {
      src, path, placeholder, sizes, sources, height, alt, loading, className: classNameProp, aspectRatio, children, onLoadFailed, ...props
    } = this.props;

    // at least ONE of path (bucket s3 path without /uploads) or src (absolute; e.g. static in public) should be provided
    const isS3Path = !!path;

    const srcProp = loading === 'lazy' ? 'data-src' : 'src';
    const className = loading === 'lazy' ? 'lazy' : '';

    const actualPlaceholder = placeholder || assetPath('images/img-placeholder.png');
    const imgSrc = this.state.failed
      ? actualPlaceholder
      : src || actualPlaceholder;

    const imageProps = {
      src: imgSrc,
    };

    if (!this.state.failed) {
      imageProps[srcProp] = imgSrc;
    }

    let sourceSets = null;
    if (!this.state.failed && isS3Path) {
      let sourcesAry;
      if (!sources) {
        sourcesAry = getKey('defaultImageSources');
      } else {
        sourcesAry = sources;
      }
      if (height) {
        sourcesAry = sourcesAry.map((source) => {
          if (Array.isArray(source)) {
            source[1] = height;
          } else {
            source = [source, height];
          }
          return source;
        });
      }

      // aspect ratio is a number in getSrcset
      const aspectRatioString = getKey(`sizes.picture.ratios.${aspectRatio}`);
      const aspectRatioValue = (parseFloat(aspectRatioString) / 100).toFixed(4);
      const { jpegSrcset, webpSrcset, src } = getSrcset(encodeURI(path), {
        aspectRatio: aspectRatioValue,
        sources: sourcesAry,
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

    const imgClassName = !aspectRatio
      ? `${className} ${classNameProp}`
      : className;

    const picture = this.state.failed
      ? (
        <img
          alt={alt || getAlt(imageProps.src)}
          className={classNameProp}
          {...imageProps}
        />
      ) : (
        <picture>
          {sourceSets}
          <img
            loading={loading}
            alt={alt || getAlt(path)}
            className={imgClassName}
            onError={this.failedLoadImageHandler}
            {...imageProps}
          />
        </picture>
      );

    if (!aspectRatio) {
      return picture;
    }

    return (
      <ResponsiveWrapper
        aspectRatio={aspectRatio}
        className={classNameProp}
        {...props}
      >
        {picture}
        {children}
      </ResponsiveWrapper>
    );
  }
}
