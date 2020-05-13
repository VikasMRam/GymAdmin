import React from 'react';
import { storiesOf } from '@storybook/react';

import IconBadge from 'sly/web/components/molecules/IconBadge';

storiesOf('Molecules|IconBadge', module)
  .add('default', () => <IconBadge icon="hourglass" text="LONG-TERM" />)
  .add('RECOMMENDED', () => <IconBadge badgePalette="green" palette="white" icon="checkmark-circle" text="RECOMMENDED" />);
