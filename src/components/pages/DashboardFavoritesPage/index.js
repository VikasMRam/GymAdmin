import React from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
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

const DashboardFavoritesPage = ({ userSaves }) => {
  const communityTiles = userSaves ? userSaves.map(userSave =>
    <CommunityTile addNote isFavourite key={userSave.id} community={userSave.community} actionButtons={['ask-question']} note={userSave.info.note} />) : 'loading...';

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
};

export default DashboardFavoritesPage;
