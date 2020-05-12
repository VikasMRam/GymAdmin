import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import task from 'sly/web/../private/storybook/sample-data/task-1.json';
import TaskRowCard from 'sly/web/components/organisms/TaskRowCard';

storiesOf('Organisms|TaskRowCard', module)
  .add('default', () => (
    <TaskRowCard
      task={task}
      onTaskClick={action('onTaskClick')}
    />
  ));
