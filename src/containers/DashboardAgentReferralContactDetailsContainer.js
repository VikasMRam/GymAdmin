import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import DashboardAgentReferralContactDetails from 'sly/components/organisms/DashboardAgentReferralContactDetails/index';

const ReduxForm = reduxForm({
  form: 'DashboardAgentReferralContactDetails',
  destroyOnUnmount: false,
})(DashboardAgentReferralContactDetails);


export default class DashboardAgentReferralContactDetailsContainer extends Component {
  static propTypes = {
    onSubmit: func,
  };

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    return onSubmit(values);
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
