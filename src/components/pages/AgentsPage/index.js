import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';

import { size, assetPath, palette } from 'sly/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Link, Image, Block, Heading, Hr, Icon } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import ProfileTile from 'sly/components/molecules/ProfileTile';
import Footer from 'sly/components/organisms/Footer';
import Modal from 'sly/components/molecules/Modal';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: assetPath('images/cities/LosAngeles.jpeg'),
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: assetPath('images/cities/SanDiego.jpeg'),
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
  {
    to: '/assisted-living/texas/dallas',
    image: assetPath('images/cities/Dallas.jpeg'),
    subtitle: 'Dallas, TX',
    title: '90+ communities',
  },
  {
    to: '/assisted-living/texas/houston',
    image: assetPath('images/cities/Houston.jpeg'),
    subtitle: 'Houston, TX',
    title: '72+ communities',
  },
  {
    to: '/assisted-living/arizona/phoenix',
    image: assetPath('images/cities/Pheonix.jpeg'),
    subtitle: 'Phoenix, AZ',
    title: '151+ communities',
  },
  {
    to: '/assisted-living/florida/orlando',
    image: assetPath('images/cities/Orlando.jpeg'),
    subtitle: 'Orlando, FL',
    title: '60+ communities',
  },
  {
    to: '/assisted-living/florida/miami',
    image: assetPath('images/cities/Miami.jpeg'),
    subtitle: 'Miami, FL',
    title: '150+ communities',
  },
];

const StyledLink = styled(Link)`
  display: block;
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

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('slate', 'base')};
  height: calc(${size('header.agents.heroImage.height')});

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const HeroBackgroundImage = styled(Image)`
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

const StyledSection = styled(Section)`
  text-align: left;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  > * {
    margin-bottom: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex-direction: row;

    > * {
      width: ${size('layout.col4')};
    }
  }
`;

const MSCColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > *:nth-child(odd) {
      margin-right: ${size('spacing.xLarge')};
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(4n) {
      margin-right: 0;
    }
  }
`;

const AgentsPage = ({
  activeProfile, setModalProfile,
}) => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agent-hero.png')} alt="A Home To Love" />
        <HeroTextWrapper>
          <FixedWidthContainer>
            <HeroHeading level="hero" size="hero" palette="white">
              Our Seniorly Guides
            </HeroHeading>
            <HeroSubheading palette="white" size="subtitle">
              We partner with local senior living experts across the country.  These local experts help thousands of families every year.
            </HeroSubheading>
          </FixedWidthContainer>
        </HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );
  const mostSearchedCitiesComponents = mostSearchedCities.map(mostSearchedCity => (
    <StyledLink key={mostSearchedCity.title} to={mostSearchedCity.to}>
      <ImageOverlayContentTile size="small" image={mostSearchedCity.image}>
        <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
        <Block palette="white">{mostSearchedCity.title}</Block>
      </ImageOverlayContentTile>
    </StyledLink>
  ));

  return (
    <Fragment>
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection title="Why should I work with an agent?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="Service from start to finish" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Expert negotiators" content="We don't sell leads. Instead, your profile and reviews are displayed on Seniorly.com, so families can choose you as their agent when they are ready to make a move." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Service from start to finish" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business." />
          </ColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection title="Most Searched Cities">
          <MSCColumnWrapper>
            {mostSearchedCitiesComponents}
          </MSCColumnWrapper>
        </StyledSection>
        <Modal layout="single" closeable onClose={() => setModalProfile(null)} isOpen={activeProfile !== null}>
          {activeProfile && <ProfileTile profile={activeProfile} layout="modal" />}
        </Modal>
      </TemplateContent>
      <Footer />
    </Fragment>
  );
};

AgentsPage.propTypes = {
  activeProfile: object,
  setModalProfile: func,
};

export default AgentsPage;
