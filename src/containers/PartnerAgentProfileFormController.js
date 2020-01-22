import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import PartnerAgentProfileForm from 'sly/components/organisms/PartnerAgentProfileForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser, query, prefetch } from 'sly/services/newApi';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'PartnerAgentProfileForm',
  destroyOnUnmount: false,
  validate,
})(PartnerAgentProfileForm);

@withUser
@query('updateAgent', 'updateAgent')
@prefetch('agent', 'getAgent', req => req({ id: 'me' }))
export default class PartnerAgentProfileFormController extends Component {
  static propTypes = {
    user: userPropType,
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
    console.log(rawAgent);
    console.log(values);
    const { result } = rawAgent;
    const { id } = result;

    const agent = immutable.wrap(pick(result, ['id', 'type', 'attributes.status', 'attributes.info', 'attributes.adminInfo', 'attributes.info.serviceArea']))
      .set('attributes.info.bio', values.bio)
      .set('attributes.info.parentCompany', values.parentCompany)
      .set('attributes.info.displayName', values.displayName)
      .set('attributes.info.cv', values.cv)
      .set('attributes.info.imageCaption', values.imageCaption)
      .set('attributes.info.chosenReview', values.chosenReview)
      .set('attributes.info.adminRegion', values.adminRegion)
      .set('attributes.info.serviceArea.zipcodesServed', values.zipcodesServed)
      .set('attributes.info.vacationStart', values.vacation[0])
      .set('attributes.info.vacationEnd', values.vacation[1])
      .set('attributes.status', parseInt(values.status, 10))
      .set('attributes.info.adminNotes', values.adminNotes)
      .value();
    console.log(agent);
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
      console.log(agent);
      const { info, status } = agent;
      const { bio, parentCompany, displayName, cv, imageCaption, chosenReview, serviceArea } = info;
      const { adminRegion, vacationStart, vacationEnd, adminNotes } = info;
      const { zipcodesServed } = serviceArea;
      const vacation = [new Date(vacationStart), new Date(vacationEnd)];
      const initialValues = { bio, parentCompany, displayName, cv, imageCaption, chosenReview, adminRegion, zipcodesServed, vacation, status, adminNotes };
      return (
        <ReduxForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          user={user}
          buttonText="Save"
          {...props}
        />
      );
    }
    return <div>Loading...</div>;
  }
}
