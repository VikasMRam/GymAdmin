import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, bool, string } from 'prop-types';
import { reduxForm, SubmissionError, clearSubmitErrors } from 'redux-form';

import { resourceCreateRequest } from 'sly/store/resource/actions';
import { isResourceCreateRequestInProgress } from 'sly/store/selectors';
import { COMMUNITY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import ShareCommunityForm from 'sly/components/organisms/ShareCommunityForm';

import {
  createValidator,
  required,
  email,
  emails,
} from 'sly/services/validation';

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

class ShareCommunityFormContainer extends Component {
  static propTypes = {
    createUserShare: func,
    onSuccess: func,
    notifyInfo: func,
    isCreating: bool,
    communitySlug: string.isRequired,
    clearSubmitErrors: func,
  };

  handleOnSubmit = (data) => {
    const {
      createUserShare, communitySlug, notifyInfo, clearSubmitErrors,
      onSuccess,
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

    clearSubmitErrors();
    return createUserShare(body)
      .then(() => {
        notifyInfo('Community has been shared.');
        onSuccess();
      })
      .catch(() => {
        throw new SubmissionError({ _error: 'Failed to share community. Please try again.' });
      });
  };

  render() {
    const { isCreating, ...props } = this.props;

    return (
      <ReduxForm
        onSubmit={this.handleOnSubmit}
        submitting={isCreating}
        {...props}
      />
    );
  }
}

const mapStateToProps = state => ({
  isCreating: isResourceCreateRequestInProgress(state, 'userShare'),
});

const mapDispatchToProps = dispatch => ({
  createUserShare: data => dispatch(resourceCreateRequest('userShare', data)),
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareCommunityFormContainer);
