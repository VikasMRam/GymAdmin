import React, { Component } from 'react';
import { arrayOf, string, object, func } from 'prop-types';
import { reduxForm } from 'redux-form';

import { prefetch, query, withUser } from 'sly/web/services/api';
import clientPropType from 'sly/common/propTypes/client';
import userPropType from 'sly/common/propTypes/user';
import taskPropType from 'sly/common/propTypes/task';
import { createValidator, required } from 'sly/web/services/validation';
import { TASK_RELATED_ENTITY_TYPE, TASK_STATUS_NOT_STARTED } from 'sly/web/constants/tasks';
import { TASK_RESOURCE_TYPE, USER_RESOURCE_TYPE, CLIENT_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import AddTaskForm from 'sly/web/components/organisms/AddTaskForm';

const validate = createValidator({
  title: [required],
  dueDate: [required],
  status: [required],
  priority: [required],
  owner: [required],
});

const ReduxForm = reduxForm({
  form: 'AddOrEditTaskForm',
  validate,
})(AddTaskForm);

@prefetch('users', 'getUsers', request => request({ 'page-size': 30, sort: 'name' }))

@query('createTask', 'createTask')

@query('updateTask', 'updateTask')

@withUser

export default class AddOrEditTaskFormContainer extends Component {
  static propTypes = {
    users: arrayOf(userPropType),
    user: userPropType,
    client: clientPropType,
    priorities: arrayOf(string).isRequired,
    statuses: arrayOf(string).isRequired,
    status: object,
    createTask: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func,
    updateTask: func.isRequired,
    task: taskPropType,
    tasksRaw: arrayOf(object),
    refetchTasks: func,
  };

  handleSubmitTask = (data) => {
    const {
      createTask, updateTask, notifyInfo, onSuccess, client, task, refetchTasks,
      notifyError,
    } = this.props;
    const { owner, ...postData } = data;
    const payload = {
      type: TASK_RESOURCE_TYPE,
      attributes: {
        ...postData,
      },
      relationships: {
        owner: {
          data: {
            type: USER_RESOURCE_TYPE,
            id: owner,
          },
        },
      },
    };
    if (!task && data.relatedTo) {
      // todo: revisit if more type of related entities can be possbile
      payload.relationships.relatedEntities = {
        data: [
          {
            type: TASK_RELATED_ENTITY_TYPE,
            id: client.id,
            attributes: {
              entityType: CLIENT_RESOURCE_TYPE,
            },
          },
        ],
      };
    }

    let taskApiCall;
    if (task) {
      taskApiCall = updateTask({ id: task.id }, payload);
    } else {
      taskApiCall = createTask(payload);
    }

    taskApiCall
      .then(refetchTasks)
      .then(() => {
        if (task) {
          notifyInfo('Task successfully updated');
        } else {
          notifyInfo('New task successfully created');
        }
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to modify task. Please try again.');
      });
  };

  updateTaskStatus = (status) => {
    const { updateTask, tasksRaw, refetchTasks, onSuccess, notifyInfo, task } = this.props;
    const taskRaw = tasksRaw.find(taskRaw => taskRaw.id === task.id);
    taskRaw.attributes.status = status;
    return updateTask({ id: task.id }, taskRaw)
      .then(refetchTasks)
      .then(() => notifyInfo(`Task ${status} successfully`))
      .then(() => { onSuccess ? onSuccess() : null; });
  }

  render() {
    const {
      statuses, priorities, users, status, task, client, user,
    } = this.props;
    const { users: usersStatus } = status;
    const { hasFinished: usersHasFinished } = usersStatus;
    const isPageLoading = !usersHasFinished;
    if (isPageLoading) {
      return null;
    }
    const initialValues = {};
    // todo: revisit if more type of related entities can be possbile
    if (client) {
      initialValues.relatedTo = client.clientInfo.name;
    }
    if (user) {
      initialValues.owner = user.id;
    }

    initialValues.status = TASK_STATUS_NOT_STARTED;

    let deleteTask;
    let completeTask;
    if (task) {
      if (task.title) {
        initialValues.title = task.title;
      }
      if (task.relatedEntities.length) {
        initialValues.relatedTo = task.relatedEntities[0].id;
      }
      if (task.dueDate) {
        initialValues.dueDate = new Date(task.dueDate);
      }
      if (task.owner) {
        initialValues.owner = task.owner.id;
      }
      if (task.status) {
        initialValues.status = task.status;
      }
      if (task.priority) {
        initialValues.priority = task.priority;
      }
      if (task.description) {
        initialValues.description = task.description;
      }
      if (task.created_at) {
        initialValues.created_at = task.created_at;
      }
      if (task.creator) {
        initialValues.creator = task.creator;
      }
      deleteTask = () => this.updateTaskStatus('Deleted');
      completeTask = () => this.updateTaskStatus('Completed');
    }

    return (
      <ReduxForm
        {...this.props}
        statuses={statuses}
        priorities={priorities}
        assignedTos={users}
        onSubmit={this.handleSubmitTask}
        initialValues={initialValues}
        heading={task && task.title}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    );
  }
}
