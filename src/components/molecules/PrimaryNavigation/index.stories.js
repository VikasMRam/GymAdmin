import React from 'react';
import { storiesOf } from '@storybook/react';
import { PrimaryNavigation } from 'sly/components';

storiesOf('PrimaryNavigation', module)
  .add('default', () => <PrimaryNavigation />)
  .add('reverse', () => <PrimaryNavigation reverse />);
