import React from 'react';
import { arrayOf, object, func } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
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
