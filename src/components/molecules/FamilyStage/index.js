import React from 'react';
import styled from 'styled-components';
import { func, string, bool } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import { size } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { TOTAL_STAGES_COUNT } from 'sly/constants/familyDetails';
import { Box, Heading, Button } from 'sly/components/atoms';
import Stage from 'sly/components/atoms/Stage';

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
  stageText, onAcceptClick, onRejectClick, snap, noBorderRadius, onAddNoteClick, onUpdateClick,
}) => {
  const {
    level, levelGroup, palette, showAcceptRejectButtons, showUpdateAddNoteButtons, disableAddNoteButton,
  } = getStageDetails(stageText);
  let text = 'Unknown';
  if (levelGroup) {
    text = `${levelGroup} - ${stageText}`;
  }

  return (
    <Box snap={snap} noBorderRadius={noBorderRadius}>
      <PaddedHeading size="body">Stage</PaddedHeading>
      <PaddedStage text={text} currentStage={level} totalStage={TOTAL_STAGES_COUNT} palette={palette} />
      {showAcceptRejectButtons && <MarginBottomFullWidthButton onClick={onAcceptClick}>Accept and contact this family</MarginBottomFullWidthButton>}
      {showAcceptRejectButtons && <FullWidthButton onClick={onRejectClick} palette="danger" ghost>Reject</FullWidthButton>}
      {showUpdateAddNoteButtons && <MarginBottomFullWidthButton onClick={onUpdateClick}>Update stage</MarginBottomFullWidthButton>}
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
};

export default FamilyStage;
