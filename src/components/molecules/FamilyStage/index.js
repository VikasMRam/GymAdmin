import React from 'react';
import styled from 'styled-components';
import { func, string, number, bool } from 'prop-types';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import { size } from 'sly/components/themes';
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
  stageText, stageLevel, onAcceptClick, onRejectClick, snap, noBorderRadius,
}) => (
  <Box snap={snap} noBorderRadius={noBorderRadius}>
    <PaddedHeading size="body">Stage</PaddedHeading>
    <PaddedStage text={stageText} currentStage={stageLevel} />
    <MarginBottomFullWidthButton onClick={onAcceptClick}>Accept and contact this family</MarginBottomFullWidthButton>
    <FullWidthButton onClick={onRejectClick} palette="danger" ghost>Reject</FullWidthButton>
  </Box>
);

FamilyStage.propTypes = {
  stageText: string.isRequired,
  stageLevel: number.isRequired,
  onAcceptClick: func,
  onRejectClick: func,
  snap: string,
  noBorderRadius: bool,
};

export default FamilyStage;
