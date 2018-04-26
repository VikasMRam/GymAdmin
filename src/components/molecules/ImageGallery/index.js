import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Icon, Thumbnail, Image } from 'sly/components/atoms';

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
const StyledImg = styled(Image)`
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
  imageLoaded = [];

  handleChangeIndex = (index) => {
    // TODO: scrollIntoView is not supported in old browsers. See if there is better way
    if (this.thumbnailRefs[index] && this.thumbnailRefs[index].scrollIntoView) {
      this.thumbnailRefs[index].scrollIntoView({ behavior: 'smooth' });
    }
    this.imageLoaded.push(index);
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

  shouldLoadImage = (i) => {
    const { index } = this.state;
    const numItems = this.props.images.length;
    // an image can be loaded if:
    // - it's already loaded(user viewed the slide)
    // - it's current slide
    // - it's one before current slide
    // - it's one after current slide
    return this.imageLoaded.includes(i) || (Math.abs(i - index) < 2) ||
      // if the current slide is last slide then also load first slide
      // if the current slide is first slide then also load last slide
      (index === 0 && i === numItems - 1) || (index === numItems - 1 && i === 0);
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
            {/* load only image before and after current slide. Also keep track of image that was loaded once so that it won't
                be inserted and removed from dom when user switch slides
            */}
            {this.props.images.map((image, i) => (
              <StyledImg
                autoHeight={this.props.autoHeight}
                key={i}
                src={this.shouldLoadImage(i) ? image.src : ''}
                alt={image.alt}
              />
              ))
            }
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
