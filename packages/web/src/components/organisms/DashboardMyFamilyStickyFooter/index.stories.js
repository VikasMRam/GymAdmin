import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardMyFamilyStickyFooter from 'sly/web/components/organisms/DashboardMyFamilyStickyFooter';

const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: action('Click Update Stage'),
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: action('Click Add Note'), ghost: true,
  },
];

const stageProps = {
  stage: 'Discussing Options',
  stageLabel: 'Connected - Discussing Options',
  onOptionsClick: action('onOptionsClick'),
};

storiesOf('Organisms|DashboardMyFamilyStickyFooter', module)
  .add('default', () => (
    <DashboardMyFamilyStickyFooter options={options} {...stageProps} />
  ));
