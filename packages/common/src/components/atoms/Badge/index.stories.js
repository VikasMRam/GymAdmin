import React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from '.';

storiesOf('Common|Atoms/Badge', module)
  .add('default', () => <Badge>New</Badge>)
  .add('size and weight', () => <Badge size="subtitle" weight="bold">New</Badge>)
  .add('borderRadius', () => <Badge borderRadius="small">New</Badge>)
  .add('palette', () => <Badge palette="danger">New</Badge>)
  .add('padding', () => <Badge padding={['xLarge', 'xLarge']}>New</Badge>)
  .add('one padding', () => <Badge padding="large">New</Badge>)
  .add('background and palette', () => <Badge background="danger" palette="white">New</Badge>)
  .add('background, variation and palette', () => (
    <Badge background="danger" backgroundVariation="filler" palette="grey">
      New
    </Badge>
  ));
