import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, object } from 'prop-types';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { LISTING_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import ShareListingForm from 'sly/web/listing/components/ShareListingForm';
import {
  createValidator,
  required,
  email,
  emails,
} from 'sly/web/services/validation';
import { USER_SHARE } from 'sly/web/services/api/constants';

const formName = 'ShareListingForm';

const validate = createValidator({
  to: [required, emails],
  from: [required, email],
});

const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
  validate,
})(ShareListingForm);

const mapDispatchToProps = {
  clearSubmitErrors,
};

@withRouter

@query('createAction', 'createUuidAction')
@query('createUserShare')

@connect(null, mapDispatchToProps)

export default class ShareListingFormContainer extends Component {
  static propTypes = {
    status: object,
    match: object,
    createUserShare: func,
    onSuccess: func,
    notifyInfo: func,
    listingSlug: string.isRequired,
    clearSubmitErrors: func,
    createAction: func,
  };

  state = { submitting: false };

  handleOnSubmit = (data) => {
    const {
      createUserShare, listingSlug, notifyInfo, clearSubmitErrors,
      onSuccess,
      createAction,
      match,
    } = this.props;
    const body = {
      toEmails: data.to.split(','),
      message: data.message,
      entitySlug: listingSlug,
      entityType: LISTING_ENTITY_TYPE,
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
            entitySlug: listingSlug,
            entityType: 'Listing',
            message: body.message,
            fromEmail: body.fromEmail,
            toEmails: body.toEmails,
          },
          actionPage: match.url,
          actionType: USER_SHARE,
        },
      }))
      .then(() => {
        notifyInfo('Listing has been shared.');
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to share listing. Please try again.' });
      })
      .finally(() => {
        this.setState({ submitting: false });
        onSuccess();
      }));
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
