import React from 'react';
import { storiesOf } from '@storybook/react';

import ClampedText from 'sly/web/components/atoms/ClampedText';

storiesOf('Atoms|ClampedText', module)
  .add('default', () => <ClampedText>{'hello world'.repeat(100)}</ClampedText>)
  .add('with title', () => <ClampedText title="hello world">{'hello world'.repeat(100)}</ClampedText>)
  .add('with size', () => <ClampedText size="title">{'hello world'.repeat(100)}</ClampedText>)
  .add('with palette', () => <ClampedText palette="danger">{'hello world'.repeat(100)}</ClampedText>)
  .add('with weight', () => <ClampedText weight="bold">{'hello world'.repeat(100)}</ClampedText>);
