import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import api from 'sly/web/services/api/apiInstance';
import { withUser, prefetch, query } from 'sly/web/services/api';

import {
  createValidator,
  required,
  email,
  isValidRating,
} from 'sly/web/services/validation';

import { community as communityPropType } from 'sly/web/propTypes/community';
import CommunityAddRatingForm from 'sly/web/components/organisms/CommunityAddRatingForm';
import Thankyou from 'sly/web/components/molecules/Thankyou';
import { PROFILE_RATING } from 'sly/web/services/api/constants';

const validate = createValidator({
  comments: [required],
  value: [required, isValidRating],
  name: [required],
  email: [required, email],
});

const ReduxForm = reduxForm({
  form: 'CommunityAddRatingForm',
  destroyOnUnmount: true,
  validate,
})(CommunityAddRatingForm);

@withRouter

@withUser

@query('createAction', 'createUuidAction')

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))

export default class CommunityAddRatingFormContainer extends Component {
  static propTypes = {
    match: object,
    user: object,
    community: communityPropType,
    status: object.isRequired,
    showModal: func,
    createAction: func,
  };

  handleOnSubmit = (values) => {
    const {
      community, status, showModal, createAction, match,
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

    return api.createRating(payload)
      .then(({ body }) => createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: community.id,
            name,
            email,
            entityType: 'Community',
            ratedId: body.data.id,
            ratedValue: parseInt(value, 10),
          },
          actionPage: match.url,
          actionType: PROFILE_RATING,
        },
      }))
      .then(() => {
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

