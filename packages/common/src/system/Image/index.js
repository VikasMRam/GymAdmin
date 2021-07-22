import React from 'react';
import { string, array, oneOfType, oneOf, any, func, number, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import Helmet from 'react-helmet';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { getSrcset, getImagePath } from 'sly/web/services/images';
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
  const srcParts = src.split('/');
  return decodeURIComponent(srcParts.pop());
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

    const srcProp = 'data-src';
    const className = 'lazyload';

    // const actualPlaceholder = placeholder || assetPath('images/img-placeholder.png');
    const actualPlaceholder = 'data:image/gif;base64,R0lGODlhAAXAA8ZVAPHv8Ono6MjIyNPT09rZ2dLR0uLg4d/e3uzq68rKytDQ0NPS0tXU1NfX19bV1dTT1M3NzdHR0dzb2+bk5e3r7PDu7+no6eHg4NbV1szMzODf4O7s7efm5tjX2NbW1urp6d/e383MzdXU1evp6uDe38vKy+Xk5e3s7dfW1u/t7uTj48nJycvLy+nn6N7d3dTT0+Xj5OHf4M7NzdDP0OPi4tLS0uPh4tva2+jm58/Pz9TU1NjY2NjX1+7t7ebl5dnY2OLh4uTj5NXV1dHQ0d7c3d/d3szLy9va2tnY2dzb3Ozr7N3c3Oro6drZ2uXk5Ofl5uTi4+jn5+bl5s7OztDPzwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAAAXAAwAH/oAAgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bOHPq3Mmzp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKnUq1qtWrWLNq3cq1q9evYMOKHUu2rNmzaNOqXcu2rdu3/nDjyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDix9Pvrz58+jTq1/Pvr379/Djy59Pv779+/jz69/Pv7///wAGKOCABBZo4IEIJqjgggw26OCDEEYo4YQUVmjhhRhmqOGGHHbo4YcghijiiCSWaOKJKKao4oostujiizDGKOOMNNZo44045qjjjjz26OOPQAYp5JBEFmnkkUgm/qnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQU/lds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fTTUEct9dRUV2311VhnrfXWXHft9ddghy322GSXbfbZaKet9tpst+3223DHLffcdNdt991456333nz37fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556CHLvropJdu+umop6766qy37vrrsMcu++y012777bjnrvvuvPfu++/ABy/88MQXb/zxyCev/PLMN+/889BHL/301Fdv/fXYZ6/99tx37/33/uCHL/745Jdv/vnop6/++uy37/778Mcv//z012///fjnr//+/Pfv//8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygBCdIwQpa8IIYzKAGN8jBDnrwgyAMoQhHSMISmvCEKEyhClfIwha68IUwjKEMZ0jDGtrwhjjMoQ53yMMe+vCHQAyiEIdIxCIa8YhITKISl8jEJjrxiVCMohSnSMUqWvGKWMyiFrfIxS568YtgDKMYx0jGMprxjGhMoxrXyMY2uvGNcIyjHOdIxzra8Y54zKMe98jH3+GgESnoY1woQIkNCHIwTDikYAipyEY6MmuBfKQkJ0nJSloSKy24pCY9/mXITf6EkZ40TSRDScoxgbKUqPTSH1M5k06y8pWTciUsZ3mhJ9DylrjMpS53mRJZ8vIrq/wlWHwpzGIa85i/SyQyuTKCZWJGmc6MpjSnacJmUrMbwbzmYmwJDGtqUxvQ/OZhsvkLb4rzGuY8J3LSqc6CkLOdk2EnPKPxznkm5ZTzkKc9n4HPfSKlnu/Qpz8H2huBIsOgBF0GQBMqlH6yA6EMXUY4I4qVhUoDohRtBjcTMdGMggajHg2pfkAq0pLWh6QmTSl8UKrSlq6HpS6NqXlgKtOahoemNs0pd3Cq055eh6c+Dap0gCrUojaHmEZNqlIPZdGlOvWpemoqVKdK/lU4SbWqWM2qma6q1a56lUtc/apYxyqlsJL1rGi9kFlBsda0VqOtbiUIXOMqkLmawq50JQZe89qPvfJ1H35lRWD/OovBEtYehj0sPRIrC8YqVhSOfew7IivZdlAWF5etbCQyq1l0cLaz5visL0QLWtKCVhymPS04UqtX1WaCta7lBmxjG5XZ0va2uD2PbXPL2952Z7e+Da5wpwPc4Rr3uMkpLnKXy9zfKLe50I1ubZ4r3epa97rYza52t8vd7nr3u+ANr3jHS97ymve86E2vevOK1PW6973wja9850vf+tr3vvjNr373y9/++ve/AA6wgAdM4AIb+MAITrCCF8zg/gY7+MEQjrCEJ0zhClv4whjOsIY3zOEOe/jDIA6xiEdM4hKb+MQoTrGKV8ziFrv4xTCOsYxnTOMa2/jGOM6xjnfM4x77+MdADrKQh0zkIhv5yEhOspKXzOQmO/nJUI6ylKdM5Spb+cpYzrKWt8zlLnv5y2AOs5jHTOYym/nMaE6zmtfM5ja7+c1wjrOc50znOtv5znjOs573zOc++/nPgA60oAdN6EIb+tCITrSiF83oRjv60ZCOtKQnTelKW/rSmM60pjfN6U57+tOgDrWoR03qUpv61KhOtapXzepWu/rVsI61rGdN61rb+ta4zrWud83rXvv618AOtrCHTexizhv72MhOtrKXzexmO/vZ0I62tKdN7Wpb+9rYzra2t83tbnv72+AOt7jHTe5ym/vc6E63utfN7na7+93wjre8503vetv73vjOt773ze9++/vfAA+4wAdO8IIb/OAIT7jCF87whjv84RCPuMQnTvGKW/ziGM+4xjfO8Y57/OMgD7nIR07ykpv85ChPucpXzvKWu/zlMI+5zGdO85rb/OY4z7nOd87znvv850APutCHTvSiG/3oSE+60pfO9KY7/elQj7rUp071qlv96lhHWSAAADs=';
    const imgSrc = this.state.failed
      ? actualPlaceholder
      : src || actualPlaceholder;

    const imageProps = {
      src: imgSrc,
    };

    if (!this.state.failed) {
      imageProps[srcProp] = imgSrc;
    }

    let preload = null;
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
        ...(!crop && { crop }),
      });

      // override imageProps src, as it's undefined
      imageProps[srcProp] = src;

      const srcSetProp = loading === 'lazy' ? 'data-srcset' : 'srcSet';

      const jpegSourceProps = {
        'data-srcset': jpegSrcset,
      };

      const webpSourceProps = {
        'data-srcset': webpSrcset,
      };

      if (shouldPreload) {
        preload = (
          <Helmet>
            <link rel="preload" as="image" imageSrcSet={webpSrcset} imageSizes={makeSizes(sizes)} />
          </Helmet>
        );
      }

      // for Low Quality Image Placeholder
      // sourceSets = (
      //   <>
      //     <source type="image/webp" srcSet={getImagePath(encodeURI(path), { width: 80 })} {...webpSourceProps} data-sizes="auto" />
      //     <source type="image/jpeg" srcSet={getImagePath(encodeURI(path), { width: 80 })} {...jpegSourceProps} data-sizes="auto" />
      //   </>
      // );

      sourceSets = (
        <>
          <source type="image/webp" {...webpSourceProps} data-sizes="auto" />
          <source type="image/jpeg" {...jpegSourceProps} data-sizes="auto" />
        </>
      );
    }

    const imgClassName = !aspectRatio
      ? `${className} ${classNameProp}`
      : `${className}`;

    const picture = this.state.failed
      ? (
        <img
          alt={alt || getAlt(imageProps.src)}
          className={classNameProp}
          data-sizes="auto"
          {...imageProps}
        />
      ) : (
        <picture>
          {sourceSets}
          <img
            key={`${src}_${path}`}
            loading={loading}
            alt={alt || getAlt(path)}
            className={imgClassName}
            data-sizes="auto"

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
        {preload}
        {picture}
        {children}
      </ResponsiveWrapper>
    );
  }
}
