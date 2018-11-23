import React from 'react';
import { storiesOf } from '@storybook/react';

import IconListItem from 'sly/components/molecules/IconListItem';

const item = { icon: 'favourite-light', text: '100% free. They do not charge you.' };

storiesOf('Molecules|IconListItem', module)
  .add('default', () => <IconListItem {...item} />);
