import React from 'react';
import styled from 'styled-components';
import { func, string, bool } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import { size } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { TOTAL_STAGES_COUNT } from 'sly/constants/familyDetails';
import { Box, Heading, Button } from 'sly/components/atoms';
import Stage from 'sly/components/molecules/Stage';
import userPropType from 'sly/propTypes/user';
import clientPropType from 'sly/propTypes/client';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';

const ColumWrapper = pad(styled.div`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: ${size('tabletLayout.gutter')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-column-gap: ${size('layout.gutter')};
  }
`, 'large');
ColumWrapper.displayName = 'ColumWrapper';

const PaddedHeading = pad(Heading, 'large');
const PaddedStage = pad(Stage, 'xLarge');
PaddedStage.displayName = 'PaddedStage';
const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';
const MarginBottomFullWidthButton = pad(FullWidthButton, 'regular');
MarginBottomFullWidthButton.displayName = 'MarginBottomFullWidthButton';

const FamilyStage = ({
  stageText, onAcceptClick, onRejectClick, snap, noBorderRadius, onAddNoteClick, onUpdateClick, client, user,
}) => {
  const stageDetails = getStageDetails(stageText);

  let {
    showAcceptRejectButtons, showUpdateAddNoteButtons, disableAddNoteButton, disableUpdateButton,
  } = stageDetails;

  const {
    levelGroup, palette,
  } = stageDetails;
  const { provider } = client;
  const { entityType, id: proOrg } = provider;
  const { roleID, organization } = user;
  const { id: userOrg } = organization;
  /* eslint-disable-next-line no-bitwise */
  if ((PLATFORM_ADMIN_ROLE & roleID) || (entityType === 'Organization' && userOrg === proOrg)) {
    [showAcceptRejectButtons, showUpdateAddNoteButtons, disableAddNoteButton, disableUpdateButton] = [false, true, false, false];
  }
  let text = 'Unknown';
  if (levelGroup) {
    text = `${levelGroup} - ${stageText}`;
  }

  return (
    <Box snap={snap} noBorderRadius={noBorderRadius}>
      <PaddedHeading size="body">Stage</PaddedHeading>
      <PaddedStage stage={stageText} stageLabel={text} totalStage={TOTAL_STAGES_COUNT} palette={palette} />
      {showAcceptRejectButtons && <MarginBottomFullWidthButton onClick={onAcceptClick}>Accept and contact this family</MarginBottomFullWidthButton>}
      {showAcceptRejectButtons && <FullWidthButton onClick={onRejectClick} palette="danger" ghost>Reject</FullWidthButton>}
      {showUpdateAddNoteButtons && <MarginBottomFullWidthButton onClick={onUpdateClick} disabled={disableUpdateButton}>Update stage</MarginBottomFullWidthButton>}
      {showUpdateAddNoteButtons && <FullWidthButton onClick={onAddNoteClick} disabled={disableAddNoteButton} ghost>Add note</FullWidthButton>}
    </Box>
  );
};

FamilyStage.propTypes = {
  stageText: string.isRequired,
  onAcceptClick: func,
  onRejectClick: func,
  onUpdateClick: func,
  onAddNoteClick: func,
  snap: string,
  noBorderRadius: bool,
  client: clientPropType,
  user: userPropType,
};

export default FamilyStage;
