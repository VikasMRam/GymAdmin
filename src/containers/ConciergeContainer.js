import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { string, func, bool } from 'prop-types';

import { getDetail } from 'sly/store/selectors';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import RCBModalContainer from 'sly/containers/RCBModalContainer';

import {
  resourceDetailReadRequest,
  resourceCreateRequest,
} from 'sly/store/resource/actions';

class ConciergeContainer extends Component {
  static propTypes = {
    getUserActions: func.isRequired,
    propertySlug: string.isRequired,
    userRequestedCB: bool.isRequired,
  };

  static defaultProps = {
    userRequestedCB: false,
  };

  componentWillMount() {
    const { getUserActions } = this.props;
    getUserActions();
  }

  submit = data => {
    const { submit } = this.props;
    submit(data);
  }

  render() {
    const { userRequestedCB } = this.props;

    if (!userRequestedCB) {
      return [
        <ConversionFormContainer onSubmit={this.submit} />,
        <RCBModalContainer />
      ];
    }
    return <div> Thank you </div>;
  }
}

const mapStateToProps = (state, { propertySlug }) => {
  const userActions = getDetail(state, 'userAction');
  console.log('userActions', userActions);
  return {
    propertySlug,
  }
};

const mapDispatchToProps = dispatch => ({
  submit: data => {
    data.slug = ownProps.propertySlug;
    return dispatch(resourceCreateRequest('platform/user_actions', data));
  },
  getUserActions: () => {
    dispatch(resourceDetailReadRequest('userAction'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeContainer);
