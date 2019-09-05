import React from 'react';
import { func, string, arrayOf, object } from 'prop-types';
import { Field } from 'redux-form';

import userPropType from 'sly/propTypes/user';
import ReduxField from 'sly/components/organisms/ReduxField';
import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

const AddTaskForm = ({
  handleSubmit, onCancel, assignedTos, statuses, priorities, heading, initialValues, ...props
}) => {
  const assignedTosOptions = assignedTos.map(at => ({ value: at.id, label: at.name }));
  const statusesOptions = statuses.map(s => ({ value: s, label: s }));
  const prioritiesOptions = priorities.map(s => ({ value: s, label: s }));

  return (
    <ThreeSectionFormTemplate
      {...props}
      hasCancel
      onCancelClick={onCancel}
      hasSubmit
      onSubmit={handleSubmit}
      heading={heading}
      submitButtonText="Add Task"
    >
      <Field
        name="title"
        label="Task"
        type="text"
        placeholder="Task description"
        component={ReduxField}
      />
      <Field
        name="due_date"
        label="Due date"
        type="date"
        placeholder="mm/dd/yyyy"
        component={ReduxField}
        dateFormat="MM/dd/yyyy"
      />
      {/* todo: disable temporarily */}
      <Field
        name="creator"
        label="Related to"
        type="text"
        placeholder="Begin typing..."
        component={ReduxField}
        disabled
      />
      <Field
        name="owner"
        label="Assigned to"
        type="select"
        component={ReduxField}
        options={assignedTosOptions}
      />
      <Field
        name="status"
        label="Status"
        type="select"
        component={ReduxField}
        options={statusesOptions}
      />
      <Field
        name="priority"
        label="Priority"
        type="select"
        component={ReduxField}
        options={prioritiesOptions}
      />
      <Field
        type="textarea"
        rows={3}
        name="description"
        label="Notes"
        component={ReduxField}
      />
    </ThreeSectionFormTemplate>
  );
};

AddTaskForm.propTypes = {
  handleSubmit: func,
  onCancel: func,
  priorities: arrayOf(string).isRequired,
  statuses: arrayOf(string).isRequired,
  assignedTos: arrayOf(userPropType).isRequired,
  heading: string.isRequired,
  initialValues: object,
};

AddTaskForm.defaultProps = {
  heading: 'Add Task',
};

export default AddTaskForm;
