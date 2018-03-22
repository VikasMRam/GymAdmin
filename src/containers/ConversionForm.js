import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { userConversionRequest } from 'sly/store/actions';
import { getUserConverted } from 'sly/store/users/selectors';
import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';
import ConversionForm from 'sly/components/organisms/ConversionForm';
import { Button } from 'sly/components/atoms';

class ConversionFormContainer extends Component {
  componentWillMount() {
    // console.log('This is my props',this.props);
  }
  render() {
    // if (list()%3==0) {
    //   return <div>Thank you for submiting your message. <Button>Search</Button></div>
    // } else{
    //
    // }
    return <ConversionForm {...this.props} />;
  }
}

// const onSubmit = ;

const mapStateToProps = (state, props) => ({
  state,
  list: (statesome) => {
    console.log('Saw state of the world', state);
    return Math.floor(Math.random() * 8);
  },
  converted: getUserConverted(state, props),

  validate,
  onSubmit: (data, dispatch) => {
    // POST TO USER ACTIONS
    // AND THEN UPDATE USER STATE? (state.user has to be updated with profiles rcb)
    // SAYING PROFILE HAS BEEN UPDATED?
    data.slug = props.detail.id;
    return dispatch(userConversionRequest(data));
  },
});
const mapDispatchToProps = dispatch => ({
  some: (s) => {
    console.log('Saome', s);
  },
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
