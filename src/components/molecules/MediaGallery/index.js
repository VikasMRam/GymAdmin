import React, { Component, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { string, bool, arrayOf, shape, number, func } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Icon, Image } from 'sly/components/atoms';
import ThumbnailScroller from 'sly/components/molecules/ThumbnailScroller';
import VideoThumbnail from 'sly/components/molecules/VideoThumbnail';

const videoMimeTypes = {
  mp4: 'video/mp4',
  webm: 'video/webm',
};

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  background: ${ifProp('transparent', 'transparent', palette('grey', 'base'))};
  text-align: center;

  ${props =>
    props.showThumbnails &&
    css`
      margin-bottom: ${size('spacing.large')};
    `};
`;
const imageStyles = css`
  width: 100%;
  object-fit: cover;
  height: inherit;
`;
const StyledImg = styled(Image)`
  ${imageStyles};
`;
const StyledVideoThumbnail = styled(VideoThumbnail)`
  ${imageStyles};
`;
const StyledVideo = styled.video`
  width: 100%;
  object-fit: fill;
  height: inherit;
`;
const StyledIcon = styled(Icon)`
  position: absolute;
  z-index: 1;
  top: 50%;
  bottom: 0;
  margin-top: calc(-${size('icon.xLarge')} / 2);

  :hover {
    cursor: pointer;
  }
`;
const PrevSlide = styled(StyledIcon)`
  left: ${size('spacing.regular')};
`;
const NextSlide = styled(StyledIcon)`
  right: ${size('spacing.regular')};
`;
const TopRightWrapper = styled.span`
  right: ${size('spacing.regular')};
  top: ${size('spacing.regular')};
  position: absolute;
  z-index: 1;
`;
const BottomLeftWrapper = styled.span`
  left: ${size('spacing.regular')};
  bottom: ${size('spacing.regular')};
  position: absolute;
  z-index: 1;
`;

const BottomRightWrapper = styled.span`
  right: ${size('spacing.regular')};
  bottom: ${size('spacing.regular')};
  position: absolute;
  z-index: 1;
`;

const sliderRootElementStyle = {
  height: 'inherit',
  lineHeight: 0,
};
const sliderComponentStyle = {
  alignItems: 'center',
  height: 'inherit',
  // TODO: temp fix first slide change having no transition
  transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
};
const sliderSlideStyle = {
  overflow: 'hidden',
  height: 'inherit',
};

const StyledSlide = styled.div`
  height: inherit;
  :hover {
    cursor: ${ifProp('hasOnSlideClick', 'pointer', 'initial')};
  }
`;

export default class MediaGallery extends Component {
  static propTypes = {
    images: arrayOf(shape({
      src: string.isRequired,
      alt: string.isRequired,
      thumb: string.isRequired,
      ofVideo: number,
    })),
    videos: arrayOf(shape({
      src: arrayOf(shape({
        type: string.isRequired,
        url: string.isRequired,
      })),
      name: string.isRequired,
      thumb: string.isRequired,
      alt: string,
    })),
    showThumbnails: bool,
    currentSlide: number,
    topRightSection: func,
    bottomLeftSection: func,
    bottomRightSection: func,
    transparent: bool,
    onSlideClick: func,
    onSlideChange: func.isRequired,
    aspectRatio: string,
  };

  static defaultProps = {
    images: [],
    videos: [],
    showThumbnails: false,
    currentSlide: 0,
    aspectRatio: '3:2',
  };

  setLoadedImages(index) {
    if (index - 1 >= 0) {
      this.mediaLoaded.add(index - 1);
    }
    if (index === 0) {
      this.mediaLoaded.add(this.allMedia.length - 1);
    }
    this.mediaLoaded.add(index);
    if (index < this.allMedia.length) {
      this.mediaLoaded.add(index + 1);
    }
    if (index === this.allMedia.length - 1) {
      this.mediaLoaded.add(0);
    }
  }

  thumbnailRefs = [];
  mediaRefs = [];
  allMedia = [];
  mediaLoaded = new Set();

  handleChangeIndex = (index) => {
    // pause playing videos
    this.mediaRefs.forEach((mediaRef) => {
      if (mediaRef.pause) {
        mediaRef.pause();
      }
    });
    // chrome and firefox does not respect video autoplay attribute
    if (this.mediaRefs[index] && this.mediaRefs[index].play) {
      this.mediaRefs[index].play();
    }

    this.props.onSlideChange(index);
  };

  nextSlide = (e) => {
    e.preventDefault();

    const { currentSlide } = this.props;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(currentSlide === numItems - 1 ? 0 : currentSlide + 1);
  };

  prevSlide = (e) => {
    e.preventDefault();

    const { currentSlide } = this.props;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(currentSlide === 0 ? numItems - 1 : currentSlide - 1);
  };

  shouldLoadMedia = (i) => {
    const { currentSlide } = this.props;
    const numItems = this.allMedia.length;
    // media can be loaded if:
    // - it's already loaded(user viewed the slide)
    // - it's current slide
    // - it's one before current slide
    // - it's one after current slide
    return this.mediaLoaded.has(i) || (Math.abs(i - currentSlide) < 2) ||
      // if the current slide is last slide then also load first slide
      // if the current slide is first slide then also load last slide
      (currentSlide === 0 && i === numItems - 1) || (currentSlide === numItems - 1 && i === 0);
  };

  generateSlideContent = (media, index) => {
    const { currentSlide, aspectRatio } = this.props;

    switch (media.type) {
      case 'image':
        return media.ofVideo !== undefined ? (
          <StyledVideoThumbnail
            key="media-gallery-slide"
            src={this.shouldLoadMedia(index) ? media.src : ''}
            data-src={media.src}
            alt={media.alt}
            innerRef={(c) => { this.mediaRefs[index] = c; }}
            aspectRatio={aspectRatio}
          />
        ) : (
          <StyledImg
            key="media-gallery-slide"
            src={this.shouldLoadMedia(index) ? media.src : ''}
            data-src={media.src}
            alt={media.alt}
            lazy={false}
            innerRef={(c) => { this.mediaRefs[index] = c; }}
            aspectRatio={aspectRatio}
          />
        );
      case 'video':
        return (
          <StyledVideo
            key="media-gallery-slide"
            autoPlay={index === currentSlide}
            controls
            controlsList="nodownload"
            innerRef={(c) => { this.mediaRefs[index] = c; }}
          >
            {media.src.map(src => (
              <source
                key={src.url}
                src={this.shouldLoadMedia(index) ? src.url : ''}
                type={videoMimeTypes[src.type]}
              />
            ))}
          </StyledVideo>
        );
      default:
        return null;
    }
  };

  render() {
    const {
      currentSlide, videos, images, topRightSection, bottomLeftSection, bottomRightSection, showThumbnails, onSlideClick, onSlideChange,
    } = this.props;
    const thumbnails = [];
    const formattedVideos = videos.map((video) => {
      thumbnails.push({
        src: video.thumb,
        alt: `${video.alt} thumbnail`,
      });
      return { ...video, type: 'video' };
    });
    const formattedImages = images.map((image) => {
      thumbnails.push({
        src: image.thumb,
        alt: `${image.alt} thumbnail`,
      });
      return { ...image, type: 'image' };
    });
    this.allMedia = formattedVideos.concat(formattedImages);
    /* load only media before and after current slide. Also keep track of media that was loaded once so that it won't
      be inserted and removed from dom when user switch slides */
    this.setLoadedImages(currentSlide);
    const slideViews = this.allMedia.map((media, i) => (
      <StyledSlide
        key={media.id}
        hasOnSlideClick={onSlideClick}
        onClick={() => onSlideClick && onSlideClick(i)}
      >
        {this.generateSlideContent(media, i)}
      </StyledSlide>
    ));

    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <CarouselWrapper {...this.props}>
          {this.allMedia.length > 1 &&
            <PrevSlide
              className="media-carousel-control-prev"
              icon="chevron"
              rotate={1}
              size="xLarge"
              palette="white"
              onClick={this.prevSlide}
            />
          }
          {topRightSection &&
            <TopRightWrapper>
              {topRightSection(this.allMedia[currentSlide])}
            </TopRightWrapper>
          }
          <SwipeableViews
            style={sliderRootElementStyle}
            containerStyle={sliderComponentStyle}
            slideStyle={sliderSlideStyle}
            onChangeIndex={onSlideChange}
            enableMouseEvents
            index={currentSlide}
          >
            {slideViews}
          </SwipeableViews>
          {this.allMedia.length > 1 &&
            <NextSlide
              className="media-carousel-control-next"
              icon="chevron"
              rotate={-1}
              size="xLarge"
              palette="white"
              onClick={this.nextSlide}
            />
          }
          {bottomLeftSection &&
            <BottomLeftWrapper>
              {bottomLeftSection(this.allMedia[currentSlide])}
            </BottomLeftWrapper>
          }
          {bottomRightSection &&
            <BottomRightWrapper>
              {bottomRightSection(this.allMedia[currentSlide])}
            </BottomRightWrapper>
          }
        </CarouselWrapper>
        {showThumbnails &&
          <ThumbnailScroller
            palette="white"
            thumbnails={thumbnails}
            selected={currentSlide}
            onClick={this.handleChangeIndex}
          />
        }
      </Fragment>
    );
  }
}
