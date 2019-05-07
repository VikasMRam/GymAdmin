import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FamilyStage from 'sly/components/molecules/FamilyStage';
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';

const stageGroups = Object.keys(FAMILY_STAGE_ORDERED);
const newStage = FAMILY_STAGE_ORDERED[stageGroups[0]][0];
const fitem = FAMILY_STAGE_ORDERED[stageGroups[stageGroups.length - 1]];
const endStage = fitem[fitem.length - 1];
const interStage = FAMILY_STAGE_ORDERED[stageGroups[1]][1];

storiesOf('Molecules|FamilyStage', module)
  .add('default', () => (
    <FamilyStage
      stageText={newStage}
      onAcceptClick={action('onAcceptClick')}
      onRejectClick={action('onRejectClick')}
    />
  ))
  .add('intermediate stage', () => (
    <FamilyStage
      stageText={interStage}
      onUpdateClick={action('onUpdateClick')}
      onAddNoteClick={action('onAddNoteClick')}
    />
  ))
  .add('final stage', () => (
    <FamilyStage
      stageText={endStage}
      onUpdateClick={action('onUpdateClick')}
      onAddNoteClick={action('onAddNoteClick')}
    />
  ));
