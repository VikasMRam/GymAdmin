import React, { Component } from 'react';
import { string, object, arrayOf, shape, bool, number, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette, getKey } from 'sly/common/components/themes';
import { Button, Link } from 'sly/common/components/atoms';
import IconButton from 'sly/common/components/molecules/IconButton';
import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/web/components/molecules/FullscreenMediaGallery';

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
      thumbPath: string.isRequired,
    })),
    city: string,
    state: string,
    websiteUrl: string,
    ariaHideApp: bool,
    currentSlide: number,
    onSlideChange: func.isRequired,
    isFullscreenMode: bool,
    onToggleFullscreenMode: func,
    isFavorited: bool,
    onFavouriteClick: func,
    onShareClick: func,
  };

  static defaultProps = {
    currentSlide: 0,
    isFullscreenMode: false,
  };

  render() {
    const {
      communityName, city, state, images, videos, websiteUrl, ariaHideApp, currentSlide, onSlideChange, isFullscreenMode, onToggleFullscreenMode, onFavouriteClick, isFavorited, onShareClick
    } = this.props;

    const galleryImages = images.map((image, i) => ({
      ...image,
      alt: `${communityName}, ${city}, ${state} ${i + 1}`,
    }));

    const formattedVideos = [];
    const galleryVideos = [];


    videos.forEach((vid, i) => {
      const src = [];
      if (vid.url) {
        src.push({
          url: vid.url,
          type: 'mp4',
        });
      }
      if (vid.webmUrl) {
        src.push({
          url: vid.webmUrl,
          type: 'webm',
        });
      }

      formattedVideos.push({ ...vid, src, thumb: vid.thumbUrl });

      // Important: create new object instance having src & alt as we will be modifying same object below
      galleryVideos.push({
        ...vid, path: galleryImages[0]?.path, ofVideo: i, alt: `${communityName}, ${city}, ${state} ${i + 1}`,
      });
    });

    const galleryItems = galleryVideos.concat(galleryImages);

    const topLeftSection = () => (
      <Button secondary ghost onClick={() => onToggleFullscreenMode(false, true)}>View Photos</Button>
    );

    const topRightSection = () => {
      const { onFavouriteClick, isFavorited, onShareClick } = this.props;
      const favIcon = isFavorited ? 'favourite-dark' : 'favourite-empty';
      return (
        <div>
          <IconButton
            icon="share"
            marginLeft="regular"
            palette="slate"
            display="inline-block"
            onClick={onShareClick}
            hideTextInMobile
            secondary
            ghost
          >
            Share
          </IconButton>
          <IconButton
            icon={favIcon}
            marginLeft="regular"
            palette="slate"
            display="inline-block"
            onClick={onFavouriteClick}
            hideTextInMobile
            secondary
            ghost
          >
            Favorite
          </IconButton>
        </div>
      );
    };

    // if (websiteUrl && !websiteUrl.includes('//')) {
    //   websiteUrl = `//${websiteUrl}`;
    // }
    const bottomRightSection = () => (
      websiteUrl ?
        <BottomRightWrapper>
          <Link size="tiny" palette="slate" variation="filler" href={websiteUrl} target="_blank" rel="noopener"> Image source </Link>
        </BottomRightWrapper> : null
    );

    const inlineMediaSizes = getKey('imageFormats.heroGallery').sizes;
    const fullscreenMediaSizes = getKey('imageFormats.fullscreenGallery').sizes;
    return (
      <>
        <MediaGallery
          onSlideClick={i => onToggleFullscreenMode(!!galleryItems[i].ofVideo)}
          communityName={communityName}
          images={galleryItems}
          topLeftSection={topLeftSection}
          topRightSection={topRightSection}
          sizes={inlineMediaSizes}
          bottomRightSection={bottomRightSection}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
        />
        <FullscreenMediaGallery
          currentSlide={currentSlide}
          isOpen={isFullscreenMode}
          communityName={communityName}
          sizes={fullscreenMediaSizes}
          videos={formattedVideos}
          images={galleryItems}
          onClose={() => onToggleFullscreenMode(!!galleryItems[currentSlide].ofVideo)}
          ariaHideApp={ariaHideApp}
          onSlideChange={onSlideChange}
        />
      </>
    );
  }
}
