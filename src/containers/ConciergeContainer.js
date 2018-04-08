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
  debugger;
  const userActions = getDetail(state, 'userAction'); 
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
    // TODO: FIXME: hardcoded uuid
    console.error('fetching the data with hardcoded uuid from ConciergeContainer');
    dispatch(resourceDetailReadRequest('userAction', {
      uuid: 'e2867c96-20b7-4379-b597-d7bd0e49bab8',
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeContainer);
