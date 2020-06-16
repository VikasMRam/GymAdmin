import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { required, createValidator } from 'sly/web/services/validation';
import { AGENT_RESOURCE_TYPE, ADDRESS_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import { query } from 'sly/web/services/api';
import AddAgentForm from 'sly/web/components/organisms/AddAgentForm';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';


const validate = createValidator({
  name: [required],
  agentPhone: [required],
  line1: [required],
  city: [required],
  state: [required],
  zip: [required],
});

const formName = 'AddAgentForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(AddAgentForm);


@query('createAgent', 'createAgent')

export default class AddAgentFormContainer extends Component {
  static propTypes = {
    createCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired
  };

  handleSubmit = (data) => {
    const { createAgent, notifyError, notifyInfo, onSuccess, onCancel } = this.props;
    const { name, phone, line1, line2, city, state, zip } = data;

    const payload = {
      type: AGENT_RESOURCE_TYPE,
      attributes: {
        name: name,
        info: {
          cellPhone: phone,
        }
      },
      relationships: {
        address: {
          data: {
            type: ADDRESS_RESOURCE_TYPE,
            attributes: {
              line1: line1,
              line2: line2,
              city: city,
              state: state,
              zip: zip,
            }
          }
        }
      }
    };

    return createAgent(payload)
      .then((resp) => {
        onCancel();
        notifyInfo('Agent added successfully');
        if (onSuccess) {
          onSuccess(normJsonApi(resp));
        }
      })
      .catch(() => notifyError(`${name} could not be created`));
  };

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}
