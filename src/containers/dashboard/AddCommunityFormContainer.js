import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { required, createValidator } from 'sly/services/validation';
import { COMMUNITY_RESOURCE_TYPE, ADDRESS_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { query } from 'sly/services/api';
import AddCommunityForm from 'sly/components/organisms/AddCommunityForm';
import { normJsonApi } from 'sly/services/helpers/jsonApi';


const validate = createValidator({
  name: [required],
  communityPhone: [required],
  typeCare: [required],
  line1: [required],
  city: [required],
  state: [required],
  zip: [required],
});

const formName = 'AddCommunityForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(AddCommunityForm);


@query('createCommunity', 'createCommunity')

export default class AddCommunityFormContainer extends Component {
  static propTypes = {
    createCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired
  };

  handleSubmit = (values) => {
    const { createCommunity, notifyError, notifyInfo, onSuccess, onCancel } = this.props;
    const { name, communityPhone, typeCare, line1, line2, city, state, zip,} = values;

    const payload = {
      type: COMMUNITY_RESOURCE_TYPE,
      attributes: {
        name,
        propInfo: {
          communityPhone,
          typeCare,
        }
      },
      relationship: {
        address: {
          data: {
            type: ADDRESS_RESOURCE_TYPE,
            attributes: {
              line1,
              line2,
              city,
              state,
              zip,
            }
          }
        }
      }
    };

    return createCommunity(payload)
      .then((resp) => {
        onCancel();
        notifyInfo('Community added successfully');
        if (onSuccess) {
          onSuccess(normJsonApi(resp));
        }
      })
      .catch(() => notifyError(`${attributes.name} could not be created`));
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
