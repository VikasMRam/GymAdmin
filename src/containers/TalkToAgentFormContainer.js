import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { withRouter } from 'react-router';
import produce from 'immer';

import { query, prefetch } from 'sly/services/newApi';
import { connectController } from 'sly/controllers';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { createValidator, required, usPhone } from 'sly/services/validation';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import { REQUEST_AGENT_CONSULT } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import SlyEvent from 'sly/services/helpers/events';
import { CONSULTATION_REQUESTED } from 'sly/services/newApi/constants';

const form = 'TalkToAgentForm';
const validate = createValidator({
  location: [required],
  phone: [usPhone, required],
  message: [required],
  full_name: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const initialValues = {
  location: {},
  phone: '',
  message: '',
  full_name: '',
};
const ReduxForm = reduxForm({
  form,
  validate,
  initialValues,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

@withRouter

@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))

@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class TalkToAgentFormContainer extends Component {
  static propTypes = {
    uuidAux: object.isRequired,
    updateUuidAux: func.isRequired,
    userDetails: object.isRequired,
    status: object.isRequired,
    postSubmit: func,
    createAction: func.isRequired,
    match: object.isRequired,
  };

  handleSubmit = (data) => {
    const {
      postSubmit, createAction, match,
      status,
      updateUuidAux,
    } = this.props;

    const uuidAux = status.uuidAux.result;

    const { message, location, full_name, phone } = data;
    const { formatted_address } = location;

    return Promise.all([
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: { phone, name: full_name, message },
          actionPage: match.url,
          actionType: CONSULTATION_REQUESTED,
        },
      }),
      updateUuidAux({ id: uuidAux.id }, produce(uuidAux, (draft) => {
        const uuidInfo = draft.attributes.uuidInfo || {};
        const locationInfo = uuidInfo.locationInfo || {};
        const preferredLocations = locationInfo.preferredLocations || [];

        if (!preferredLocations.includes(formatted_address)) {
          preferredLocations.push(formatted_address);
        }

        locationInfo.preferredLocations = preferredLocations;
        uuidInfo.locationInfo = locationInfo;
        draft.attributes.uuidInfo = uuidInfo;
      })),
    ]).then(() => {
      const event = {
        action: 'ask_question', category: 'agent', label: match.url,
      };
      SlyEvent.getInstance().sendEvent(event);
      if (postSubmit) {
        postSubmit();
      }
    }).catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });
  };

  render() {
    const { ...props } = this.props;
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}
