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

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${palette('grayscale', 0)};
  height: calc(${size('header.home.heroImage.mobileHeight')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('header.home.heroImage.height')};
  }
`;
const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
`;
const SearchBoxWrapper = styled.div`
  margin: auto;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('header.home.heroSearchBox.width')};
  }
`;
const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.regular')};
`;
const StyledLabel = styled(Label)`
  text-align: center;
  margin-bottom: ${size('spacing.large')};
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: ${size('spacing.xLarge')};
  }
  > *:last-child {
    margin-right: 0;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;
const ThreeColumnWrapper = ColumnWrapper.extend`
  > * {
    margin-right: ${size('spacing.xLarge')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > :nth-child(2n) {
      margin-right: 0;
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > :nth-child(3n) {
      margin-right: 0;
    }
  }
`;

const AgentsProfilePage = ({
  profiles, activeProfile, setModalProfile, onLocationSearch,
}) => {
  const agentsProfile = profiles.map(profile => (
    <ProfileTile profile={profile} onClick={() => setModalProfile(profile)} />
  ));
  // setModalProfile(profiles[0]);
  const HeaderContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer onLocationSearch={onLocationSearch} />
      <HeroWrapper>
        <StyledImage src={assetPath('images/our-history.png')} alt="A Home To Love" />
        <SearchBoxWrapper>
          <StyledHeading level="hero" size="hero" palette="white">
            Agents
          </StyledHeading>
          <StyledLabel palette="white">
            List of Agents
          </StyledLabel>
        </SearchBoxWrapper>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <BasePageTemplate
      header={HeaderContent}
      footer={<Footer />}
    >
      <StyledSection title="West Coast">
        <ThreeColumnWrapper>
          {agentsProfile}
        </ThreeColumnWrapper>
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
