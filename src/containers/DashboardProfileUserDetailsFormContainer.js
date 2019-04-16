import React, { Component } from 'react';
import { shape, object, func } from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';
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

export default class DashboardProfileUserDetailsFormContainer extends Component {
  static propTypes = {
    user: userPropType,
    status: shape({
      user: object,
    }),
    uuidAux: uuidAuxProps,
    api: object,
    notifySuccess: func,
  };

  handleSubmit = (values) => {
    const {
      status, uuidAux, api, notifySuccess,
    } = this.props;
    const { user } = status;
    const { result } = user;
    return api.updateUser({ id: result.id }, {
      data: produce(result, (draft) => {
        draft.relationships.uuidAux = {
          data: uuidAux,
        };
        draft.attributes.name = values.name;
        // draft.attributes.email = values.email;
        draft.attributes.phoneNumber = values.phoneNumber;

        if (!draft.relationships.uuidAux.data) {
          draft.relationships.uuidAux.data = {
            attributes: {},
          };
        }
        const { uuidInfo } = draft.relationships.uuidAux.data.attributes;

        let newUuidInfo = null;
        if (!uuidInfo) {
          newUuidInfo = {
            housingInfo: {},
            residentInfo: {},
            financialInfo: {},
          };
        } else {
          newUuidInfo = uuidInfo;
        }
        newUuidInfo.housingInfo.lookingFor = values.lookingFor;
        newUuidInfo.residentInfo.fullName = values.residentName;
        newUuidInfo.financialInfo.maxMonthlyBudget = parseInt(values.monthlyBudget, 10);
        newUuidInfo.housingInfo.moveTimeline = values.timeToMove;

        draft.relationships.uuidAux.data.attributes.uuidInfo = newUuidInfo;
      }),
    })
      .then(() => {
        notifySuccess('Details Updated Successfully');
      })
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
