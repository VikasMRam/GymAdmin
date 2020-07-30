import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import { withAuth, query } from 'sly/web/services/api';
import { createValidator, required } from 'sly/web/services/validation';
import ProviderFindCommunity from 'sly/common/services/auth/components/ProviderFindCommunity';

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
@query('claimCommunity', 'claimCommunity')

export default class ProviderFindCommunityContainer extends Component {
  static propTypes = {
    authenticated: object,
    claimCommunity: func,
    onClaimApproved: func,
    onApprovalNeeded: func,
  };

  state = {
    community: null,
  };

  // todo: test if it works
  static getDerivedStateFromProps({ authenticated }, { community }) {
    if (!community && authenticated &&
      authenticated.options && authenticated.options.community) {
      return {
        community: authenticated.options.community,
      };
    }

    return null;
  }

  handleSubmit = () => {
    const { authenticated, claimCommunity, onClaimApproved, onApprovalNeeded } = this.props;
    const { community } = this.state;
    clearSubmitErrors();

    // send claim request
    return claimCommunity({ id: community.value })
      .then((resp) => {
        authenticated.options.community = community;
        resp.status === 200 ? onClaimApproved() : onApprovalNeeded();
      })
      .catch((data) => {
        // TODO: Need to set a proper way to handle server side errors
        const errorMessage = Object.values(data.body.errors).join('. ');
        throw new SubmissionError({ _error: errorMessage });
      });
  };

  onSelectChange = (option) => {
    this.setState({ community: option });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
        onSelectChange={this.onSelectChange}
        community={this.state.community}
      />
    );
  }
}
