import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, bool } from 'prop-types';

import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import { withUser } from 'sly/services/newApi';

import {
  createValidator,
  createBooleanValidator,
  notProvided,
  required,
  email,
  usPhone,
} from 'sly/services/validation';
import ConversionForm from 'sly/components/organisms/ConversionForm';
import SlyEvent from 'sly/services/helpers/events';

const validate = createValidator({
  full_name: [required],
  email: [email],
  phone: [required, usPhone],
});

const hasOnlyEmail = createBooleanValidator({
  name: [notProvided],
  email: [required, email],
  phoneNumber: [notProvided],
});

const ReduxForm = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(ConversionForm);

@withUser

export default class ConversionFormContainer extends Component {
  static propTypes = {
    community: object,
    gotoWhatNext: func.isRequired,
    user: object,
    submitExpressConversion: func.isRequired,
    submitRegularConversion: func.isRequired,
    express: bool.isRequired,
    showModal: func,
    hideModal: func,
  };

  static defaultProps = {
    express: false,
  };

  openAdvisorHelp = () => {
    const { showModal, hideModal } = this.props;
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };

  render() {
    const { openAdvisorHelp } = this;
    const {
      submitExpressConversion,
      submitRegularConversion,
      gotoWhatNext,
      user,
      community,
      express,
      ...props
    } = this.props;

    const { email, name, phoneNumber } = user || {};

    // have to put empty values as letting undefined would make the fields
    // uncontrolled and we would get a warning
    const initialValues = {
      email: email || '',
      phone: phoneNumber || '',
      full_name: name || '',
    };
    let agent = null;
    if (community) {
      const { agents } = community;
      [agent] = agents;
    }
    const submitConversion = express
      ? submitExpressConversion
      : submitRegularConversion;


    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={submitConversion}
        agent={agent}
        gotoWhatNext={gotoWhatNext}
        community={community}
        hasOnlyEmail={user && hasOnlyEmail(user)}
        onAdvisorHelpClick={() => {
          SlyEvent.getInstance().sendEvent({
            category: 'advisor-learn-more',
            action: 'click',
            label: community.id,
            value: '',
          });
          openAdvisorHelp();
        }}
        {...props}
      />
    );
  }
}

