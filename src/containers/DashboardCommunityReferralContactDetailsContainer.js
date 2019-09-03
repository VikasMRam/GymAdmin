import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import DashboardCommunityReferralContactDetails from 'sly/components/organisms/DashboardCommunityReferralContactDetails/index';

const ReduxForm = reduxForm({
  form: 'DashboardCommunityReferralContactDetails',
  destroyOnUnmount: false,
})(DashboardCommunityReferralContactDetails);


export default class DashboardCommunityReferralContactDetailsContainer extends Component {
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
