import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, object } from 'prop-types';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { withRouter } from 'react-router';

import api from 'sly/services/api/apiInstance';
import { query } from 'sly/services/api';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import ShareCommunityForm from 'sly/components/organisms/ShareCommunityForm';

import {
  createValidator,
  required,
  email,
  emails,
} from 'sly/services/validation';
import { USER_SHARE } from 'sly/services/api/constants';

const formName = 'ShareCommunityForm';

const validate = createValidator({
  to: [required, emails],
  from: [required, email],
});

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
  validate,
})(ShareCommunityForm);

const mapDispatchToProps = {
  createUserShare: api.createUserShare.asAction,
  clearSubmitErrors,
};

@withRouter

@query('createAction', 'createUuidAction')

@connect(null, mapDispatchToProps)

export default class ShareCommunityFormContainer extends Component {
  static propTypes = {
    status: object,
    match: object,
    createUserShare: func,
    onSuccess: func,
    notifyInfo: func,
    communitySlug: string.isRequired,
    clearSubmitErrors: func,
    createAction: func,
  };

  state = { submitting: false };

  handleOnSubmit = (data) => {
    const {
      createUserShare, communitySlug, notifyInfo, clearSubmitErrors,
      onSuccess,
      createAction,
      match,
    } = this.props;
    const body = {
      toEmails: data.to.split(','),
      message: data.message,
      entitySlug: communitySlug,
      entityType: COMMUNITY_ENTITY_TYPE,
    };
    if (data.from) {
      body.fromEmail = data.from;
    }

    clearSubmitErrors(formName);
    return this.setState({ submitting: true }, () => createUserShare(body)
      .then(() => createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            entitySlug: communitySlug,
            entityType: 'Community',
            message: body.message,
            fromEmail: body.fromEmail,
            toEmails: body.toEmails,
          },
          actionPage: match.url,
          actionType: USER_SHARE,
        },
      }))
      .then(() => {
        notifyInfo('Community has been shared.');
        onSuccess();
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to share community. Please try again.' });
      })
      .finally(() => this.setState({ submitting: false })));
  };

  render() {
    const { ...props } = this.props;

    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        submitting={this.state.submitting}
        {...props}
      />
    );
  }
}

