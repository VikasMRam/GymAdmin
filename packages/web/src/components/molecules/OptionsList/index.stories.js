import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OptionsList from 'sly/components/molecules/OptionsList';

const options = [
  {
    text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: action('Click Update Stage'),
  },
  {
    text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: action('Click Add Note'),
  },
];

storiesOf('Molecules|OptionsList', module)
  .add('default', () => (
    <OptionsList options={options} />
  ));
