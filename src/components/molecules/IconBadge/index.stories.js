import React from 'react';
import { storiesOf } from '@storybook/react';

import IconBadge from 'sly/components/molecules/IconBadge';

storiesOf('Molecules|IconBadge', module)
  .add('default', () => <IconBadge icon="hourglass" text="LONG-TERM" />);
