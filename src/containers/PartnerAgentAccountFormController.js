import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import PartnerAgentAccountForm from 'sly/components/organisms/PartnerAgentAccountForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser, query, prefetch } from 'sly/services/newApi';
import { userIs } from 'sly/services/helpers/role';
import { CUSTOMER_ROLE } from 'sly/constants/roles';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'PartnerAgentAccountForm',
  destroyOnUnmount: false,
  validate,
})(PartnerAgentAccountForm);

@withUser
@query('updateAgent', 'updateAgent')
@prefetch('agent', 'getAgent', req => req({ id: 'me' }))
export default class PartnerAgentAccountFormController extends Component {
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
    const { result } = rawAgent;
    const { id } = result;

    const agent = immutable.wrap(pick(result, ['id', 'type', 'attributes.info']))
      .set('attributes.info.bio', values.bio)
      .set('attributes.info.displayName', values.displayName)
      .value();

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
      const { info } = agent;
      const { bio, displayName } = info;
      const initialValues = { bio, displayName };
      return (
        <ReduxForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          user={user}
          {...props}
        />
      );
    }
    return <div>Loading...</div>;
  }
}
