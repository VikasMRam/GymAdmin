import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { reduxForm, reset, SubmissionError } from 'redux-form';
import { func, string, oneOf } from 'prop-types';
import * as immutable from 'object-path-immutable';

import { useAuth, useQuery, useUser } from 'sly/web/services/api';
import {
  AA_CONSULTATION_REQUESTED,
  PROFILE_ASK_QUESTION,
  AGENT_ASK_QUESTIONS,
  CONSULTATION_REQUESTED,
  HOME_CARE_REQUESTED,
} from 'sly/web/services/api/constants';
import { capitalize } from  'sly/web/services/helpers/utils';
import matchPropType from 'sly/common/propTypes/match';
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

const AskQuestionToAgentFormContainer = (props) => {
  const createAction = useQuery('createUuidAction');
  const createQuestion = useQuery('createQuestion');
  const updateUuidAux = useQuery('updateUuidAux');

  const { url } = useParams();

  const { createOrUpdateUser } = useAuth();

  const { user, info: { uuidAux: { result: rawUuidAux } } } = useUser();

  const { entityId, postSubmit, category, type, actionType } = props;

  const handleSubmit = useCallback((data) => {
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };
    const { message, location } = data;
    let { phone, email, name } = data;

    if (user) {
      if (user.phoneNumber) ({ phoneNumber: phone } = user);
      if (user.email) ({ email } = user);
      if (user.name) ({ name } = user);
    }

    const uuidInfo = rawUuidAux?.attributes.uuidInfo || {};
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

    let actionInfo = { slug: entityId, entityType: capitalize(category), name, email, phone, question: message };

    if (actionType === CONSULTATION_REQUESTED || actionType === HOME_CARE_REQUESTED || actionType === AA_CONSULTATION_REQUESTED) {
      actionInfo = { phone, name, email, message };
    }

    if (actionType === PROFILE_ASK_QUESTION) { // Also create a content item
      const payload = { communitySlug: entityId, question: message, name, email };
      actionInfo.questionText = message; // API expects key
      return createQuestion(payload)
        .then(() => {
          Promise.all([
            createAction({ type: 'UUIDAction', attributes: { actionType, actionPage: url, actionInfo } }),
            updateUuidAuxReq(),
          ])
            .then(() => user ? true : createOrUpdateUser({ name, email, phone }, { ignoreAlreadyRegistered: true }))
            .then(() => {
              const c = `${category}-${actionType}${type ? `-${type}` : ''}`;
              const event = { action: 'ask_question', category: c, label: entityId || url };
              SlyEvent.getInstance().sendEvent(event);
              postSubmit?.();
            });
        })
        .catch(({ body }) => {
          let errorMessage;
          if (body?.errors) {
            errorMessage = body.errors[0].detail;
          } else {
            console.error(body);
          }
          throw new SubmissionError({ _error: errorMessage });
        });
    }
    return Promise.all([
      createAction({ type: 'UUIDAction', attributes: { actionType, actionPage: url, actionInfo } }),
      updateUuidAuxReq(),
    ])
      .then(() => user ? true : createOrUpdateUser({ name, email, phone }, { ignoreAlreadyRegistered: true }))
      .then(() => {
        const c = `${category}-${actionType}${type ? `-${type}` : ''}`;
        const event = { action: 'ask_question', category: c, label: entityId || url };
        SlyEvent.getInstance().sendEvent(event);
          postSubmit?.();
      });
  }, [entityId, postSubmit, createOrUpdateUser, category, type, actionType, user, rawUuidAux]);

  return (
    <ReduxForm
      onSubmit={handleSubmit}
      {...{ user, ...props }}
    />
  );
};

AskQuestionToAgentFormContainer.propTypes = {
  entityId: string,
  createOrUpdateUser: func.isRequired,
  postSubmit: func,
  match: matchPropType.isRequired,
  category: oneOf(['agent', 'community']),
  type: string,
  actionType: oneOf([PROFILE_ASK_QUESTION, AGENT_ASK_QUESTIONS, CONSULTATION_REQUESTED, HOME_CARE_REQUESTED]),
};

AskQuestionToAgentFormContainer.defaultProps = {
  category: 'agent',
  actionType: AGENT_ASK_QUESTIONS,
};

export default AskQuestionToAgentFormContainer;
