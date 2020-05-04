import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import { PROVIDER_OD_ROLE } from 'sly/constants/roles';
import { withAuth } from 'sly/services/api';
import { createValidator, required, email, minLength, usPhone } from 'sly/services/validation';
import ProviderFindCommunity from 'sly/services/auth/components/ProviderFindCommunity';

const validate = createValidator({
  community: [required],
});

const ReduxForm = reduxForm({
  form: 'ProviderFindCommunity',
  validate,
})(ProviderFindCommunity);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors('ProviderFindCommunity'),
};

@withAuth
@connect(null, mapDispatchToProps)

export default class ProviderFindCommunityContainer extends Component {
  static propTypes = {
    authenticated: object,
  };

  state = {
    community: {},
  };

  handleSubmit = (data) => {
    const { authenticated, onClaimApproved, onApprovalNeeded } = this.props;
    const { community } = this.state;
    clearSubmitErrors();
    console.log(data);
    console.log(community);
  };

  onSelectChange = (option) => {
    this.setState({community: option});
  };

  render() {
    return <ReduxForm
      {...this.props}
      onSubmit={this.handleSubmit}
      onSelectChange={this.onSelectChange}
      community={this.state.community}
    />;
  }
}
