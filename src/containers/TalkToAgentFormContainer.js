import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { withRouter } from 'react-router';
import * as immutable from 'object-path-immutable';

import { query, prefetch, withUser, withAuth } from 'sly/services/newApi';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import userPropType from 'sly/propTypes/user';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import SlyEvent from 'sly/services/helpers/events';
import { CONSULTATION_REQUESTED } from 'sly/services/newApi/constants';

const form = 'TalkToAgentForm';
const validate = createValidator({
  location: [required],
  phone: [usPhone, required],
  message: [required],
  name: [required],
  email: [required, email],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

@withRouter
@withUser
@withAuth
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class TalkToAgentFormContainer extends Component {
  static propTypes = {
    uuidAux: object.isRequired,
    updateUuidAux: func.isRequired,
    status: object.isRequired,
    postSubmit: func,
    createAction: func.isRequired,
    match: object.isRequired,
    user: userPropType,
    createOrUpdateUser: func.isRequired,
  };

  handleSubmit = (data) => {
    const {
      postSubmit, createAction, match, status, updateUuidAux, createOrUpdateUser,
      user,
    } = this.props;

    const rawUuidAux = status.uuidAux.result;
    const { message, location, name } = data;

    let { phone } = data;
    if (user && user.phoneNumber) {
      ({ phoneNumber: phone } = user);
    }

    const uuidInfo = rawUuidAux.attributes.uuidInfo || {};
    const locationInfo = uuidInfo.locationInfo || {};

    if (location) {
      const { city, state, geo } = location;
      locationInfo.city = city;
      locationInfo.state = state;
      locationInfo.geo = geo;
    }

    const uuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.locationInfo', locationInfo);

    return Promise.all([
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: { phone, name, message },
          actionPage: match.url,
          actionType: CONSULTATION_REQUESTED,
        },
      }),

      updateUuidAux({ id: uuidAux.id }, uuidAux),
    ])
      .then(() => createOrUpdateUser({
        name,
        phone,
      }))
      .then(() => {
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
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        hasLocation
        {...this.props}
      />
    );
  }
}
