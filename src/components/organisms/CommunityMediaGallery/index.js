import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Button, Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';

const StyledButton = styled(Button)`
  padding: 0 ${size('spacing.regular')};
  margin-left: ${size('spacing.large')};
`;
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

export default class CommunityMediaGallery extends React.Component {
  static propTypes = {
    communityName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      sd: PropTypes.string.isRequired,
      hd: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
    videos: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbUrl: PropTypes.string.isRequired,
    })),
    ariaHideApp: PropTypes.bool,
    currentSlide: PropTypes.number,
    onSlideChange: PropTypes.func.isRequired,
    isFullscreenMode: PropTypes.bool,
    onToggleFullscreenMode: PropTypes.func,
  };

  static defaultProps = {
    currentSlide: 0,
    isFullscreenMode: false,
  };

  render() {
    const {
      communityName, images, videos, ariaHideApp, currentSlide, onSlideChange, isFullscreenMode, onToggleFullscreenMode,
    } = this.props;
    this.sdGalleryImages = videos.map((vid, i) => {
      // Important: create new object instance having src & alt as we will be modifying same object below
      return {
        ...vid, src: vid.thumbUrl, thumb: vid.thumbUrl, ofVideo: i, alt: `${communityName} ${i + 1}`,
      };
    });
    this.sdGalleryImages = this.sdGalleryImages.concat(images.map((img, i) => {
      return { ...img, src: img.sd, alt: `${communityName} ${this.sdGalleryImages.length + i + 1}` };
    }));
    this.hdGalleryImages = images.map((img, i) => {
      return { ...img, src: img.hd, alt: `${communityName} ${i + 1}` };
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
    // const topRightSection = () => (
    //   <span>
    //     {/*<StyledButton ghost palette="slate"><Icon icon="heart" size="regular" palette="slate" /></StyledButton>*/}
    //     {/*<StyledButton ghost palette="slate"><Icon icon="share" size="regular" palette="slate" /></StyledButton>*/}
    //   </span>
    // );
    const bottomLeftSection = () => (
      <span>
        <MorePicsTablet ghost palette="slate" transparent={false} onClick={onToggleFullscreenMode}>See {this.sdGalleryImages.length - 1} more pictures</MorePicsTablet>
        <MorePicsMobile ghost palette="slate" transparent={false} onClick={onToggleFullscreenMode}>View pictures</MorePicsMobile>
      </span>
    );

    return (
      <section>
        <MediaGallery
          onSlideClick={onToggleFullscreenMode}
          communityName={communityName}
          images={this.sdGalleryImages}
          bottomLeftSection={bottomLeftSection}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
        />
        <FullscreenMediaGallery
          currentSlide={currentSlide}
          isOpen={isFullscreenMode}
          communityName={communityName}
          videos={this.formattedVideos}
          images={this.hdGalleryImages}
          onClose={onToggleFullscreenMode}
          ariaHideApp={ariaHideApp}
          onSlideChange={onSlideChange}
        />
      </section>
    );
  }
}
