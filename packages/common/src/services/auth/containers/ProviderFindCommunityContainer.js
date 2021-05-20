import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { func, object } from 'prop-types';

import { parseURLQueryParams } from 'sly/web/services/helpers/url';
import { withAuth, normalizeResponse, query } from 'sly/web/services/api';
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

@withRouter
@withAuth
@connect(null, mapDispatchToProps)
@query('getCommunity')
@query('claimCommunity', 'claimCommunity')

export default class ProviderFindCommunityContainer extends Component {
  static propTypes = {
    location: object,
    getCommunity: func,
    authenticated: object,
    claimCommunity: func,
    onClaimApproved: func,
    onApprovalNeeded: func,
  };

  state = {
    community: null,
  };

  componentDidMount() {
    const { location, getCommunity } = this.props;
    const prop = parseURLQueryParams(location.search)?.prop;
    if (prop) {
      getCommunity({ id: prop }).then((resp) => {
        const community = normalizeResponse(resp.body);

        return this.setState({
          community: {
            value: community.id,
            label: `${community.name}: ${community.address.city}, ${community.address.state}`,
          },
        });
      });
    }
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
