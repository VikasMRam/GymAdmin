import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withUser, withApi, prefetch } from 'sly/services/newApi';

import {
  createValidator,
  required,
  email,
  notZero,
} from 'sly/services/validation';

import { community as communityPropType } from 'sly/propTypes/community';
import CommunityAddRatingForm from 'sly/components/organisms/CommunityAddRatingForm';
import Thankyou from 'sly/components/molecules/Thankyou';

const validate = createValidator({
  comments: [required],
  value: [required, notZero],
  name: [required],
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'CommunityAddRatingForm',
  destroyOnUnmount: true,
  validate,
})(CommunityAddRatingForm);

@withRouter

// FIXME: hack because addRating is not JSON:API so we can't use @query
@withApi
@connect(null, (dispatch, { api }) => ({
  createRating: data => dispatch(api.createRating(data)),
}))

@withUser

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))

export default class CommunityAddRatingFormContainer extends Component {
  static propTypes = {
    user: object,
    community: communityPropType,
    createRating: func,
    status: object.isRequired,
    showModal: func,
  };

  handleOnSubmit = (values) => {
    const {
      community, createRating, status, showModal,
    } = this.props;
    const {
      comments, value, name, email,
    } = values;
    const payload = {
      communitySlug: community && community.id,
      comments,
      value: parseFloat(value),
      name,
      email,
    };

    return createRating(payload).then(() => {
      showModal(<Thankyou subheading="Your review has been submitted for approval." />);
      return status.community.refetch();
    }).catch((response) => {
      const errorMessage = response.body.errors[0].detail;
      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    const {
      user, ...props
    } = this.props;

    const initialValues = {
      comments: '',
      value: 0,
    };

    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleOnSubmit}
        user={user}
        {...props}
      />
    );
  }
}

