import React, { Component } from 'react';
import { arrayOf, string, object, func } from 'prop-types';
import { reduxForm } from 'redux-form';

import { prefetch, withUser, query } from 'sly/services/newApi';
import userPropType from 'sly/propTypes/user';
import taskPropType from 'sly/propTypes/task';
import { createValidator, required } from 'sly/services/validation';
import { TASK_RESOURCE_TYPE, USER_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
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

@query('createTask', 'createTask')

@query('updateTask', 'updateTask')

@withUser

export default class AddOrEditTaskFormContainer extends Component {
  static propTypes = {
    users: arrayOf(userPropType),
    user: userPropType,
    priorities: arrayOf(string).isRequired,
    statuses: arrayOf(string).isRequired,
    status: object,
    createTask: func,
    notifyInfo: func,
    onSuccess: func,
    updateTask: func,
    task: taskPropType,
  };

  handleAddTask = (data) => {
    const {
      createTask, notifyInfo, user, onSuccess,
    } = this.props;
    const payload = {
      type: TASK_RESOURCE_TYPE,
      attributes: {
        ...data,
      },
      relationships: {
        creator: {
          data: {
            type: USER_RESOURCE_TYPE,
            id: user.id,
          },
        },
        owner: {
          data: {
            type: USER_RESOURCE_TYPE,
            id: data.owner,
          },
        },
      },
    };

    createTask(payload)
      .then(() => {
        notifyInfo('New task successfully created');
        if (onSuccess) {
          onSuccess();
        }
      });
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
