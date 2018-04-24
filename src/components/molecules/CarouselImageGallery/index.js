import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { palette } from 'styled-theme';
import SwipeableViews from 'react-swipeable-views';

import { size } from 'sly/components/themes';
import { Button, Icon } from 'sly/components/atoms';

const Wrapper = styled.section`
  overflow: hidden;
  position: relative;
  background: ${palette('grayscale', 1)};
  height: ${size('carousel.mobile')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('carousel.tablet')};
  }
`;
const StyledImg = styled.img`
  pointer-events: none;
  width: 100%;
  object-fit: cover;
  vertical-align: middle;
  // set max-height as we have images that are in different aspect ratios
  max-height: ${size('carousel.mobile')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-height: ${size('carousel.tablet')};
  }
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
const TopActionWrapper = styled.div`
  right: ${size('spacing.large')};
  top: ${size('spacing.xLarge')};
  position: absolute;
  z-index: 4;

  Button {
    margin-left: ${size('spacing.large')};
  }
`;
const StyledButton = styled(Button)`
  padding: 0 ${size('spacing.regular')};
`;

export default class CarouselImageGallery extends React.Component {
  static propTypes = {
    propertyName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      hd: PropTypes.string.isRequired,
      sd: PropTypes.string.isRequired,
      thumb: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    images: [],
  };

  state = {
    index: 0,
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  nextSlide = () => {
    const { index } = this.state;
    const numItems = this.props.images.length;
    this.handleChangeIndex(index === numItems - 1 ? 0 : index + 1);
  }

  prevSlide = () => {
    const { index } = this.state;
    const numItems = this.props.images.length;
    this.handleChangeIndex(index === 0 ? numItems - 1 : index - 1);
  }

  render() {
    return (
      <Wrapper>
        <PrevSlide icon="chevron-left" size="large" palette="white" onClick={this.prevSlide} />
        <TopActionWrapper>
          <StyledButton ghost palette="slate"><Icon icon="heart" size="regular" palette="slate" /></StyledButton>
          <StyledButton ghost palette="slate"><Icon icon="share" size="regular" palette="slate" /></StyledButton>
        </TopActionWrapper>
        <SwipeableViews enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
          {this.props.images.map((image, i) => (
            <StyledImg
              key={i}
              src={image.sd}
              alt={`${this.props.propertyName} ${i + 1}`}
            />
          ))}
        </SwipeableViews>
        <NextSlide icon="chevron-right" size="large" palette="white" onClick={this.nextSlide} />
        <MorePicsTablet ghost palette="slate" transparent={false}>See {this.props.images.length - 1} more pictures</MorePicsTablet>
        <MorePicsMobile ghost palette="slate" transparent={false}>View pictures</MorePicsMobile>
      </Wrapper>
    );
  }
}
