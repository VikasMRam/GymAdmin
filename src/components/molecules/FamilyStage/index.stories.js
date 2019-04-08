import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FamilyStage from 'sly/components/molecules/FamilyStage';

storiesOf('Molecules|FamilyStage', module)
  .add('default', () => (
    <FamilyStage stageText="Prospecting - New" stageLevel={1} onAcceptClick={action('onAcceptClick')} onRejectClick={action('onRejectClick')} />
  ));
