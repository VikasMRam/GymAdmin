import React, { Component } from 'react';
import { shape, object, func, bool } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import PartnerAgentProfileForm from 'sly/web/components/organisms/PartnerAgentProfileForm';
import { createValidator, required, email, usPhone } from 'sly/web/services/validation';
import { phoneParser } from 'sly/web/services/helpers/phone';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/web/propTypes/user';
import { withUser, query } from 'sly/web/services/api';
import { adminAgentPropType } from 'sly/web/propTypes/agent';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';
import withNotification from 'sly/web/controllers/withNotification';

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
@withNotification
@query('updateAgent', 'updateAgent')
export default class PartnerAgentProfileFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    agent: adminAgentPropType.isRequired,
    rawAgent: object,
    status: shape({
      uuidAux: object,
    }),
    uuidAux: uuidAuxProps,
    updateAgent: func,
    notifyInfo: func,
    isLoading: bool,
  };

  handleSubmit = (values) => {
    const {
      rawAgent, updateAgent, notifyInfo,
    } = this.props;
    const { id } = rawAgent;
    // FIXME: Checkbox issues: the true value comes along in the second element sometimes (browser specific? )
    const isProVal = ( values.isPro.length > 0 ? values.isPro[0] || values.isPro[1] : false);
    let agent = immutable.wrap(pick(rawAgent, ['id', 'type', 'attributes.status', 'attributes.info', 'attributes.info.serviceArea']))
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
      .set('attributes.info.isPro', isProVal)
      .set('attributes.info.cellPhone', phoneParser(values.cellPhone))
      .set('attributes.info.email', values.email)
      .set('attributes.info.timeZone', values.timeZone)
      .set('attributes.info.smsFormat', values.smsFormat)
      .set('attributes.info.slyScore', parseFloat(values.slyScore));

    if (values.vacation && values.vacation[0].getTime() !== 0 && values.vacation[1].getTime() !== 0) {
      agent = agent.set('attributes.info.vacationStart', values.vacation[0])
        .set('attributes.info.vacationEnd', values.vacation[1]);
    }
    agent = agent.value();

    const agentPromise = () => updateAgent({ id }, agent);

    return agentPromise().then(notifyInfo('Details Updated Successfully'))
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
    const { user, agent, isLoading, ...props } = this.props;
    if (!isLoading) {
      if (!agent) {
        return <div>Partner Agent Record Not Found...</div>;
      }
      const { info, status } = agent;
      const { bio, parentCompany, displayName, cv, imageCaption, chosenReview, serviceArea } = info;
      const { adminRegion, vacationStart, vacationEnd, adminNotes, slyScore, isPro, cellPhone, email, timeZone, smsFormat } = info;
      let zipcodesServed = null;
      if (serviceArea) {
        ({ zipcodesServed } = serviceArea);
      }
      let vacation = null;
      if (vacationStart && vacationEnd) {
        vacation = [new Date(vacationStart), new Date(vacationEnd)];
      }
      const initialValues = { bio, parentCompany, displayName, cv, imageCaption, chosenReview, vacation, adminRegion,
        zipcodesServed, status, adminNotes, slyScore, isPro: [isPro], cellPhone, email, timeZone, smsFormat };
      const isSlyAdmin = userIs(user, PLATFORM_ADMIN_ROLE);
      return (
        <ReduxForm
          initialValues={initialValues}
          onSubmit={this.handleSubmit}
          buttonText="Save"
          isSlyAdmin={isSlyAdmin}
          {...props}
        />
      );
    }
    return <div>Loading...</div>;
  }
}
