import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BoxChoiceTile from 'sly/components/atoms/BoxChoiceTile';

storiesOf('Atoms|BoxChoiceTile', module)
  .add('default', () => <BoxChoiceTile onClick={action('clicked')} label="click me" />)
  .add('selected', () => <BoxChoiceTile onClick={action('clicked')} label="click me" selected />)
  .add('with hasCheckbox', () => <BoxChoiceTile hasCheckbox onClick={action('clicked')} label="click me" />)
  .add('with hasCheckbox and selected', () => <BoxChoiceTile hasCheckbox onClick={action('clicked')} label="click me" selected />);
