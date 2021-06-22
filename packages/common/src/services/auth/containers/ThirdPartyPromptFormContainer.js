import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { func, string, object } from 'prop-types';
import { connect } from 'react-redux';
import * as immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import { createValidator, usPhone } from 'sly/web/services/validation';
import { withUser, query } from 'sly/web/services/api';
import ThirdPartyInfoPromptForm from 'sly/common/services/auth/components/ThirdPartyInfoPromptForm';
import userPropType from 'sly/common/propTypes/user';
import SlyEvent from 'sly/web/services/helpers/events';


const formName = 'ThirdPartyLoginPromptForm';

const validate = createValidator({
  phone_number: [usPhone],
});

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(ThirdPartyInfoPromptForm);

const mapDispatchToProps = {
  clearSubmitErrors: (name = formName) => clearSubmitErrors(name),
};

const mapStateToProps = (state, props) => ({
  formState: state.form && state.form[props.form || formName] ? state.form[props.form || formName].values : {},
});

@withUser
@query('updateUser', 'updateUser')
@query('updateUuidAux', 'updateUuidAux')
@connect(mapStateToProps, mapDispatchToProps)

export default class ThirdPartyLoginPromptFormContainer extends Component {
  static propTypes = {
    clearSubmitErrors: func,
    onSubmit: func,
    form: string,
    formState: object,
    user: userPropType,
    updateUser: func,
    updateUuidAux: func,
    status: object,
  };

  componentDidMount=() => {
    const { onSubmit, user } = this.props;
    if (user && user.name && user.phoneNumber) {
      onSubmit();
    }
  }


  updatePhoneContactPreference = (phonePreference) => {
    const { updateUuidAux, status } = this.props;
    if (phonePreference) {
      const { uuidAux: { result: rawUuidAux } } =  status;
      const sendUuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.contactInfo.phonePreference', phonePreference);
      return updateUuidAux({ id: sendUuidAux.id }, sendUuidAux);
    }
    return Promise.resolve();
  };

  handleOnSubmit = ({ phonePreference, ...values }) => {
    const {
      status, clearSubmitErrors, updateUser, form, onSubmit,
    } = this.props;
    const { user: rawUser } = status;
    const { result } = rawUser;
    const { id, attributes } = result;

    const user = immutable.wrap(pick(result, ['id', 'type', 'attributes.name', 'attributes.phoneNumber']))
      .set('attributes.name', attributes.name || `${values.firstName}${values.lastName ? ` ${values.lastName}` : ''}`)
      .set('attributes.phoneNumber', values.phone_number)
      .value();

    clearSubmitErrors(form);
    return Promise.all([updateUser({ id }, user), this.updatePhoneContactPreference(phonePreference)])
      .then(onSubmit, SlyEvent.getInstance().sendEvent({ action: 'add-phone-number',
        category: 'third-party-login',
        label: 'phone',
        value: 'success',
      }))
      .catch((data) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(data.body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
  };


  render() {
    const { onSubmit, user, ...props } = this.props;
    if (!user) {
      return null;
    }
    return (
      <ReduxForm
        hasName={!!user.name}
        hasPhoneNumber={!!user.phoneNumber}
        {...props}
        onSubmit={this.handleOnSubmit}
      />
    );
  }
}
