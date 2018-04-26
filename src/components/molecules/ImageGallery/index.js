import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Icon, Thumbnail } from 'sly/components/atoms';

const CarouselWrapper = styled.div`
  overflow: hidden;
  position: relative;
  background: ${ifProp('transparent', 'transparent', palette('grayscale', 1))};
  text-align: center;
  margin-bottom: ${size('spacing.large')};
  ${props =>
    !props.autoHeight &&
    css`
      height: ${size('carousel.mobile')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        height: ${size('carousel.tablet')};
      }
    `};
`;
const StyledImg = styled.img`
  pointer-events: none;
  width: 100%;
  object-fit: cover;
  ${props =>
    !props.autoHeight &&
    css`
      max-height: ${size('carousel.mobile')};
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        max-height: ${size('carousel.tablet')};
      }
    `};
`;
const styledIcon = styled(Icon)`
  position: absolute;
  z-index: 100;
  margin: auto;
  top: 0;
  bottom: 0;

  :hover {
    cursor: pointer;
  }
`;
const PrevSlide = styled(styledIcon)`
  left: 0;
`;
const NextSlide = styled(styledIcon)`
  right: 0;
`;
const TopRightWrapper = styled.span`
  right: ${size('spacing.large')};
  top: ${size('spacing.xLarge')};
  position: absolute;
  z-index: 1;
`;
const ThumbWrapper = styled.ul`
  overflow: scroll;
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-right: ${size('spacing.regular')};
  }
  li:hover {
    cursor: pointer;
  }
`;
const sliderComponentStyle = {
  alignItems: 'center',
};

export default class ImageGallery extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
    })),
    showThumbnails: PropTypes.bool,
    autoHeight: PropTypes.bool,
    currentSlide: PropTypes.number,
    topRightSection: PropTypes.node,
    bottomLeftSection: PropTypes.node,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    images: [],
    showThumbnails: false,
    autoHeight: false,
  };

  state = {
    index: this.props.currentSlide || 0,
  };

  thumbnailRefs= [];

  handleChangeIndex = (index) => {
    // TODO: scrollIntoView is not supported in old browsers. See if there is better way
    if (this.thumbnailRefs[index] && this.thumbnailRefs[index].scrollIntoView) {
      this.thumbnailRefs[index].scrollIntoView({ behavior: 'smooth' });
    }
    this.setState({
      index,
    });
  };

  nextSlide = () => {
    const { index } = this.state;
    const numItems = this.props.images.length;
    this.handleChangeIndex(index === numItems - 1 ? 0 : index + 1);
  };

  prevSlide = () => {
    const { index } = this.state;
    const numItems = this.props.images.length;
    this.handleChangeIndex(index === 0 ? numItems - 1 : index - 1);
  };

  render() {
    return (
      <article>
        <CarouselWrapper {...this.props}>
          <PrevSlide icon="chevron-left" size="large" palette="white" onClick={this.prevSlide} />
          <TopRightWrapper>
            {this.props.topRightSection}
          </TopRightWrapper>
          <SwipeableViews containerStyle={sliderComponentStyle} enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
            {this.props.images.map((image, i) => (
              <StyledImg
                autoHeight={this.props.autoHeight}
                key={i}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </SwipeableViews>
          <NextSlide icon="chevron-right" size="large" palette="white" onClick={this.nextSlide} />
          {this.props.bottomLeftSection}
        </CarouselWrapper>
        {this.props.showThumbnails &&
          <ThumbWrapper>
            {this.props.images.map((image, i) => (
              <li key={i} ref={(c) => { this.thumbnailRefs[i] = c; }}>
                <Thumbnail
                  palette="white"
                  selected={i === this.state.index}
                  src={image.thumb}
                  alt={image.alt}
                  onClick={() => this.handleChangeIndex(i)}
                />
              </li>
            ))}
          </ThumbWrapper>
        }
      </article>
    );
  }
}
