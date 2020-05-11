import React from 'react';
import { storiesOf } from '@storybook/react';

import IconInfoTile from 'sly/components/molecules/IconInfoTile';

const props = {
  icon: 'search',
  heading: 'Open Local Search Platform',
  content: `We provide the most comprehensive, unbiased information on
    senior housing and care without requiring personal data to access. Our
    service is 100% free for families and we list information on all
    available communities regardless if we have a commercial relationship with them.`,
};

storiesOf('Molecules|IconInfoTile', module)
  .add('default', () => <IconInfoTile {...props} />)
  .add('borderless', () => <IconInfoTile {...props} borderless />);
