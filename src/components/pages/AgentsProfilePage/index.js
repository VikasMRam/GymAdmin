import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func, array } from 'prop-types';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';

import BasePageTemplate from 'sly/components/templates/BasePageTemplate';
import { Image, Label, Heading } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import ProfileTile from 'sly/components/molecules/ProfileTile';
import Footer from 'sly/components/organisms/Footer';
import Modal from 'sly/components/molecules/Modal';
import Section from 'sly/components/molecules/Section';

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
  position: absolute;
  top: 40%;

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

const StyledSection = styled(Section)`
  text-align: left;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const ContentTilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ContentTileWrapper = styled.div`
  margin-right: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    :nth-child(2n) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    :nth-child(2n) {
      margin-right: ${size('spacing.xLarge')};
    }
    :nth-child(3n) {
      margin-right: 0;
    }
  }
`;

const AgentsProfilePage = ({
  profiles, activeProfile, setModalProfile, onLocationSearch,
}) => {
  const agentsProfile = profiles.map(profile => (
    <ContentTileWrapper>
      <ProfileTile key={profile.id} profile={profile} onClick={() => setModalProfile(profile)} />
    </ContentTileWrapper>
  ));
  // setModalProfile(profiles[0]);
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/our-history.png')} alt="A Home To Love" />
        <FixedWidthContainer>
          <HeroTextWrapper>
            <HeroHeading level="hero" size="hero" palette="white">
              Agents
            </HeroHeading>
            <HeroSubheading palette="white">
              List of Agents
            </HeroSubheading>
          </HeroTextWrapper>
        </FixedWidthContainer>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Footer />}
    >
      <StyledSection title="West Coast">
        <ContentTilesWrapper>
          {agentsProfile}
        </ContentTilesWrapper>
      </StyledSection>
      <Modal layout="searchBox" closeable onClose={() => setModalProfile(null)} isOpen={activeProfile !== null}>
        {activeProfile && <ProfileTile profile={activeProfile} layout="modal" />}
      </Modal>
    </BasePageTemplate>
  );
};

AgentsProfilePage.propTypes = {
  profiles: array,
  activeProfile: object,
  onLocationSearch: func,
  setModalProfile: func,
};

export default AgentsProfilePage;
