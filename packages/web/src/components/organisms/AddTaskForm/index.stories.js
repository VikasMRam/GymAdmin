import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import AddTaskForm from 'sly/web/components/organisms/AddTaskForm';
import { TASK_STATUS_ORDERED, TASK_PRIORITIES_ORDERED } from 'sly/web/constants/tasks';
import { withPreventDefault } from 'sly/web/services/helpers/forms';
import AmalFrancis from 'sly/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/storybook/sample-data/user-sushanth-ramakrishna.json';
import task from 'sly/storybook/sample-data/task-1.json';

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];
const statuses = TASK_STATUS_ORDERED;
const priorities = TASK_PRIORITIES_ORDERED;

const initialValues = {
  ...task,
};

const AddTaskFormContainer = reduxForm({
  form: 'AddTaskForm',
})(AddTaskForm);

storiesOf('Organisms|AddTaskForm', module)
  .add('default', () => (
    <AddTaskFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      assignedTos={assignedTos}
      statuses={statuses}
      priorities={priorities}
    />
  ))
  .add('with task', () => (
    <AddTaskFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      assignedTos={assignedTos}
      statuses={statuses}
      priorities={priorities}
      heading={task.title}
      initialValues={initialValues}
    />
  ));
