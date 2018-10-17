import React, { Component } from 'react';
import { string, arrayOf, shape, bool, number, func } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Button, Link, Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';


const MorePicsTablet = styled(Button)`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: initial;
  }
`;
const MorePicsMobile = styled(Button)`
  display: initial;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;
const BottomRightWrapper = styled.span`
  background: ${palette('black', 0)}80;
  color: ${palette('grayscale', 2)};
  font-size: ${size('text.tiny')};
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;
const StyledButton = styled(Button)`
  span {
    margin-right: ${size('spacing.regular')};
  }
`;

export default class CommunityMediaGallery extends Component {
  static propTypes = {
    communityName: string.isRequired,
    images: arrayOf(shape({
      sd: string.isRequired,
      hd: string.isRequired,
      thumb: string.isRequired,
      url: string.isRequired,
    })),
    videos: arrayOf(shape({
      url: string.isRequired,
      name: string.isRequired,
      thumbUrl: string.isRequired,
    })),
    websiteUrl: string,
    ariaHideApp: bool,
    currentSlide: number,
    onSlideChange: func.isRequired,
    isFullscreenMode: bool,
    onToggleFullscreenMode: func,
    onFavouriteClick: func,
    isFavouriteEnabled: bool,
    isFavourited: bool,
  };

  static defaultProps = {
    currentSlide: 0,
    isFullscreenMode: false,
    isFavouriteEnabled: true,
    isFavourited: false,
  };

  render() {
    const {
      communityName, city, state, videos, ariaHideApp, currentSlide, onSlideChange, isFullscreenMode, onToggleFullscreenMode,
      onFavouriteClick, isFavouriteEnabled, isFavourited,
    } = this.props;
    let { websiteUrl } = this.props;
    const { images } = this.props;
    this.sdGalleryImages = videos.map((vid, i) => {
      // Important: create new object instance having src & alt as we will be modifying same object below
      return {
        ...vid, src: vid.thumbUrl, thumb: vid.thumbUrl, ofVideo: i, alt: `${communityName}, ${city}, ${state} ${i + 1}`,
      };
    });
    this.sdGalleryImages = this.sdGalleryImages.concat(images.map((img, i) => {
      return { ...img, src: img.sd, alt: `${communityName}, ${city}, ${state} ${this.sdGalleryImages.length + i + 1}` };
    }));
    this.hdGalleryImages = images.map((img, i) => {
      return { ...img, src: img.hd, alt: `${communityName}, ${city}, ${state}  ${i + 1}` };
    });
    this.formattedVideos = videos.map((vid) => {
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

      return { ...vid, src, thumb: vid.thumbUrl };
    });
    const topRightSection = () => (
      <span>
        {/* <StyledButton ghost palette="slate"><Icon icon="share" size="regular" palette="slate" /></StyledButton> */}
        {isFavouriteEnabled && !isFavourited &&
          <StyledButton ghost palette="slate" onClick={onFavouriteClick}>
            <Icon icon="favourite-empty" size="regular" palette="slate" /> Save
          </StyledButton>
        }
        {isFavouriteEnabled && isFavourited &&
          <StyledButton ghost palette="slate" onClick={onFavouriteClick}>
            <Icon icon="favourite-light" size="regular" palette="primary" /> Save
          </StyledButton>
        }
      </span>
    );
    const bottomLeftSection = () => (
      <span>
        <MorePicsTablet ghost palette="slate" transparent={false} onClick={() => onToggleFullscreenMode(false, false, true)}>See {this.sdGalleryImages.length - 1} more pictures</MorePicsTablet>
        <MorePicsMobile ghost palette="slate" transparent={false} onClick={() => onToggleFullscreenMode(false, false, true)}>View pictures</MorePicsMobile>
      </span>
    );

    if (websiteUrl && !websiteUrl.includes('//')) {
      websiteUrl = `//${websiteUrl}`;
    }
    const bottomRightSection = () => (
      websiteUrl ?
        <BottomRightWrapper>
          <Link palette="grayscale" href={websiteUrl} target="_blank"> Image source </Link>
        </BottomRightWrapper> : null
    );

    return (
      <section>
        <MediaGallery
          onSlideClick={i => onToggleFullscreenMode(false, Object.prototype.hasOwnProperty.call(this.sdGalleryImages[i], 'ofVideo'))}
          communityName={communityName}
          images={this.sdGalleryImages}
          topRightSection={topRightSection}
          bottomLeftSection={this.sdGalleryImages.length > 1 ? bottomLeftSection : null}
          bottomRightSection={bottomRightSection}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
        />
        <FullscreenMediaGallery
          currentSlide={currentSlide}
          isOpen={isFullscreenMode}
          communityName={communityName}
          videos={this.formattedVideos}
          images={this.hdGalleryImages}
          onClose={() => onToggleFullscreenMode(false, Object.prototype.hasOwnProperty.call(this.sdGalleryImages[currentSlide], 'ofVideo'))}
          ariaHideApp={ariaHideApp}
          onSlideChange={onSlideChange}
        />
      </section>
    );
  }
}
