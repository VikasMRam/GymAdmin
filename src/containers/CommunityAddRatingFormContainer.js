import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { string, func, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import {
  createValidator,
  required,
  email,
  notZero,
} from 'sly/services/validation';
import { getDetail } from 'sly/store/selectors';
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

class CommunityAddRatingFormContainer extends Component {
  static propTypes = {
    user: object,
    communitySlug: string.isRequired,
    addRating: func,
    loadCommunity: func,
    showModal: func,
  };

  handleOnSubmit = (values) => {
    const {
      communitySlug, addRating, loadCommunity, showModal,
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
      showModal(<Thankyou subheading="Your review has been submitted for approval." />);
      loadCommunity(communitySlug);
    }).catch((r) => {
      // TODO: Need to set a proper way to handle server side errors
      const { response } = r;
      return response.json().then((data) => {
        const errorMessage = data.errors[0].detail;
        throw new SubmissionError({ _error: errorMessage });
      });
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

const getCommunitySlug = match => match.params.communitySlug;

const mapStateToProps = (state, { location, match }) => {
  const communitySlug = getCommunitySlug(match);
  let community;
  let name;
  if (communitySlug) {
    (community = getDetail(state, 'community', communitySlug));
  }
  if (community) {
    ({ name } = community);
  }

  return {
    user: getDetail(state, 'user', 'me'),
    communitySlug,
    communityName: name,
    location,
  };
};

const mapDispatchToProps = dispatch => ({
  addRating: data => dispatch(resourceCreateRequest('rating', data)),
  loadCommunity: slug => dispatch(resourceDetailReadRequest('community', slug, {
    include: 'similar-communities,questions,agents',
  })),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommunityAddRatingFormContainer));
