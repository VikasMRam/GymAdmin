import React from 'react';
import styled from 'styled-components';
import { string, func, bool } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { ResponsiveImage, Label, Heading, Link } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import BannerNotification from 'sly/components/molecules/BannerNotification';

const HeroWrapper = styled.div`
  position: relative;
  height: ${size('header.hub.heroImage.mobileHeight')};
  background-color: ${palette('secondary', 'dark35')};
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.hub.heroImage.height')};
    flex-direction: row-reverse;
  }
`;

const ImageWrapper = styled.div`
  flex: 1 0 0%;
  text-align:right;
  &:after {
    content: '';
    position: absolute;
    left:0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #387F7Eff 50%, #387F7E00);
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    &:after {
      content: '';
      position: absolute;
      left:0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #49A7A5ff 50%, #49A7A500);
    }
  }
`;

const StyledImage = styled(ResponsiveImage)`
  object-fit: cover;
  vertical-align:top;
  width: 100%;
  height: 100%;
`;

const CTAWrapper = styled.div`
  flex: 1 0 0%;
  margin: auto 0;
`;
const SearchBoxWrapper = styled.div`
  max-width: ${size('header.hub.heroSearchBox.width')};
  margin: 0 auto;
  transform: rotate(0);
  text-align: left;
  align-items: left;
  justify-content: left;
`;
const AuditWrapper = styled.div`
   background-color: ${palette('grey', 'stroke')};
   padding: ${size('spacing.large')};
   margin-bottom: ${size('spacing.large')};
`;

const AuditTextWrapper = styled.div`
  margin: auto;
  width: 100%;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col9')};

    > section {
      width: ${size('tabletLayout.col8')};
      margin: auto;
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};

    > section {
      width: auto;
      margin: auto;
    }
  }
`;

const StyledIconItem = styled(IconItem)`
  width: 100%;
  line-height: ${size('lineHeight.body')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: ${size('layout.col8')};
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;
const StyledLabel = styled(Label)`
  margin-bottom: ${size('spacing.small')};
`;

const HubHeader = ({
  imagePath,
  toc,
  heading,
  label,
  onCurrentLocation,
  onLocationSearch,
  showSearch,
}) => (
  <>
    <HeaderContainer />
    <BannerNotification palette="warning">
      <Link href="https://www.seniorly.com/resources/articles/coronavirus-and-seniors-a-message-from-our-ceo-co-founder-arthur-bretschneider" _target="blank">
        Coronavirus & Seniors: A Message from Arthur Bretschneider, CEO & Co-founder: Click Here.
      </Link>
    </BannerNotification>
    <HeroWrapper>
      <ImageWrapper>
        <StyledImage path={imagePath} alt={heading} height={320} />
      </ImageWrapper>
      <CTAWrapper>
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            {heading}
          </StyledHeading>
          <StyledLabel palette="white">
            {label}
          </StyledLabel>
          {showSearch &&
            <SearchBoxContainer onCurrentLocation={onCurrentLocation} layout="homeHero" onLocationSearch={onLocationSearch} />
          }
        </SearchBoxWrapper>
      </CTAWrapper>
    </HeroWrapper>
    <AuditWrapper>
      <AuditTextWrapper>
        <StyledIconItem
          icon="verified"
          iconPalette="secondary"
          iconVariation="dark35"
          borderless
        >
          This {toc} article has been reviewed and approved by{' '}
          <Link to="https://www.seniorly.com/resources/author/jim+mc+cabe" >Jim McCabe, PhD, MSW, MPH, President - Eldercare Resources</Link>
        </StyledIconItem>
      </AuditTextWrapper>
    </AuditWrapper>
  </>
);

HubHeader.propTypes = {
  imagePath: string.isRequired,
  toc: string.isRequired,
  heading: string.isRequired,
  label: string,
  onLocationSearch: func,
  onCurrentLocation: func,
  showSearch: bool,
};

HubHeader.defaultProps = {
  showSearch: true,
};

export default HubHeader;
