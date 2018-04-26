import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Button, Icon } from 'sly/components/atoms';
import ImageGallery from 'sly/components/molecules/ImageGallery';
import FullscreenImageGallery from 'sly/components/molecules/FullscreenImageGallery';

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

export default class MediaGallery extends React.Component {
  static propTypes = {
    communityName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      sd: PropTypes.string.isRequired,
      hd: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
  };

  state = {
    fullscreen: false,
  };

  toggleModal = () => {
    const { fullscreen } = this.state;
    this.setState({
      fullscreen: !fullscreen,
    });
  };

  render() {
    const { communityName, images } = this.props;
    const sdGalleryImages = images.map((img, i) => {
      const newImg = img;
      newImg.src = img.sd;
      newImg.alt = `${communityName} ${i + 1}`;
      return newImg;
    });
    const hdGalleryImages = images.map((img, i) => {
      const newImg = img;
      newImg.src = img.hd;
      newImg.alt = `${communityName} ${i + 1}`;
      return newImg;
    });
    const topRightSection = (
      <span>
        <StyledButton ghost palette="slate"><Icon icon="heart" size="regular" palette="slate" /></StyledButton>
        <StyledButton ghost palette="slate"><Icon icon="share" size="regular" palette="slate" /></StyledButton>
      </span>
    );
    const bottomLeftSection = (
      <span>
        <MorePicsTablet ghost palette="slate" transparent={false} onClick={this.toggleModal}>See {this.props.images.length - 1} more pictures</MorePicsTablet>
        <MorePicsMobile ghost palette="slate" transparent={false} onClick={this.toggleModal}>View pictures</MorePicsMobile>
      </span>
    );

    return (
      <section id="media-gallery">
        <ImageGallery communityName={communityName} images={sdGalleryImages} topRightSection={topRightSection} bottomLeftSection={bottomLeftSection} />
        <FullscreenImageGallery isOpen={this.state.fullscreen} communityName={communityName} images={hdGalleryImages} onClose={this.toggleModal} />
      </section>
    );
  }
}
