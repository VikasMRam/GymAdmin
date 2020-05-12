import React from 'react';
import { storiesOf } from '@storybook/react';

import IconItem from 'sly/web/components/molecules/IconItem';

storiesOf('Molecules|IconItem', module)
  .add('default', () => <IconItem icon="favourite-light">100% free. They do not charge you.</IconItem>)
  .add('with border', () => <IconItem borderless={false} icon="check">Hospice Waiver</IconItem>)
  .add('with border and Not Present', () => <IconItem borderless={false} icon="close" iconPalette="grey" textVariation="filler">Medication Management</IconItem>)
  .add('with border and Unknown', () => <IconItem borderless={false} icon="unknown" iconPalette="grey" textVariation="filler">Rehabilitation Program</IconItem>);
