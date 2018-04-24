import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';

import { SIMILAR_COMMUNITIES } from 'sly/services/api/actions';

import {
  resourceCreateRequest,
} from 'sly/store/resource/actions';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import SimilarCommunitiesForm from 'sly/components/organisms/SimilarCommunitiesForm';

const ReduxForm = reduxForm({
  form: 'similarCommunities',
  initialValues: {
    similar_tags: [],
    similar_communities: [],
  },
})(SimilarCommunitiesForm);

class SimilarCommunitiesFormContainer extends Component {
  static propTypes = {
    community: object.isRequired,
    next: func.isRequired,
  };

  submit = data => {
    const { submit, user, next } = this.props;
    const { similar_communities, ...rest } = data;
    submit({
      action: SIMILAR_COMMUNITIES,
      value: {
        user,
        propertyIds: similar_communities,
      }
    }).then(next);
  }

  render() {
    const { submit, ...props } = this.props;
    return <ReduxForm onSubmit={this.submit} {...props} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: data => {
    return dispatch(resourceCreateRequest('userAction', data));
  },
});

const selectFormData = (state, form) => (!state.form || !state.form[form])
  ? null
  : state.form[form].values;

const mapStateToProps = state => ({
  user: selectFormData(state, 'ConversionForm'),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimilarCommunitiesFormContainer);

