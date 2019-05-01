import React, { Component } from 'react';
import { object, func, string, arrayOf } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { query, getRelationship } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import {
  createValidator,
  required,
} from 'sly/services/validation';
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';

const validate = createValidator({
  reason: [required],
  description: [required],
  preferredLocation: [required],
});

const ReduxForm = reduxForm({
  form: 'RejectFamilyForm',
  validate,
})(RejectFamilyForm);

const mapStateToProps = state => ({
  formState: state.form && state.form.RejectFamilyForm ? state.form.RejectFamilyForm.values : {},
});

@query('updateClient', 'updateClient')

@query('updateUuidAux', 'updateUuidAux')

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.rawClient, 'uuidAux'),
}))

@connect(mapStateToProps)

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
    formState: object,
    uuidAux: object,
    updateUuidAux: func,
  };

  handleUpdateStage = (data) => {
    const {
      updateClient, client, rawClient, notifyError, notifyInfo, onSuccess, uuidAux, updateUuidAux,
    } = this.props;
    const { id } = client;
    const { reason, description, preferredLocation } = data;
    const [, , contactRejected] = FAMILY_STAGE_ORDERED.Closed;
    const newRawClient = pick(rawClient, ['id', 'type', 'attributes.stage', 'attributes.clientInfo']);
    let newClient = immutable(newRawClient)
      .set('attributes.stage', contactRejected)
      .set('attributes.clientInfo.rejectReason', reason);
    if (description) {
      newClient.set('attributes.clientInfo.otherText', description);
    }
    newClient = newClient.value();
    let uuidAuxPromise = () => Promise.resolve();

    if (preferredLocation) {
      let newUuidAux = immutable(pick(uuidAux, ['id', 'type', 'attributes.uuidInfo', 'attributes.uuid']));
      const [city, state] = preferredLocation.split(',');
      const locationInfo = {
        city,
        state,
      };
      const { id: uuidID } = uuidAux;
      newUuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
      newUuidAux = newUuidAux.value();
      uuidAuxPromise = () => updateUuidAux({ id: uuidID }, newUuidAux);
    }

    return updateClient({ id }, newClient)
      .then(uuidAuxPromise)
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
    const { onCancel, reasons, formState } = this.props;
    let currentReason;
    if (formState) {
      ({ reason: currentReason } = formState);
    }

    return (
      <ReduxForm
        onSubmit={handleUpdateStage}
        onCancel={onCancel}
        reasons={reasons}
        currentReason={currentReason}
      />
    );
  }
}

export default RejectFamilyContainer;
