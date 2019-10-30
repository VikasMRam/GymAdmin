import React from 'react';
import { storiesOf } from '@storybook/react';

import PlusBadge from 'sly/components/molecules/PlusBadge';

storiesOf('Molecules|PlusBadge', module)
  .add('default', () => <PlusBadge  />)
  .add('plusCategory', () => <PlusBadge plusCategory="best value" />);
