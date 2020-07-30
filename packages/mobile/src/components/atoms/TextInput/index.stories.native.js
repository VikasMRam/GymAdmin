import React from 'react';
import { storiesOf } from '@storybook/react-native';

import TextInput from '.';

storiesOf('Atoms|TextInput', module)
  .add('default', () => <TextInput />)
  .add('placeholder', () => <TextInput placeholder="Input some text" />)
  .add('placeholder and size', () => <TextInput placeholder="Input some text" size="xLarge" />)
  .add('disabled', () => <TextInput value="hello world" disabled />)
  .add('invalid', () => <TextInput invalid />)
  .add('invalid placeholder', () => <TextInput invalid placeholder="Input some text" />)
  .add('warning', () => <TextInput warning />)
  .add('warning placeholder', () => <TextInput warning placeholder="Input some text" />)
  .add('type textarea', () => <TextInput type="textarea" />)
  .add('type textarea and rows', () => <TextInput type="textarea" rows={6} />);
