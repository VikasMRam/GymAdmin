import React, { Component } from 'react';
import { arrayOf, string, object, func } from 'prop-types';
import { reduxForm } from 'redux-form';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import userPropType from 'sly/propTypes/user';
import taskPropType from 'sly/propTypes/task';
import { TASK_RESOURCE_TYPE, USER_RESOURCE_TYPE, CLIENT_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { createValidator, dependentRequired, usPhone, email } from 'sly/services/validation';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import AddFamilyForm from 'sly/components/organisms/AddFamilyForm';

const validate = createValidator({
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const ReduxForm = reduxForm({
  form: 'AddFamilyForm',
  validate,
})(AddFamilyForm);

@query('createClient', 'createClient')

@query('getClient', 'getClient')

export default class AddFamilyFormContainer extends Component {
  static propTypes = {
    users: arrayOf(userPropType),
    client: clientPropType,
    priorities: arrayOf(string).isRequired,
    statuses: arrayOf(string).isRequired,
    status: object,
    createClient: func,
    getClient: func,
    notifyInfo: func,
    onSuccess: func,
    updateTask: func,
    task: taskPropType,
  };

  handleSubmit = (data) => {
    const {
      createTask, updateTask, notifyInfo, onSuccess, client, task,
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
      payload.relationships.relatedEntities = {
        data: [
          {
            type: client ? CLIENT_RESOURCE_TYPE : USER_RESOURCE_TYPE,
            id: data.relatedTo,
          },
        ],
      };
    }

    createTask(payload)
      .then(() => {
        notifyInfo('New family successfully created');
        if (onSuccess) {
          onSuccess();
        }
      });
  };

  render() {
    const {
      statuses, priorities, users, status, task,
    } = this.props;
    const { users: usersStatus } = status;
    const { hasFinished: usersHasFinished } = usersStatus;
    const isPageLoading = !usersHasFinished;
    if (isPageLoading) {
      return null;
    }

    return (
      <WizardController
        formName="AddFamilyForm"
        onComplete={data => onComplete(data).then(openConfirmationModal)}
        onStepChange={handleStepChange}
      >
        {({
          data, onSubmit, isFinalStep, submitEnabled, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={ReduxForm}
              name="Add"
            />
            <WizardStep
              component={CommunityBookATourContactFormContainer}
              name="Duplicate"
              onContactByTextMsgChange={(e, value) => sendEvent('contactByTextMsg-changed', id, value)}
              onAdvisorHelpClick={openAdvisorHelp}
              user={user}
              userDetails={userDetails}
              heading={formHeading}
              subheading={formSubheading}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
