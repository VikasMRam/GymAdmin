import React, { Component } from 'react';
import styled from 'styled-components';
import { ifProp, ifNotProp } from 'styled-tools';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard';


import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import VideoThumbnail from 'sly/web/components/molecules/VideoThumbnail';
import { color, layout, space, sx, sx$laptop, sx$tablet } from 'sly/common/system';
import Image from 'sly/common/system/Image';
import CarrousselButton from 'sly/web/components/homepage/CarrousselButton';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const videoMimeTypes = {
  mp4: 'video/mp4',
  webm: 'video/webm',
};

const StyledImg = styled(Image)`
  ${ifNotProp('crop', sx`
    height: 100%;
    img {
      object-fit: contain;
    }
    padding-top: 126%;
    
    ${sx$tablet`
      padding-top: 113%;
    `}
    
    ${sx$laptop`
      padding-top: 80%;
      height: max-content;
    `}
  `, sx$tablet`
    padding-top: 0;
    height: 100%
  `)}
`;

const StyledVideoSlide = styled(VideoThumbnail)`
  height: 100% !important;
  
  ${ifProp('crop', sx$tablet`
    & > div:last-child {
      height: 100%;
      padding-top: 0;
    }
  `)}
`;
const StyledVideo = styled.video`
  width: 100%;
  object-fit: contain;
`;
const StyledIcon = styled(CarrousselButton)`
  display: none;
  position: absolute;
  z-index: 1;
  
  ${ifNotProp('crop', sx$tablet({
    display: 'flex',
    top: 'calc((100% - 120px) / 2)',
    transform: 'translateY(-50%)',
  }))}
`;

const sliderRootElementStyle = {
  height: 'inherit',
  // lineHeight: 0,
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

export default class MediaGallery extends Component {
  static propTypes = {
    images: arrayOf(shape({
      path: string.isRequired,
      alt: string.isRequired,
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
    sizes: string,
    showThumbnails: bool,
    currentSlide: number,
    bottomLeftSection: func,
    bottomRightSection: func,
    bottomCenteredSection: func,
    transparent: bool,
    onSlideClick: func,
    onSlideChange: func.isRequired,
    aspectRatio: string,
    withoutCtaButtons: bool,
    inModal: bool,
  };

  static defaultProps = {
    images: [],
    videos: [],
    showThumbnails: false,
    currentSlide: 0,
    aspectRatio: '3:2',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    withoutCtaButtons: false,
    inModal: false,
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
    e.stopPropagation();

    const { currentSlide } = this.props;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(currentSlide === numItems - 1 ? 0 : currentSlide + 1);
  };

  prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { currentSlide } = this.props;
    const numItems = this.allMedia.length;
    this.handleChangeIndex(currentSlide === 0 ? numItems - 1 : currentSlide - 1);
  };

  shouldLoadMedia = (i) => {
    const { currentSlide, inModal } = this.props;
    return inModal ? i === currentSlide : [0].includes(i);
  };

  getImageDescription = description => description && (
    <Block
      onClick={evt => evt.stopPropagation()}
      sx={{
        background: 'black.base',
        position: 'absolute',
        bottom: 0,
        color: 'white',
        p: 'm',
        width: '100%',
      }}
      sx$tablet={{
        width: '100%',
        mx: 'auto',
        py: 'l',
      }}
      sx$laptop={{
        px: sx`calc((${layout('col12')} - ${layout('col8')}) / 2)`,
      }}
    >
      <CollapsibleBlock
        minHeight={48}
        collapsedLabel="Read more"
        expandTo="top"
        moreLabelOn="left"
        blockClassName="image-caption"
        textAlign="center"
        showChevron={false}
        withReadLess={false}
        collapsedLabelStyles={{ div: { color: 'white.base' }, my: '-xxs' }}
        collapsedDefault
        minRowQty={2}
      >
        {description}
      </CollapsibleBlock>
    </Block>
  );

  generateSlideContent = (media, index) => {
    const { currentSlide, sizes, inModal, aspectRatio, bottomCenteredSection } = this.props;

    switch (media.type) {
      case 'image': {
        const SlideComponent = typeof media.ofVideo !== 'undefined'
          ? StyledVideoSlide
          : StyledImg;
        return (
          <>
            <SlideComponent
              key="media-gallery-slide"
              src={media.src}
              path={media.path}
              aspectRatio={aspectRatio}
              sizes={sizes}
              alt={media.alt}
              // loading={this.shouldLoadMedia(index) ? 'auto' : 'lazy'}
              loading={!inModal && index === 0 ? 'eager' : 'lazy'}
              shouldPreload={!inModal && index === 0}
              ref={(c) => { this.mediaRefs[index] = c; }}
              crop={!inModal}
              onClick={(evt) => { inModal && evt.stopPropagation(); }}
            >
              {bottomCenteredSection &&
                <Block
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: sx`${space('xs')}`,
                  }}
                >
                  {bottomCenteredSection(this.allMedia[currentSlide])}
                </Block>
              }
              {!inModal && (
                <Block
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    '&:hover': {
                      backgroundColor: sx`${color('black.base')}33`,
                    },
                  }}
                />
              )}
            </SlideComponent>
          </>
        );
      }
      case 'video':
        return (
          <StyledVideo
            key="media-gallery-slide"
            autoPlay={index === currentSlide}
            controls
            controlsList="nodownload"
            ref={(c) => { this.mediaRefs[index] = c; }}
            onClick={(evt) => { inModal && evt.stopPropagation(); }}
            crop={!inModal}
          >
            {media.src.map(src => (
              <source
                key={src.url}
                src={src.url}
                // src={(this.shouldLoadMedia(index) ? src.url : '') || inModal}
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
      currentSlide, videos, images, bottomLeftSection, bottomRightSection,
      showThumbnails, withoutCtaButtons, inModal,
    } = this.props;
    const { onSlideChange, onSlideClick, transparent, ...rest } = this.props;
    const thumbnails = [];

    const formattedImages = images.map((image) => {
      thumbnails.push({
        path: image.path,
        alt: `${image.alt} thumbnail`,
      });

      if (typeof image.ofVideo !== 'undefined' && videos[image.ofVideo]) {
        return { ...videos[image.ofVideo], type: 'video' };
      }
      return { ...image, type: 'image' };
    });

    this.allMedia = formattedImages;// formattedVideos.concat(formattedImages);
    /* load only media before and after current slide. Also keep track of media that was loaded once so that it won't
      be inserted and removed from dom when user switch slides */
    this.setLoadedImages(currentSlide);
    const slideViews = this.allMedia.map((media, i) => (
      <React.Fragment key={media.id || media.alt}>
        <Grid
          hasOnSlideClick={!!onSlideClick}
          sx={{
            position: 'relative',
            alignItems: 'center',
            height: inModal ? 'calc(100% - 104px)' : '100%',
            ':hover': { cursor: onSlideClick ? 'pointer' : 'initial' },
            ...(this.props.inModal && {
              maxWidth: sx`calc((100vh - ${space('xxxl')} - (${space('l')} * 3) - (${space('m')} * 2)) / 1.267)`,
              mx: 'auto',
            }),
          }}
          sx$tablet={{
            height: inModal ? 'calc(100% - 120px)' : '100%',
            maxWidth: this.props.inModal && sx`calc((100vh - ${space('xxxl')} - (${space('l')} * 3) - (${space('l')} * 2)) / 1.132)`,
            gridArea: !inModal && i < 3 && `${(i === 0 && 'left') || (i === 1 && 'top-right') || (i === 2 && 'bottom-right')}-image`,
          }}
          sx$laptop={{
            maxWidth: this.props.inModal && sx`calc((100vh - ${space('xxxl')} - (${space('l')} * 3) - (${space('l')} * 2)) / .8)`,
          }}
          onClick={() => onSlideClick?.(i)}
        >
          {this.generateSlideContent(media, i)}
        </Grid>
        {inModal && this.getImageDescription(media.description)}
      </React.Fragment>
    ));

    return (
      <>
        <Block
          background={!transparent && inModal ? 'grey' : undefined}
          pad={showThumbnails && 'm'}
          height="100%"
          {...rest}
          sx$tablet={{
            ...(this.props.inModal && {
              width: '100%',
            }),
          }}
          sx$laptop={{
            px: this.props.inModal && sx`calc((100% - ${layout('col12')}) / 2)`,
          }}

        >
          <Block height="inherit" sx$tablet={{ display: !inModal && 'none' }}>
            {this.allMedia.length > 1 && !withoutCtaButtons &&
              <>
                <StyledIcon
                  rotation={-90}
                  sx={{ left: sx`${space('l')}` }}
                  onClick={this.prevSlide}
                />
                <StyledIcon
                  rotation={90}
                  sx={{ right: sx`${space('l')}` }}
                  onClick={this.nextSlide}
                />
              </>
            }
            <BindKeyboardSwipeableViews
              style={sliderRootElementStyle}
              containerStyle={sliderComponentStyle}
              slideStyle={sliderSlideStyle}
              onChangeIndex={onSlideChange}
              enableMouseEvents
              disableLazyLoading
              index={currentSlide}
            >
              {slideViews}
            </BindKeyboardSwipeableViews>
          </Block>
          {!inModal && (this.allMedia.length > 2
              ? (
                <Block
                  display="none"
                  overflow="hidden"
                  sx$tablet={{
                    display: 'grid',
                    gridTemplateColumns: sx`calc(65.44% - ${space('xxs')}) calc(34.66% - ${space('xxs')})`,
                    gridTemplateRows: '14.25rem 14.25rem',
                    gridGap: 'xs',
                    gridTemplateAreas: `
                    'left-image top-right-image'
                    'left-image bottom-right-image'
                  `,
                  }}
                  sx$laptop={{
                    gridTemplateColumns: '43.5rem 20.5rem',
                    gridTemplateRows: '14.25rem 14.25rem',
                    border: 'round',
                  }}
                >
                  {slideViews.slice(0, 3)}
                </Block>
              )
              : (
                <Block
                  display="none"
                  overflow="hidden"
                  position="relative"
                  sx$tablet={{ display: 'block', width: '100%', height: '29rem' }}
                  sx$laptop={{ width: 'col12', border: 'round' }}
                >
                  {slideViews[0]}
                </Block>
              )
          )}
          {bottomRightSection &&
            <Block
              sx={{
                position: 'absolute',
                zIndex: 1,
                right: sx`${space('l')}`,
                bottom: sx`${space('l')}`,
              }}
            >
              {bottomRightSection()}
            </Block>
          }
          {bottomLeftSection &&
            <Block
              sx={{
                position: 'absolute',
                zIndex: 1,
                left: sx`${space('xs')}`,
                bottom: sx`${space('xs')}`,
              }}
            >
              {bottomLeftSection(this.allMedia[currentSlide])}
            </Block>
          }
        </Block>
      </>
    );
  }
}
