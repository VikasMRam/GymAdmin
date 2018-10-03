import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';

import {
  createValidator,
  required,
  email,
  notZero,
} from 'sly/services/validation';

import CommunityAddRatingForm from 'sly/components/organisms/CommunityAddRatingForm';

const validate = createValidator({
  comments: [required],
  value: [required, notZero],
  name: [required],
  email: [required, email],
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
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then((data) => {
        const errorMessage = data.errors[0].detail;
        throw new SubmissionError({ _error: errorMessage });
      });
    });
  }

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
