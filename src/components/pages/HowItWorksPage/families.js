import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading, Hr } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Footer from 'sly/components/organisms/Footer';
import HowItWorksInfoTile from 'sly/components/molecules/HowItWorksInfoTile';
import { ForFamilies, secondContents, FAQ } from 'sly/services/helpers/how_it_works';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import FAQTile from 'sly/components/molecules/FAQTile';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('grayscale', 0)};
  height: calc(${size('header.home.heroImage.mobileHeight')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
  }
`;
const HeroBackgroundImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const HeroTextWrapper = styled.div`
  margin: auto;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const HeroHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;
const HeroSubheading = styled(Label)`
  margin-bottom: ${size('spacing.large')};
`;

const SecondContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondContentHeading = styled.div`
  margin: 0 auto;
  font-size: 30px;
  margin-bottom: ${size('spacing.xLarge')};
`;

const SecondContentTilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SecondContentTileWrapper = styled.div`
  width: ${size('picture.xLarge.width')};
  margin-right: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};

  :nth-child(2n){
    margin-right: 0;
  }
`;

const BlueBRWrapper = styled.div`
  background-color: #E1EAEF;
`;

// Copied from BasePageTemplate
const FixedWidthContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 72px;
  padding-bottom: 24px;
`;

const BottomHeading = styled.div`
  font-size: 30px;
  margin: 0 auto;
`;

const FAQTilesWrapper = styled.div`

`;

const FAQTileWrapper = styled.div`
  margin: 0 180px;
`;

const HowIt = ({ heading, subheading, onLocationSearch }) => {
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/home/cover4.jpg')} alt="A Home To Love" />
        <HeroTextWrapper>
          <HeroHeading level="hero" size="hero" palette="white">
            {heading}
          </HeroHeading>
          <HeroSubheading palette="white">
            {subheading}
          </HeroSubheading>
        </HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );

  const ForFamiliesComponents = ForFamilies.map((content, index) => {
    const invert = index % 2 === 1;
    return (<HowItWorksInfoTile {...content} invert={invert} />);
  });

  const secondContentTiles = secondContents.map((item) => {
    return (
      <SecondContentTileWrapper key={item.heading} >
        <IconInfoTile {...item} />
      </SecondContentTileWrapper>
    );
  });

  const faqTiles = FAQ.map((item, index) => {
    return (
      <FAQTileWrapper key={item.question} >
        <FAQTile {...item} />
        {index !== FAQ.length - 1 && <Hr />}
      </FAQTileWrapper>
    );
  });

  const Bottom = () => {
    return (
      <BlueBRWrapper>
        <FixedWidthContainer>
          <BottomWrapper>
            <BottomHeading>FAQ</BottomHeading>
            <FAQTilesWrapper>{faqTiles}</FAQTilesWrapper>
          </BottomWrapper>
        </FixedWidthContainer>
        <Footer />
      </BlueBRWrapper>
    );
  };

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Bottom />}
    >
      {ForFamiliesComponents}
      <Hr />
      <SecondContentWrapper>
        <SecondContentHeading>Why Use Seniorly</SecondContentHeading>
        <SecondContentTilesWrapper>{secondContentTiles}</SecondContentTilesWrapper>
      </SecondContentWrapper>
    </BasePageTemplate>
  );
};

HowIt.propTypes = {
  heading: string,
  subheading: string,
  onLocationSearch: func,
};

export default HowIt;
