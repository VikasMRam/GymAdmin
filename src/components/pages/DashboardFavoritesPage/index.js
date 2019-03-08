import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import styled from 'styled-components';

import { assetPath } from 'sly/components/themes';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import FormSection from 'sly/components/molecules/FormSection';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import Masonry from 'sly/components/common/masonry';

const columnCounts = [
  {
    from: 0,
    to: 767,
    count: 1,
  },
  {
    from: 768,
    to: 1283,
    count: 2,
  },
  {
    from: 1284,
    to: 1847,
    count: 3,
  },
  {
    from: 1848,
    to: 2559,
    count: 4,
  },
  {
    from: 2560,
    to: 5000,
    count: 5,
  },
];

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
      const { heading, placeholder, question } = generateAskAgentQuestionContents(name, city);
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
    const actionButtons = [
      {
        text: 'Ask Question',
        onClick: openAskAgentQuestionModal,
      },
    ];

    return (
      <CommunityTile
        addNote
        isFavourite
        currentSlide={currentSlide}
        onSlideChange={onSlideChange}
        key={userSave.id}
        community={userSave.community}
        actionButtons={actionButtons}
        note={userSave.info.note}
      />
    );
  }) : 'loading...';

  return (
    <DashboardPageTemplate>
      <FormSection heading="Favorites">
        <Masonry columnCounts={columnCounts}>
          {communityTiles}
        </Masonry>
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
