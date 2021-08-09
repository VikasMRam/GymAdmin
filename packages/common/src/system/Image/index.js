import React from 'react';
import { string, array, oneOfType, oneOf, any, func, number, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Helmet from 'react-helmet';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { getSrcset } from 'sly/web/services/images';
import Block from 'sly/common/system/Block';

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
  if (!src) {
    return 'Seniorly Image';
  }
  const srcParts = src.split('/')[1].split('.')[0];
  return decodeURIComponent(srcParts);
};

const sizeNames = ['mobile', 'tablet', 'laptop', 'desktop'];
const makeSizes = (sizes) => {
  if (!Array.isArray(sizes)) {
    return sizes;
  }

  return sizes.reduce((acc, size, i) => {
    if (!size) {
      return acc;
    }

    const sizepx = typeof size === 'number'
      ? `${size}px`
      : size;
    if (i === 0) {
      acc.push(sizepx);
    } else {
      acc.splice(acc.length - 1, 0, `(min-width: ${getKey(`breakpoint.${sizeNames[i]}`)}) ${sizepx}`);
    }

    return acc;
  }, []).join(', ');
};

export default class Image extends React.Component {
  static propTypes = {
    className: string,
    loading: oneOf(['lazy', 'auto', 'eager']),
    shouldPreload: bool,
    // provided to signify the s3 path in our bucket without /uploads, optional but src has to be provided
    path: string,
    // provided to signify absolute route to asset or relative to env domain, optional but path has to be provided
    src: string,
    placeholder: string,
    // use height to force a height for all sources like in a hero banner
    height: number,
    alt: string,
    sizes: oneOfType([array, string]),
    sources: array,
    children: any,
    onLoadFailed: func,
    aspectRatio: oneOf(['16:9', 'golden', '3:2', '4:3', '7:6', '1:1']),
    crop: bool,
  };

  static defaultProps = {
    className: '',
    loading: 'lazy',
    sizes: '(max-width: 1079px) 100vw, 680px',
    onLoadFailed: () => {},
    crop: true,
  };

  state = {
    failed: false,
  };

  failedLoadImageHandler = () => {
    if (this.props.src) {
      const { onLoadFailed } = this.props;
      this.setState({
        failed: true,
      }, onLoadFailed);
    }
  };

  render() {
    const {
      src, path, placeholder, sizes, sources, height, alt, loading, className: classNameProp, aspectRatio, children, shouldPreload, onLoadFailed, crop, ...props
    } = this.props;

    // at least ONE of path (bucket s3 path without /uploads) or src (absolute; e.g. static in public) should be provided
    const isS3Path = !!path;

    const srcProp = loading === 'lazy' ? 'data-src' : 'src';
    const className = loading === 'lazy' ? 'lazyload' : '';

    const actualPlaceholder = placeholder || assetPath('images/img-placeholder.png');
    const imgSrc = src && this.state.failed
      ? actualPlaceholder
      : src || actualPlaceholder;

    const imageProps = {
      src: imgSrc,
    };

    if (!this.state.failed) {
      imageProps[srcProp] = imgSrc;
    }

    let preload = null;
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
      const { srcSet, src } = getSrcset(encodeURI(path), {
        aspectRatio: aspectRatioValue,
        sources: sourcesAry,
        crop,
      });

      // override imageProps src, as it's undefined
      imageProps[srcProp] = src;

      const srcSetProp = loading === 'lazy' ? 'data-srcset' : 'srcSet';
      imageProps[srcSetProp] = srcSet;

      if (shouldPreload) {
        preload = (
          <Helmet>
            <link rel="preload" as="image" imageSrcSet={srcSet} imageSizes={makeSizes(sizes)} />
          </Helmet>
        );
      }
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
        <img
          key={`${src}_${path}`}
          // loading={loading}
          alt={alt || getAlt(path)}
          className={imgClassName}
          onError={this.failedLoadImageHandler}
          data-sizes="auto"
          {...imageProps}
        />
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
        {preload}
        {picture}
        {children}
      </ResponsiveWrapper>
    );
  }
}
