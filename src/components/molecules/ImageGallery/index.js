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
const StyledVideo = styled.video`
  width: 100%;
  object-fit: fill;
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
const slideStyle = {
  position: 'relative',
  overflow: 'initial',
};
const PlayIcon = styled(Icon)`
  position: absolute;
  top: 44%;
  left: 50%;

  :hover {
    cursor: pointer;
  }
`;

export default class ImageGallery extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      ofVideo: PropTypes.number,
    })),
    videos: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
    })),
    showThumbnails: PropTypes.bool,
    autoHeight: PropTypes.bool,
    currentSlide: PropTypes.number,
    topRightSection: PropTypes.node,
    bottomLeftSection: PropTypes.node,
    transparent: PropTypes.bool,
    onPlayClicked: PropTypes.func,
  };

  static defaultProps = {
    images: [],
    videos: [],
    showThumbnails: false,
    autoHeight: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.thumbnailRefs = [];
    this.mediaRefs = [];
    this.mediaLoaded = new Set();

    if (props.currentSlide !== undefined) {
      this.state.index = props.currentSlide;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentSlide !== undefined) {
      this.setState({
        index: nextProps.currentSlide,
      });
    }
  }

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

  handleChangeIndex = (index) => {
    // TODO: scrollIntoView is not supported in old browsers. See if there is better way
    if (this.thumbnailRefs[index] && this.thumbnailRefs[index].scrollIntoView) {
      this.thumbnailRefs[index].scrollIntoView({ behavior: 'smooth' });
    }
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

    this.setState({
      index,
    });
  };

  nextSlide = () => {
    const { index } = this.state;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(index === numItems - 1 ? 0 : index + 1);
  };

  prevSlide = () => {
    const { index } = this.state;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(index === 0 ? numItems - 1 : index - 1);
  };

  shouldLoadMedia = (i) => {
    const { index } = this.state;
    const numItems = this.allMedia.length;
    // media can be loaded if:
    // - it's already loaded(user viewed the slide)
    // - it's current slide
    // - it's one before current slide
    // - it's one after current slide
    return this.mediaLoaded.has(i) || (Math.abs(i - index) < 2) ||
      // if the current slide is last slide then also load first slide
      // if the current slide is first slide then also load last slide
      (index === 0 && i === numItems - 1) || (index === numItems - 1 && i === 0);
  };

  render() {
    const formattedVideos = this.props.videos.map((video) => {
      return { ...video, type: 'video' };
    });
    const formattedImages = this.props.images.map((video) => {
      return { ...video, type: 'image' };
    });
    this.allMedia = formattedVideos.concat(formattedImages);
    this.setLoadedImages(this.state.index);

    return (
      <article>
        <CarouselWrapper {...this.props}>
          <PrevSlide icon="chevron-left" size="large" palette="white" onClick={this.prevSlide} />
          <TopRightWrapper>
            {this.props.topRightSection}
          </TopRightWrapper>
          <SwipeableViews
            containerStyle={sliderComponentStyle}
            slideStyle={slideStyle}
            enableMouseEvents
            index={this.state.index}
            onChangeIndex={this.handleChangeIndex}
          >
            {/* load only media before and after current slide. Also keep track of media that was loaded once so that it won't
                be inserted and removed from dom when user switch slides
            */}
            {this.allMedia.map((media, i) => {
              switch (media.type) {
                case 'image':
                  return (
                    <span key={i}>
                      {media.ofVideo !== undefined &&
                        <PlayIcon
                          onClick={() => this.props.onPlayClicked(i)}
                          icon="play"
                          size="large"
                          palette="white"
                        />
                      }
                      <StyledImg
                        autoHeight={this.props.autoHeight}
                        src={this.shouldLoadMedia(i) ? media.src : ''}
                        alt={media.alt}
                        innerRef={(c) => { this.mediaRefs[i] = c; }}
                      />
                    </span>
                  );
                case 'video':
                  return (
                    <StyledVideo
                      autoPlay={i === this.state.index}
                      controls
                      key={i}
                      controlsList="nodownload"
                      innerRef={(c) => { this.mediaRefs[i] = c; }}
                    >
                      <source src={this.shouldLoadMedia(i) ? media.src : ''} type="video/mp4" />
                    </StyledVideo>
                  );
                default:
                  return null;
              }
            })}
          </SwipeableViews>
          <NextSlide icon="chevron-right" size="large" palette="white" onClick={this.nextSlide} />
          {this.props.bottomLeftSection}
        </CarouselWrapper>
        {this.props.showThumbnails &&
          <ThumbWrapper>
            {this.allMedia.map((media, i) => (
              <li key={i} ref={(c) => { this.thumbnailRefs[i] = c; }}>
                <Thumbnail
                  palette="white"
                  selected={i === this.state.index}
                  src={media.thumb}
                  alt={media.alt}
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
