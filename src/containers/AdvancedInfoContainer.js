import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';

import { ASSESSMENT } from 'sly/services/api/actions';

import {
  resourceCreateRequest,
} from 'sly/store/resource/actions';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import AdvancedInfoForm from 'sly/components/organisms/AdvancedInfoForm';

const ReduxForm = reduxForm({
  form: 'advancedInfo',
  initialValues: {
    type_of_care: [],
    type_of_room: [],
    time_to_move: [],
    budget: 5.5,
  },
})(AdvancedInfoForm);

class AdvancedInfoFormContainer extends Component {
  static propTypes = {
    community: object.isRequired,
    next: func.isRequired,
  };

  submit = data => {
    const { submit, community, next } = this.props;
    const { message, ...rest } = data;
    submit({
      action: ASSESSMENT,
      value: {
        user: { ...rest },
        message,
        propertyIds: [community.slug],
      }
    }).then(next);
  }

  render() {
    const { submit, ...props } = this.props;
    return <ReduxForm onSubmit={this.submit} {...props} />;
  }
}

const mapDispatchToProps = (dispatch, { propertySlug, next }) => ({
  submit: data => {
    data.slug = propertySlug;
    return dispatch(resourceCreateRequest('userAction', data));
  },
});

export default connect(null, mapDispatchToProps)(AdvancedInfoFormContainer);

