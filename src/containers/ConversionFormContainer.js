import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { getDetail } from '../store/entities/selectors';
import { createValidator, required, email, usPhone } from 'services/validation';
import ConversionForm from '../components/organisms/ConversionForm';

import {
  resourceDetailReadRequest,
  resourceCreateRequest,
} from '../store/resource/actions';

class ConversionFormContainer extends Component {
  componentWillMount() {
    const { getUser } = this.props;
    getUser();
  }

  submit(data) {
    const { submit } = this.props;
    this.setState({
      sent: true,
    });
  }

  render() {
    const { propertySlug, userRequestedCB } = this.props;
    if (!propertySlug) return null;

    console.log('conversionForm', this.props);
    if (!userRequestedCB) {
      return <ConversionForm handleSubmit={data => this.submit(data)} />;
    }
    return <div> Thank you </div>;
  }
}

const userSelector = (state, ownProps) => {
  const user = getDetail(state.entities, 'me', 'info');
  if (!user) return {};
  const userRequestedCB = user.profilesContacted.requestCallback.includes(ownProps.propertySlug);
  return {
    user,
    userRequestedCB,
  };
};

// const onSubmit = ;

const mapStateToProps = (state, ownProps) => ({
  ...userSelector(state, ownProps),
  validate,
  submit: (data, dispatch) => {
    // POST TO USER ACTIONS
    // AND THEN UPDATE USER STATE? (state.user has to be updated with profiles rcb)
    // SAYING PROFILE HAS BEEN UPDATED?
    data.slug = ownProps.propertySlug;
    return dispatch(resourceCreateRequest('personalization/useractions/track', data));
  },
});
const mapDispatchToProps = dispatch => ({
  getUser: () =>
    dispatch(resourceDetailReadRequest('users', 'me', {
      uuid: 'e2867c96-20b7-4379-b597-d7bd0e49bab8',
    })),
});

const validate = createValidator({
  full_name: [required],
  email: [required, email],
  phone: [required, usPhone],
});

ConversionFormContainer = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
})(ConversionFormContainer);

export default connect(mapStateToProps, mapDispatchToProps)(ConversionFormContainer);
