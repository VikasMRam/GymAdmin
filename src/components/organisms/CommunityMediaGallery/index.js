import React, { Component, Fragment } from 'react';
import { string, object, arrayOf, shape, bool, number, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Button, Link } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';

const BottomRightWrapper = styled.span`
  background: ${palette('slate', 'base')}80;
  font-size: ${size('text.tiny')};
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;

export default class CommunityMediaGallery extends Component {
  static propTypes = {
    communityName: string.isRequired,
    images: arrayOf(shape({
      src: string,
      path: string,
      formats: object,
    })),
    videos: arrayOf(shape({
      url: string.isRequired,
      name: string.isRequired,
      thumbUrl: string.isRequired,
    })),
    city: string,
    state: string,
    websiteUrl: string,
    ariaHideApp: bool,
    currentSlide: number,
    onSlideChange: func.isRequired,
    isFullscreenMode: bool,
    onToggleFullscreenMode: func,
  };

  static defaultProps = {
    currentSlide: 0,
    isFullscreenMode: false,
  };

  render() {
    const {
      communityName, city, state, images, videos, websiteUrl, ariaHideApp, currentSlide, onSlideChange, isFullscreenMode, onToggleFullscreenMode,
    } = this.props;
    const galleryItems = images.map((image, i) => ({
      ...image,
      alt: `${communityName}, ${city}, ${state} ${i + 1}`,
    }));
    // this.sdGalleryImages = videos.map((vid, i) => {
    //   // Important: create new object instance having src & alt as we will be modifying same object below
    //   return {
    //     ...vid, src: vid.thumbUrl, thumb: vid.thumbUrl, ofVideo: i, alt: `${communityName}, ${city}, ${state} ${i + 1}`,
    //   };
    // });
    // this.sdGalleryImages = this.sdGalleryImages.concat(images.map((img, i) => {
    //   return { ...img, src: img.sd, alt: `${communityName}, ${city}, ${state} ${this.sdGalleryImages.length + i + 1}` };
    // }));
    // this.formattedVideos = videos.map((vid) => {
    //   const src = [];
    //   if (vid.url) {
    //     src.push({
    //       url: vid.url,
    //       type: 'mp4',
    //     });
    //   }
    //   if (vid.webmUrl) {
    //     src.push({
    //       url: vid.webmUrl,
    //       type: 'webm',
    //     });
    //   }
    //
    //   return { ...vid, src, thumb: vid.thumbUrl };
    // });
    const topRightSection = () => (
      <Button secondary ghost transparent={false} onClick={() => onToggleFullscreenMode(false, true)}>View Photos</Button>
    );

    // if (websiteUrl && !websiteUrl.includes('//')) {
    //   websiteUrl = `//${websiteUrl}`;
    // }
    const bottomRightSection = () => (
      websiteUrl ?
        <BottomRightWrapper>
          <Link size="tiny" palette="slate" variation="filler" href={websiteUrl} target="_blank" rel="noopener"> Image source </Link>
        </BottomRightWrapper> : null
    );

    return (
      <>
        <MediaGallery
          onSlideClick={i => onToggleFullscreenMode(Object.prototype.hasOwnProperty.call(this.sdGalleryImages[i], 'ofVideo'))}
          communityName={communityName}
          images={galleryItems}
          topRightSection={topRightSection}
          bottomRightSection={bottomRightSection}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
        />
        {/*<FullscreenMediaGallery*/}
        {/*  currentSlide={currentSlide}*/}
        {/*  isOpen={isFullscreenMode}*/}
        {/*  communityName={communityName}*/}
        {/*  videos={this.formattedVideos}*/}
        {/*  images={this.hdGalleryImages}*/}
        {/*  onClose={() => onToggleFullscreenMode(Object.prototype.hasOwnProperty.call(this.sdGalleryImages[currentSlide], 'ofVideo'))}*/}
        {/*  ariaHideApp={ariaHideApp}*/}
        {/*  onSlideChange={onSlideChange}*/}
        {/*/>*/}
      </>
    );
  }
}
