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
  background-color: ${palette('slate', 0)};
  height: calc(${size('header.home.heroImage.mobileHeight')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
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
  margin-bottom: ${size('spacing.huge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }
`;

const StyledProfileTile = styled(ProfileTile)`
margin-bottom: ${size('spacing.xLarge')};

@media screen and (min-width: ${size('breakpoint.tablet')}) {
  width: calc(100% / 2 - ${size('spacing.xLarge')});
  margin-right: ${size('spacing.xLarge')};
}

@media screen and (min-width: ${size('breakpoint.laptop')}) {
  width: calc(100% / 3 - ${size('spacing.xLarge')});
}
`;

const AgentsProfilePage = ({
  regionProfiles, activeProfile, setModalProfile, onLocationSearch,
}) => {
  const agentsSectionComponents = Object.keys(regionProfiles).map((region) => {
    const agentsProfile = regionProfiles[region].map(profile => (
      <StyledProfileTile key={profile.id} profile={profile} onClick={() => setModalProfile(profile)} />
    ));
    return (
      <StyledSection title={region}>
        <ContentTilesWrapper>
          {agentsProfile}
        </ContentTilesWrapper>
      </StyledSection>
    );
  });
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <HeroBackgroundImage src={assetPath('images/agent-hero.jpg')} alt="A Home To Love" />
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
      {agentsSectionComponents}
      <Modal layout="single" closeable onClose={() => setModalProfile(null)} isOpen={activeProfile !== null}>
        {activeProfile && <ProfileTile profile={activeProfile} layout="modal" />}
      </Modal>
    </BasePageTemplate>
  );
};

AgentsProfilePage.propTypes = {
  regionProfiles: object,
  activeProfile: object,
  onLocationSearch: func,
  setModalProfile: func,
};

export default AgentsProfilePage;
