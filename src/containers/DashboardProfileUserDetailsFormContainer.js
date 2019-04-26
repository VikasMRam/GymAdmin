import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
import { getRelationship } from 'redux-bees';
import { connect } from 'react-redux';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation/index';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser } from 'sly/services/newApi';
import query from 'sly/services/newApi/query';

const emailWarning = 'Enter your email so your agent can help you by answering your questions and sending recommended communities.';
const messageObj = {
  email: {
    required: emailWarning,
  },
};

const warn = createValidator({
  email: [required],
}, messageObj);

const validate = createValidator({
  name: [required],
  email: [email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'DashboardProfileUserDetailsForm',
  destroyOnUnmount: false,
  warn,
  validate,
})(DashboardProfileUserDetailsForm);

const convertUserToProfileFormValues = (user) => {
  const result = {};
  const {
    name, email, phoneNumber, uuidAux,
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
@connect((state, props) => ({
  uuidAux: getRelationship(state, props.status.user.result, 'uuidAux'),
}))
@query('updateUser', 'updateUser')
@query('updateUuidAux', 'updateUuidAux')
export default class DashboardProfileUserDetailsFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    status: shape({
      user: object,
    }),
    uuidAux: uuidAuxProps,
    updateUser: func,
    updateUuidAux: func,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const {
      status, uuidAux: rawAux, updateUser, updateUuidAux, notifySuccess,
    } = this.props;
    const { user: rawUser } = status;
    const { result } = rawUser;
    const { id } = result;
    const user = immutable(pick(result, ['id', 'type', 'attributes.name', 'attributes.phoneNumber']))
      .set('attributes.name', values.name)
      // .set('attributes.email', values.email)
      .set('attributes.phoneNumber', values.phoneNumber)
      .value();
    const uuidAux = immutable(pick(rawAux, ['id', 'type', 'attributes.uuid', 'attributes.uuidInfo']))
      .set('attributes.uuidInfo.housingInfo.lookingFor', values.lookingFor)
      .set('attributes.uuidInfo.residentInfo.fullName', values.residentName)
      .set('attributes.uuidInfo.financialInfo.maxMonthlyBudget', values.monthlyBudget)
      .set('attributes.uuidInfo.housingInfo.moveTimeline', values.timeToMove)
      .value();

    const userPromise = () => updateUser({ id }, user);
    const uuidAuxPromise = () => updateUuidAux({ id: uuidAux.id }, uuidAux);

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
    const { user, ...props } = this.props;
    const initialValues = convertUserToProfileFormValues(user);
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}
