import React from 'react';
import { storiesOf } from '@storybook/react';

import Badge from 'sly/common/components/atoms/Badge';

storiesOf('Common/Atoms/Badge', module)
  .add('default', () => <Badge>New</Badge>)
  .add('with size and weight', () => <Badge size="subtitle" weight="bold">New</Badge>)
  .add('with borderRadius', () => <Badge borderRadius="small">New</Badge>)
  .add('with palette', () => <Badge palette="danger">New</Badge>)
  .add('with background and palette', () => <Badge background="danger" palette="white">New</Badge>)
  .add('with background, variation and palette',
    () => <Badge background="danger" backgroundVariation="filler" palette="grey">New</Badge>);
