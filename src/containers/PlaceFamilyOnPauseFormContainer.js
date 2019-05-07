import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { reduxForm } from 'redux-form';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import {
  createValidator,
  required,
} from 'sly/services/validation';
import PlaceFamilyOnPauseForm from 'sly/components/organisms/PlaceFamilyOnPauseForm';

const validate = createValidator({
  reason: [required],
});

const ReduxForm = reduxForm({
  form: 'PlaceFamilyOnPauseFormContainer',
  validate,
})(PlaceFamilyOnPauseForm);

@query('updateClient', 'updateClient')

class PlaceFamilyOnPauseFormContainer extends Component {
  static propTypes = {
    onCancel: func,
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    updateClient: func,
    onSuccess: func,
  };

  handlePause = (data) => {
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess,
    } = this.props;
    const { id } = client;
    const { reason } = data;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.status', 'attributes.clientInfo']))
      .set('attributes.status', FAMILY_STATUS_ON_HOLD)
      .set('attributes.clientInfo.onHoldReason', reason)
      .value();

    return updateClient({ id }, newClient)
      .then(() => {
        notifyInfo('Family successfully put on pause');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to put family on pause. Please try again.');
      });
  };

  render() {
    const { handlePause } = this;
    const { onCancel, client } = this.props;
    const { clientInfo } = client;
    const { name } = clientInfo;

    return (
      <ReduxForm onSubmit={handlePause} onCancel={onCancel} name={name} />
    );
  }
}

export default PlaceFamilyOnPauseFormContainer;
