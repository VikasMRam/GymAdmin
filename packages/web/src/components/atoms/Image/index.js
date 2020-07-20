import React from 'react';
import { string, oneOf, node, bool } from 'prop-types';
import styled from 'styled-components';
import { Lazy } from 'react-lazy';

import { size, assetPath } from 'sly/web/components/themes';

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

const ResponsiveWrapper = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  padding-top: ${paddingTop};
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  > img + div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LazyResponsiveWrapper = props => (
  <Lazy ltIE9>
    <ResponsiveWrapper {...props} />
  </Lazy>
);

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

  componentDidUpdate(prevProps) {
    // what if src of a failed image is changed(a failed image has placeholder as src),
    // state change here won't trigger render
    if (this.props.src !== prevProps.src && this.state.failed) {
      // eslint-disable-next-line react/no-did-update-set-state
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
      let ResponsiveWrapperComponent = ResponsiveWrapper;

      if (lazy) {
        ResponsiveWrapperComponent = LazyResponsiveWrapper;
      }

      return (
        <ResponsiveWrapperComponent
          aspectRatio={aspectRatio}
          {...props}
        >
          <StyledImage {...imageProps} />
          <div>
            {children}
          </div>
        </ResponsiveWrapperComponent>
      );
    }

    const image = <StyledImage {...imageProps} {...props} />;
    return lazy
      ? <StyledLazy cushion={CUSHION} ltIE9>{image}</StyledLazy>
      : image;
  }
}
