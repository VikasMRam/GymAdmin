import React from 'react';
import { storiesOf } from '@storybook/react';

import Stage from 'sly/components/molecules/Stage';

storiesOf('Atoms|Stage', module)
  .add('default', () => <Stage stage="New" />)
  .add('danger palette', () => <Stage stage="New" palette="danger" />);
