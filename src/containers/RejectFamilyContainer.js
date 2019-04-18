import React, { Component } from 'react';
import { object, func, string, arrayOf } from 'prop-types';
import produce from 'immer';
import { reduxForm } from 'redux-form';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import {
  createValidator,
  required,
} from 'sly/services/validation';
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';

const validate = createValidator({
  reason: [required],
});

const ReduxForm = reduxForm({
  form: 'RejectFamilyForm',
  validate,
})(RejectFamilyForm);

@query('updateClient', 'updateClient')

class RejectFamilyContainer extends Component {
  static propTypes = {
    onCancel: func,
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    notifyInfo: func.isRequired,
    updateClient: func,
    reasons: arrayOf(string),
    onSuccess: func,
  };

  handleUpdateStage = (data) => {
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess,
    } = this.props;
    const { id } = client;
    const { reason } = data;

    return updateClient({ id }, {
      data: produce(rawClient, (draft) => {
        const [, , contactRejected] = FAMILY_STAGE_ORDERED.Closed;
        draft.attributes.stage = contactRejected;
        draft.attributes.clientInfo.rejectReason = reason;
      }),
    })
      .then(() => {
        notifyInfo('Family successfully rejected');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update stage. Please try again.');
      });
  };

  render() {
    const { handleUpdateStage } = this;
    const { onCancel, reasons } = this.props;

    return (
      <ReduxForm onSubmit={handleUpdateStage} onCancel={onCancel} reasons={reasons} />
    );
  }
}

export default RejectFamilyContainer;
