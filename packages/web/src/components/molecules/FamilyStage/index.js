import React from 'react';
import styled from 'styled-components';
import { func, string, bool } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { size } from 'sly/common/components/themes';
import clientPropType from 'sly/common/propTypes/client';
import userPropType from 'sly/common/propTypes/user';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import { PROVIDER_ENTITY_TYPE_ORGANIZATION } from 'sly/web/constants/provider';
import { TOTAL_STAGES_COUNT, FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/web/constants/familyDetails';
import { userIs } from 'sly/web/services/helpers/role';
import { getStageDetails } from 'sly/web/services/helpers/stage';
import { Box, Heading, Button } from 'sly/web/components/atoms';
import Stage from 'sly/web/components/molecules/Stage';

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
  user, client,
}) => {
  const { group, palette, stage } = getStageDetails(stageText);
  let showAcceptRejectButtons = stage === FAMILY_STAGE_NEW;
  let showUpdateStageButton = stage !== FAMILY_STAGE_NEW;
  let showAddNoteButton = stage !== FAMILY_STAGE_NEW;
  let disableAddNoteUpdateButton = stage === FAMILY_STAGE_REJECTED;
  let showClaimReferralButton = false;
  const text = group ? `${group} - ${stageText}` : stageText;
  const { provider } = client;
  const { organization } = user;
  const { entityType, id: providerOrg } = provider;
  const { id: userOrg } = organization;
  if (stage === FAMILY_STAGE_NEW &&
    (entityType === PROVIDER_ENTITY_TYPE_ORGANIZATION && userOrg === providerOrg)) {
    showUpdateStageButton = true;
    showAcceptRejectButtons = false;
    disableAddNoteUpdateButton = false;
  }
  if (userIs(user, PLATFORM_ADMIN_ROLE)) {
    disableAddNoteUpdateButton = false;
    if (stage === FAMILY_STAGE_NEW) {
      showClaimReferralButton = true;
      showUpdateStageButton = false;
      showAcceptRejectButtons = false;
      showAddNoteButton = true;
    }
  }

  return (
    <Box snap={snap} noBorderRadius={noBorderRadius}>
      <PaddedHeading size="body">Stage</PaddedHeading>
      <PaddedStage stage={stageText} stageLabel={text} totalStage={TOTAL_STAGES_COUNT} palette={palette} />
      {showAcceptRejectButtons && <MarginBottomFullWidthButton onClick={onAcceptClick}>Accept and contact this family</MarginBottomFullWidthButton>}
      {showAcceptRejectButtons && <FullWidthButton onClick={onRejectClick} palette="danger" ghost>Reject</FullWidthButton>}
      {showClaimReferralButton && <MarginBottomFullWidthButton onClick={onAcceptClick}>Claim Referral</MarginBottomFullWidthButton>}
      {showUpdateStageButton && <MarginBottomFullWidthButton onClick={onUpdateClick} disabled={disableAddNoteUpdateButton}>Update stage</MarginBottomFullWidthButton>}
      {showAddNoteButton && <FullWidthButton onClick={onAddNoteClick} disabled={disableAddNoteUpdateButton} ghost>Add note</FullWidthButton>}
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
  user: userPropType.isRequired,
  client: clientPropType.isRequired,
};

export default FamilyStage;
