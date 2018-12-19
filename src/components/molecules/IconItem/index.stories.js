import React from 'react';
import { storiesOf } from '@storybook/react';

import IconItem from 'sly/components/molecules/IconItem';

const item = { icon: 'favourite-light', text: '100% free. They do not charge you.' };

storiesOf('Molecules|IconItem', module)
  .add('default', () => <IconItem icon={item.icon}>{item.text}</IconItem>);
