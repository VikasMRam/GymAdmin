import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import PartnerAgentProfileForm from 'sly/components/organisms/PartnerAgentProfileForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser, query, prefetch } from 'sly/services/newApi';
import { adminAgentPropType } from 'sly/propTypes/agent';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'PartnerAgentProfileForm',
  validate,
})(PartnerAgentProfileForm);

@withUser
@query('updateAgent', 'updateAgent')
@prefetch('agent', 'getAgent', (req, { agentId }) => {
  let slug = 'me';
  if (agentId) {
    slug = agentId;
  }
  return req({ id: slug });
})
export default class PartnerAgentProfileFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    agent: adminAgentPropType.isRequired,
    status: shape({
      user: object,
      uuidAux: object,
    }),
    uuidAux: uuidAuxProps,
    updateAgent: func,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const {
      status, updateAgent, notifySuccess,
    } = this.props;
    const { agent: rawAgent } = status;
    const { result } = rawAgent;
    const { id } = result;

    let agent = immutable.wrap(pick(result, ['id', 'type', 'attributes.status', 'attributes.info', 'attributes.info.serviceArea']))
      .set('attributes.info.bio', values.bio)
      .set('attributes.info.parentCompany', values.parentCompany)
      .set('attributes.info.displayName', values.displayName)
      .set('attributes.info.cv', values.cv)
      .set('attributes.info.imageCaption', values.imageCaption)
      .set('attributes.info.chosenReview', values.chosenReview)
      .set('attributes.info.adminRegion', values.adminRegion)
      .set('attributes.info.serviceArea.zipcodesServed', values.zipcodesServed)
      .set('attributes.status', parseInt(values.status, 10))
      .set('attributes.info.adminNotes', values.adminNotes)
      .set('attributes.info.slyScore', parseFloat(values.slyScore));

    if (values.vacation && values.vacation[0].getTime() !== 0 && values.vacation[1].getTime() !== 0) {
      agent = agent.set('attributes.info.vacationStart', values.vacation[0])
        .set('attributes.info.vacationEnd', values.vacation[1]);
    }
    agent = agent.value();

    const agentPromise = () => updateAgent({ id }, agent);

    return agentPromise().then(notifySuccess('Details Updated Successfully'))
      .catch((error) => {
        console.error(error);
        const { status, body } = error;
        if (status === 400) {
          const { errors } = body;
          const errorMessage = errors[0] && errors[0].title ? errors[0].title : 'Generic Error';
          throw new SubmissionError({ _error: errorMessage });
        }
      });
  };
  render() {
    const { user, agent, status, uuidAux, ...props } = this.props;
    const { hasFinished: agentHasFinished } = status.agent;
    if (agentHasFinished) {
      const { info, status } = agent;
      const { bio, parentCompany, displayName, cv, imageCaption, chosenReview, serviceArea } = info;
      const { adminRegion, vacationStart, vacationEnd, adminNotes, slyScore } = info;
      let zipcodesServed = null;
      if (serviceArea) {
        ({ zipcodesServed } = serviceArea);
      }
      const vacation = [new Date(vacationStart), new Date(vacationEnd)];
      const initialValues = { bio, parentCompany, displayName, cv, imageCaption, chosenReview, vacation, adminRegion, zipcodesServed, status, adminNotes, slyScore };
      const isSlyAdmin = userIs(user, PLATFORM_ADMIN_ROLE);
      return (
        <ReduxForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          user={user}
          buttonText="Save"
          isSlyAdmin={isSlyAdmin}
          {...props}
        />
      );
    }
    return <div>Loading...</div>;
  }
}
