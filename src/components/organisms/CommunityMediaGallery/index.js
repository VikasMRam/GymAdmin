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
const morePicButton = styled(Button)`
  left: ${size('spacing.large')};
  bottom: ${size('spacing.xLarge')};
  position: absolute;
  z-index: 4;
`;
const MorePicsTablet = styled(morePicButton)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: initial;
  }
`;
const MorePicsMobile = styled(morePicButton)`
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
  };

  state = {
    fullscreen: false,
    currentFullscreenSlide: 0,
  };

  onPlayClicked = (slide) => {
    if (this.sdGalleryImages[slide].ofVideo !== undefined) {
      this.setState({
        currentFullscreenSlide: slide,
        fullscreen: true,
      });
    }
  };

  toggleModal = () => {
    const { fullscreen } = this.state;
    this.setState({
      fullscreen: !fullscreen,
    });
  };

  render() {
    const { communityName, images, videos } = this.props;
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
      return { ...vid, src: vid.url, thumb: vid.thumbUrl };
    });
    const topRightSection = (
      <span>
        <StyledButton ghost palette="slate"><Icon icon="heart" size="regular" palette="slate" /></StyledButton>
        <StyledButton ghost palette="slate"><Icon icon="share" size="regular" palette="slate" /></StyledButton>
      </span>
    );
    const bottomLeftSection = (
      <span>
        <MorePicsTablet ghost palette="slate" transparent={false} onClick={this.toggleModal}>See {this.sdGalleryImages.length - 1} more pictures</MorePicsTablet>
        <MorePicsMobile ghost palette="slate" transparent={false} onClick={this.toggleModal}>View pictures</MorePicsMobile>
      </span>
    );

    return (
      <section id="media-gallery">
        <MediaGallery
          onPlayClicked={this.onPlayClicked}
          communityName={communityName}
          images={this.sdGalleryImages}
          topRightSection={topRightSection}
          bottomLeftSection={bottomLeftSection}
        />
        <FullscreenMediaGallery
          currentSlide={this.state.currentFullscreenSlide}
          isOpen={this.state.fullscreen}
          communityName={communityName}
          videos={this.formattedVideos}
          images={this.hdGalleryImages}
          onClose={this.toggleModal}
        />
      </section>
    );
  }
}
