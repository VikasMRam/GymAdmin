import React, { Component } from 'react';
import { arrayOf, string, object } from 'prop-types';
import { reduxForm } from 'redux-form';

import { prefetch, withUser } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import { createValidator, required } from 'sly/services/validation';
import AddTaskForm from 'sly/components/organisms/AddTaskForm';

const validate = createValidator({
  title: [required],
  due_date: [required],
  creator: [required],
  stage: [required],
  status: [required],
  priority: [required],
});

const ReduxForm = reduxForm({
  form: 'AddOrEditTaskForm',
  validate,
})(AddTaskForm);

@prefetch('users', 'getUsers')

@withUser

export default class AddOrEditTaskFormContainer extends Component {
  static propTypes = {
    users: arrayOf(userPropType),
    user: userPropType,
    priorities: arrayOf(string).isRequired,
    statuses: arrayOf(string).isRequired,
    status: object,
  };

  handleAddTask = (data) => {
  };

  render() {
    const {
      statuses, priorities, users, status, user,
    } = this.props;
    const { users: usersStatus, user: userStatus } = status;
    const { hasFinished: usersHasFinished } = usersStatus;
    const { hasFinished: userHasFinished } = userStatus;
    const isPageLoading = !usersHasFinished || !userHasFinished;
    if (isPageLoading) {
      return null;
    }
    const initialValues = {
      creator: user.name,
    };

    return (
      <ReduxForm
        {...this.props}
        statuses={statuses}
        priorities={priorities}
        assignedTos={users}
        onSubmit={this.handleAddTask}
        initialValues={initialValues}
      />
    );
  }
}
