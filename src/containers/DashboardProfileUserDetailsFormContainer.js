import React, { Component } from 'react';
import { shape, object } from 'prop-types';
import { reduxForm } from 'redux-form';
import { getRelationship } from 'redux-bees';
import { connect } from 'react-redux';
import produce from 'immer';

import DashboardProfileUserDetailsForm from 'sly/components/organisms/DashboardProfileUserDetailsForm';
import { createValidator, required, email, usPhone } from 'sly/services/validation/index';
import userPropType, { uuidAux as uuidAuxProps } from 'sly/propTypes/user';
import { withUser } from 'sly/services/newApi';

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
    const {
      housingInfo, residentInfo, financialInfo, locationInfo,
    } = uuidInfo;
    const { lookingFor, moveTimeline } = housingInfo;
    const { fullName } = residentInfo;
    const { maxMonthlyBudget } = financialInfo;
    const { city, state } = locationInfo;
    const searchingCity = `${city}, ${state}`;
    result.lookingFor = lookingFor;
    result.residentName = fullName;
    result.timeToMove = moveTimeline;
    result.monthlyBudget = maxMonthlyBudget;
    result.searchingCity = searchingCity;
    return result;
  }
  return result;
};


@withUser

@connect((state, props) => ({
  uuidAux: getRelationship(state, props.status.user.result, 'uuidAux'),
}))

export default class DashboardProfileUserDetailsFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    status: shape({
      user: object,
    }),
    uuidAux: uuidAuxProps,
    api: object,
  };

  handleSubmit = (values) => {
    const { status, uuidAux, api } = this.props;
    const { user } = status;
    const { result } = user;
    api.updateUser({ id: result.id }, {
      data: produce(result, (draft) => {
        draft.relationships.uuidAux = {
          data: uuidAux,
        };
        draft.attributes.name = values.name;
        // draft.attributes.email = values.email;
        draft.attributes.phoneNumber = values.phoneNumber;

        const { uuidInfo } = draft.relationships.uuidAux.data.attributes;
        uuidInfo.housingInfo.lookingFor = values.lookingFor;
        uuidInfo.residentInfo.fullName = values.residentName;
        uuidInfo.financialInfo.maxMonthlyBudget = parseInt(values.monthlyBudget, 10);
        uuidInfo.housingInfo.moveTimeline = values.timeToMove;
      }),
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
