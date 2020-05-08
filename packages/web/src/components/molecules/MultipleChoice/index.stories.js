import React from 'react';
import { storiesOf } from '@storybook/react';

import MultipleChoice from 'sly/components/molecules/MultipleChoice';

const options = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];

storiesOf('Molecules|MultipleChoice', module)
  .add('default', () => (
    <MultipleChoice options={options} value={['third']} />
  ))
  .add('orientation vertical', () => (
    <MultipleChoice orientation="vertical" options={options} value={['third']} />
  ))
  .add('type singlechoice', () => (
    <MultipleChoice type="singlechoice" options={options} />
  ))
  .add('type buttonlist', () => (
    <MultipleChoice type="buttonlist" orientation="vertical" options={options} />
  ))
  .add('type buttonlist jumbo', () => (
    <MultipleChoice type="buttonlist" buttonKind="jumbo" orientation="vertical" options={options} />
  ));
