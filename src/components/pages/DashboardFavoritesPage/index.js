import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import FormSection from 'sly/components/molecules/FormSection';
import CommunityTile from 'sly/components/organisms/CommunityTile';

const TileWrapper = styled.div`
  > * {
    margin-bottom: ${size('spacing.xLarge')};
  }

  > *:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > * {
      margin-bottom: 0;
    }

    display: grid;
    grid-template-columns: repeat(auto-fit, calc((50% + ${size('spacing.xLarge')}) / 2));
    grid-gap: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: repeat(auto-fill, calc(33.33% - ${size('spacing.xLarge')}));
  }
`;

const DashboardFavoritesPage = ({
  userSaves, onGallerySlideChange, currentGalleryImage, notifyInfo, showModal, hideModal,
}) => {
  const communityTiles = userSaves ? userSaves.map((userSave) => {
    const { community, id } = userSave;
    const onSlideChange = i => onGallerySlideChange(id, i);
    const currentSlide = currentGalleryImage[id];
    const openAskAgentQuestionModal = () => {
      const { addressString, name } = community;
      const [, city] = addressString.split(',');
      const heading = `Ask your Seniorly Partner Agent a question about ${name} in ${city}.`;
      const placeholder = `Hi Rachel, I have a question about ${name} in ${city}...`;
      const question = `Hi, I need .... and am interested in knowing whether ${name} has ...`;
      const agentImageUrl = assetPath('images/agent-xLarge.png');

      const toggleAskAgentQuestionModal = () => {
        hideModal();
      };

      const modalComponentProps = {
        toggleAskAgentQuestionModal,
        notifyInfo,
        community,
        heading,
        agentImageUrl,
        placeholder,
        question,
      };

      showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />);
    };

    return (
      <CommunityTile
        addNote
        isFavourite
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        key={userSave.id}
        community={userSave.community}
        actionButtons={['ask-question']}
        note={userSave.info.note}
        onAskQuestionClick={openAskAgentQuestionModal}
      />
    );
  }) : 'loading...';

  return (
    <DashboardPageTemplate>
      <FormSection heading="Favorites">
        <TileWrapper>
          {communityTiles}
        </TileWrapper>
      </FormSection>
    </DashboardPageTemplate>
  );
};

DashboardFavoritesPage.propTypes = {
  userSaves: arrayOf(object),
  onGallerySlideChange: func,
  currentGalleryImage: object,
  notifyInfo: func,
  showModal: func,
  hideModal: func,
};

export default DashboardFavoritesPage;
