import React, { Fragment } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, object } from 'prop-types';

import { size, assetPath, palette } from 'sly/web/components/themes';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { TemplateContent, TemplateHeader } from 'sly/web/components/templates/BasePageTemplate';
import { Image, Link, Block, Heading, Hr } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import HowItWorksInfoTile from 'sly/web/components/molecules/HowItWorksInfoTile';
import IconInfoTile from 'sly/web/components/molecules/IconInfoTile';
import { FAQ } from 'sly/web/services/helpers/howItWorks';
import FAQTile from 'sly/web/components/molecules/FAQTile';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

// Copied from BasePageTemplate
const FixedWidthContainer = styled.div`
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

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'base')};
  height: 40vh;
  max-height: ${size('layout.col5')};

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const HeroBackgroundImage = styled(ResponsiveImage)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 0;
  display: block;
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const HeroHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const HeroSubheading = styled(Block)`
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding-right: ${size('layout.col2')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding-right: ${size('layout.col6')};
  }
`;

const BlueBRWrapper = styled.div`
  background-color: ${palette('secondary', 'stroke')};
`;

const BottomWrapper = styled.div`
  padding: ${size('spacing.massive')} 0;
  margin: 0 auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
  }
`;

const FAQHr = styled(Hr)`
  margin: ${size('spacing.xxxLarge')} 0;
`;

// const TabsWrapper = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: inherit;

//   display: flex;
//   border: ${size('border.regular')} solid ${palette('secondary', 'stroke)};
//   border-radius: ${size('spacing.small')};
// `;

const Tab = styled(Link)`
  background-color: ${p => p.active ? palette('white', 'base') : palette('grey', 'stroke')};
  padding: ${size('spacing.xLarge')} 0;
  flex-grow: 1;
  font-size: ${size('spacing.subtitle')};
  font-weight: bold;
  text-align: center;
  color: ${p => p.active ? palette('slate', 'base') : palette('grey', 'base')};

  :hover {
    cursor: ${p => !p.active ? 'pointer' : ''};
  }
`;

const Header = ({ heroImageUrl, heading, subheading }) => (
  <>
    <HeaderContainer />
    <HeroWrapper>
      <HeroBackgroundImage path={heroImageUrl} loading="eager" alt="A Home To Love" aspectRatio={false} />
      <HeroTextWrapper>
        <FixedWidthContainer>
          <HeroHeading level="hero" size="hero" palette="white">
            {heading}
          </HeroHeading>
          <HeroSubheading size="subtitle" palette="white">
            {subheading}
          </HeroSubheading>
        </FixedWidthContainer>
      </HeroTextWrapper>
      {/* <TabsWrapper>
        {children}
      </TabsWrapper> */}
    </HeroWrapper>
  </>
);

Header.propTypes = {
  heroImageUrl: string,
  heading: string,
  subheading: string,
};

const ForFamiliesComponents = ({ contents }) => contents
  .map((content, index) => (
    <HowItWorksInfoTile
      key={content.heading}
      invert={index % 2 === 1}
      {...content}
    />
  ));

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.xxxLarge')};
`;

const CardsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${size('spacing.xxxLarge')};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
`;

const CardTiles = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }

  > * {
    margin-bottom: ${size('spacing.xLarge')};

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: calc(100% / 2 - ${size('spacing.xLarge')});
      margin-right: ${size('spacing.xLarge')};
    }
  }
`;

const Bottom = () => {
  return (
    <BlueBRWrapper>
      <FixedWidthContainer>
        <BottomWrapper>
          <StyledHeading>FAQ</StyledHeading>
          {FAQ.map((item, index) => (
            <Fragment key={item.question}>
              <FAQTile {...item} />
              {index !== FAQ.length - 1 &&
                <FAQHr />
              }
            </Fragment>
          ))}
        </BottomWrapper>
      </FixedWidthContainer>
      <Footer />
    </BlueBRWrapper>
  );
};

const HowItWorksDetailPage = ({
  heading,
  subheading,
  heroImageUrl,
  tabs,
  contents,
  cards,
  activeType,
}) => {
  const header = (
    <Header heroImageUrl={heroImageUrl} heading={heading} subheading={subheading}>
      {Object.entries(tabs)
        .map(([key, tab]) => {
          return (
            <Tab active={(key === activeType).toString()} key={key} to={tab.url}>
              {tab.tabText}
            </Tab>
          );
        })
      }
    </Header>
  );
  return (
    <>
      <TemplateHeader>{header}</TemplateHeader>
      <TemplateContent>
        <ForFamiliesComponents contents={contents} />
        <StyledHr />
        <CardsSection>
          <StyledHeading>Why Use Seniorly</StyledHeading>
          <CardTiles>
            {cards.map((item, index) => (
              <IconInfoTile
                key={index}
                {...item}
              />
            ))}
          </CardTiles>
        </CardsSection>
      </TemplateContent>
      <Bottom />
    </>
  );
};

HowItWorksDetailPage.propTypes = {
  heading: string,
  subheading: string,
  heroImageUrl: string,
  contents: arrayOf(object),
  cards: arrayOf(object),
  tabs: object,
  activeType: string,
  onLocationSearch: func,
};

export default HowItWorksDetailPage;

