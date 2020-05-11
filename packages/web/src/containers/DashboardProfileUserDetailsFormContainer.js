import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser, query } from 'sly/services/api';
import { userIs } from 'sly/services/helpers/role';
import { CUSTOMER_ROLE } from 'sly/constants/roles';

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'DashboardProfileUserDetailsForm',
  destroyOnUnmount: false,
  validate,
})(DashboardProfileUserDetailsForm);

const convertUserToProfileFormValues = (user, uuidAux) => {
  const result = {};
  const {
    name, email, phoneNumber,
  } = user;
  result.name = name;
  result.email = email;
  result.phoneNumber = phoneNumber;
  if (uuidAux) {
    const { uuidInfo } = uuidAux;
    if (uuidInfo) {
      const {
        housingInfo, residentInfo, financialInfo, locationInfo,
      } = uuidInfo;
      if (housingInfo && housingInfo.lookingFor) {
        const { lookingFor } = housingInfo;
        result.lookingFor = lookingFor;
      }
      if (housingInfo && housingInfo.moveTimeline) {
        const { moveTimeline } = housingInfo;
        result.timeToMove = moveTimeline;
      }
      if (residentInfo && residentInfo.fullName) {
        const { fullName } = residentInfo;
        result.residentName = fullName;
      }
      if (financialInfo && financialInfo.maxMonthlyBudget) {
        const { maxMonthlyBudget } = financialInfo;
        result.monthlyBudget = maxMonthlyBudget;
      }
      if (locationInfo && locationInfo.city && locationInfo.state) {
        const { city, state } = locationInfo;
        const searchingCity = `${city}, ${state}`;
        result.searchingCity = searchingCity;
      }
    }
    return result;
  }
  return result;
};


@withUser
@query('updateUser', 'updateUser')
@query('updateUuidAux', 'updateUuidAux')
export default class DashboardProfileUserDetailsFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    status: shape({
      user: object,
      uuidAux: object,
    }),
    uuidAux: uuidAuxProps,
    updateUser: func,
    updateUuidAux: func,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const {
      status, updateUser, updateUuidAux, notifySuccess,
    } = this.props;
    const { user: rawUser, uuidAux: rawAux } = status;
    const { result } = rawUser;
    const { id } = result;
    const { result: uuidAuxResult } = rawAux;
    const { id: uuidAuxID } = uuidAuxResult;

    const user = immutable.wrap(pick(result, ['id', 'type', 'attributes.name', 'attributes.phoneNumber']))
      .set('attributes.name', values.name)
      // .set('attributes.email', values.email)
      .set('attributes.phoneNumber', values.phoneNumber)
      .value();
    let uuidAux = immutable.wrap(pick(uuidAuxResult, ['id', 'type', 'attributes.uuid', 'attributes.uuidInfo']))
      .set('attributes.uuidInfo.housingInfo.lookingFor', values.lookingFor)
      .set('attributes.uuidInfo.residentInfo.fullName', values.residentName)
      .set('attributes.uuidInfo.financialInfo.maxMonthlyBudget', values.monthlyBudget)
      .set('attributes.uuidInfo.housingInfo.moveTimeline', values.timeToMove);

    if (values.searchingCity) {
      const [city, state] = values.searchingCity.split(',');
      const locationInfo = {
        city,
        state,
      };
      uuidAux.set('attributes.uuidInfo.locationInfo', locationInfo);
    }
    uuidAux = uuidAux.value();

    const userPromise = () => updateUser({ id }, user);
    const uuidAuxPromise = () => updateUuidAux({ id: uuidAuxID }, uuidAux);

    return userPromise().then(uuidAuxPromise).then(notifySuccess('Details Updated Successfully'))
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
    const { user, uuidAux, ...props } = this.props;
    const initialValues = convertUserToProfileFormValues(user, uuidAux);
    let emailWarning = null;
    const hasCustomerRole = userIs(user, CUSTOMER_ROLE);
    if (hasCustomerRole) {
      emailWarning = 'Enter your email so your agent can help you by answering your questions and sending recommended communities.';
    }
    const messageObj = {
      email: {
        required: emailWarning,
      },
    };
    const warn = createValidator({
      email: [required],
    }, messageObj);
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        hasCustomerRole={hasCustomerRole}
        user={user}
        warn={warn}
        {...props}
      />
    );
  }
}
