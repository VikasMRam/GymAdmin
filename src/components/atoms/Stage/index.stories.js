import React from 'react';
import { storiesOf } from '@storybook/react';

import Stage from 'sly/components/atoms/Stage';

storiesOf('Atoms|Stage', module)
  .add('default', () => <Stage text="New" currentStage={2} />)
  .add('danger palette', () => <Stage text="New" currentStage={2} palette="danger" />);
