import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardMyFamilyStickyFooter from 'sly/components/organisms/DashboardMyFamilyStickyFooter';

const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: action('Click Update Stage'),
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: action('Click Add Note'), ghost: true,
  },
];

const stageProps = {
  text: 'Connected - Discussing Options',
  currentStage: 1,
};

storiesOf('Organisms|DashboardMyFamilyStickyFooter', module)
  .add('default', () => (
    <DashboardMyFamilyStickyFooter options={options} stageProps={stageProps} />
  )).add('options List', () => (
    <DashboardMyFamilyStickyFooter options={options} stageProps={stageProps} showOptions />
  ));
