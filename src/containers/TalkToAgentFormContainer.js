import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { withRouter } from 'react-router';
import produce from 'immer';

import { connectController } from 'sly/controllers';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { query, prefetch } from 'sly/services/newApi';
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

const mapStateToProps = state => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails || {},
});

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

const mapPropsToActions = () => ({
  userDetails: resourceDetailReadRequest('userAction'),
});

@withRouter

@withServerState(mapPropsToActions)

@connectController(mapStateToProps, mapDispatchToProps)

@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))

@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class TalkToAgentFormContainer extends Component {
  static propTypes = {
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    uuidAux: object.isRequired,
    updateUuidAux: func.isRequired,
    status: object.isRequired,
    postSubmit: func,
    createAction: func.isRequired,
    match: object.isRequired,
  };

  handleSubmit = (data) => {
    const {
      userDetails,
      postUserAction,
      postSubmit, createAction, match,
      status,
      updateUuidAux,
    } = this.props;

    const uuidAux = status.uuidAux.result;

    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const { message, location, full_name, phone } = data;
    const { formatted_address, geometry } = location;
    const { lat, lng } = geometry.location;
    const value = {
      user,
      details: {
        message,
        full_name,
        location_text: formatted_address,
        latitude: lat(),
        longitude: lng(),
      },
    };
    const payload = {
      action: REQUEST_AGENT_CONSULT,
      value,
    };
    return Promise.all([
      postUserAction(payload),
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
