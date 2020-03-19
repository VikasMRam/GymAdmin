import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, string, oneOf, object } from 'prop-types';
import { withRouter } from 'react-router';
import * as immutable from 'object-path-immutable';

import { prefetch, query, withAuth, withUser } from 'sly/services/newApi';
import { AGENT_ASK_QUESTIONS, CONSULTATION_REQUESTED, HOME_CARE_REQUESTED } from 'sly/services/newApi/constants';
import { capitalize } from  'sly/services/helpers/utils';
import matchPropType from 'sly/propTypes/match';
import userPropType from 'sly/propTypes/user';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/services/validation';
import SlyEvent from 'sly/services/helpers/events';

const form = 'AskQuestionToAgentForm';
const validate = createValidator({
  location: [required],
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

@withRouter
@withAuth
@withUser
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class AskQuestionToAgentFormContainer extends Component {
  static propTypes = {
    entityId: string,
    user: userPropType,
    createOrUpdateUser: func.isRequired,
    postSubmit: func,
    match: matchPropType.isRequired,
    createAction: func.isRequired,
    category: oneOf(['agent', 'community']),
    type: string,
    actionType: oneOf([AGENT_ASK_QUESTIONS, CONSULTATION_REQUESTED, HOME_CARE_REQUESTED]),
    status: object.isRequired,
    updateUuidAux: func.isRequired,
  };

  static defaultProps = {
    category: 'agent',
    actionType: AGENT_ASK_QUESTIONS,
  };

  handleSubmit = (data) => {
    const {
      entityId, postSubmit, createAction, createOrUpdateUser, updateUuidAux, match,
      user, category, type, status, actionType,
    } = this.props;

    const rawUuidAux = status.uuidAux.result;
    const { message, location } = data;
    let { phone, email, name } = data;
    if (user) {
      if (user.phoneNumber) {
        ({ phoneNumber: phone } = user);
      }
      if (user.email) {
        ({ email } = user);
      }
      if (user.name) {
        ({ name } = user);
      }
    }
    const uuidInfo = rawUuidAux.attributes.uuidInfo || {};
    let updateUuidAuxReq = () => Promise.resolve();
    if (location) {
      const locationInfo = uuidInfo.locationInfo || {};
      const { city, state, geo } = location;
      locationInfo.city = city;
      locationInfo.state = state;
      locationInfo.geo = geo;
      const uuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.locationInfo', locationInfo);
      updateUuidAuxReq = () => updateUuidAux({ id: uuidAux.id }, uuidAux);
    }
    let actionInfo = {
      slug: entityId,
      question: message,
      entityType: capitalize(category),
      name,
      email,
      phone,
    };
    if (actionType === CONSULTATION_REQUESTED || actionType === HOME_CARE_REQUESTED){
      actionInfo = {
        phone,
        name,
        message,
      };
    }

    return Promise.all([
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType,
          actionPage: match.url,
          actionInfo,
        },
      }),
      updateUuidAuxReq(),
    ])
      .then(() => createOrUpdateUser({
        name,
        email,
        phone,
      }, { ignoreAlreadyRegistered: true }))
      .then(() => {
        const c = `${category}-${actionType}${type ? `-${type}` : ''}`;
        const event = {
          action: 'ask_question', category: c, label: entityId || match.url,
        };

        SlyEvent.getInstance().sendEvent(event);

        if (postSubmit) {
          postSubmit();
        }
      });
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
