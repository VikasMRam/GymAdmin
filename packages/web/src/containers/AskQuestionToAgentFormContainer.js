import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, string, oneOf, object } from 'prop-types';
import * as immutable from 'object-path-immutable';

import { withRouter } from 'react-router';
import { prefetch, query, withAuth, withUser } from 'sly/web/services/api';
import { AA_CONSULTATION_REQUESTED, PROFILE_ASK_QUESTION, AGENT_ASK_QUESTIONS, CONSULTATION_REQUESTED, HOME_CARE_REQUESTED } from 'sly/web/services/api/constants';
import { capitalize } from  'sly/web/services/helpers/utils';
import matchPropType from 'sly/common/propTypes/match';
import userPropType from 'sly/common/propTypes/user';
import TalkToAgentForm from 'sly/web/components/organisms/TalkToAgentForm';
import { createValidator, required, usPhone, email } from 'sly/web/services/validation';
import SlyEvent from 'sly/web/services/helpers/events';

const form = 'AskQuestionToAgentForm';
const validate = createValidator({
  location: [required],
  firstName: [required],
  lastName: [required],
  email: [required, email],
  phone: [required, usPhone],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  hasEmail: true,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

@withRouter
@withAuth
@withUser
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('createQuestion', 'createQuestion')
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
    actionType: oneOf([PROFILE_ASK_QUESTION, AGENT_ASK_QUESTIONS, CONSULTATION_REQUESTED, HOME_CARE_REQUESTED]),
    status: object.isRequired,
    updateUuidAux: func.isRequired,
  };

  static defaultProps = {
    category: 'agent',
    actionType: AGENT_ASK_QUESTIONS,
  };

  handleSubmit = (data) => {
    const {
      entityId, postSubmit, createAction, createOrUpdateUser, createQuestion, updateUuidAux, match,
      user, category, type, status, actionType,
    } = this.props;
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };
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
      entityType: capitalize(category),
      name,
      email,
      phone,
      question: message,
    };
    if (actionType === CONSULTATION_REQUESTED || actionType === HOME_CARE_REQUESTED || actionType === AA_CONSULTATION_REQUESTED) {
      actionInfo = {
        phone,
        name,
        email,
        message,
      };
    }
    if (actionType === PROFILE_ASK_QUESTION) { // Also create a content item
      const payload = {
        communitySlug: entityId,
        question: message,
        name,
        email,
      };
      actionInfo.questionText = message; // API expects key
      createQuestion(payload) // FIXME: Dont care about failure?
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
    // change user.name to first name and last name
    const { user } = this.props;
    let firstName,lastName = "";
    if (user && user.name) {
      [firstName,lastName] = user.name ? user.name.split(" ") : ["",""]
    }
    return (
      <ReduxForm
        firstName
        lastName
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
