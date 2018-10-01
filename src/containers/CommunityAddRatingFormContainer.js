import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

import {
  createValidator,
  required,
} from 'sly/services/validation';

import CommunityAddRatingForm from 'sly/components/organisms/CommunityAddRatingForm';

const validate = createValidator({
  comments: [required],
  value: [required],
  name: [required],
  email: [required],
});

const ReduxForm = reduxForm({
  form: 'CommunityAddRatingForm',
  destroyOnUnmount: false,
  validate,
})(CommunityAddRatingForm);

class CommunityAddRatingFormContainer extends Component {
  static propTypes = {
    user: object,
    communitySlug: string.isRequired,
    addRating: func,
    loadCommunity: func,
    setModal: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, addRating, loadCommunity,
    } = this.props;
    const {
      comments, value, name, email,
    } = values;
    const payload = {
      communitySlug,
      comments,
      value: parseFloat(value),
      name,
      email,
    };
    return addRating(payload).then(() => {
      this.setModalParam(null);
      loadCommunity(communitySlug);
    }).catch((r) => {
      const { status } = r.response;
      let errorMessage = null;
      switch (status) {
        case 400: {
          errorMessage = 'Name and Email are Mandatory';
          break;
        }
        case 409: {
          errorMessage = 'User Already Registered. Please Login to Proceed';
          break;
        }
        default: {
          errorMessage = `Unknown Error. Error Status: ${status}`;
        }
      }
      throw new SubmissionError({ _error: errorMessage });
    });
  }

  render() {
    const {
      user, ...props
    } = this.props;
    const initialValues = {
      comments: '',
      value: 5,
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

const mapDispatchToProps = dispatch => ({
  addRating: data => dispatch(resourceCreateRequest('rating', data)),
  loadCommunity: slug => dispatch(resourceDetailReadRequest('community', slug, {
    include: 'similar-communities,questions,agents',
  })),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommunityAddRatingFormContainer);
