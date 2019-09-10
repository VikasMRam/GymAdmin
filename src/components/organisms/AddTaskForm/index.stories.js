import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import AddTaskForm from 'sly/components/organisms/AddTaskForm';
import { TASK_STATUS_ORDERED, TASK_PRIORITIES_ORDERED } from 'sly/constants/tasks';
import { withPreventDefault } from 'sly/services/helpers/forms';
import AmalFrancis from 'sly/../private/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];
const statuses = TASK_STATUS_ORDERED;
const priorities = TASK_PRIORITIES_ORDERED;

const AddTaskFormContainer = reduxForm()(AddTaskForm);

storiesOf('Organisms|AddTaskForm', module)
  .add('default', () => (
    <AddTaskFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      assignedTos={assignedTos}
      statuses={statuses}
      priorities={priorities}
    />
  ));
