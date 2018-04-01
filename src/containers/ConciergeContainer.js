import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { getDetail } from 'sly/store/entities/selectors';

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

    if (!userRequestedCB) {
      return [
        <ConversionFormContainer
          handleSubmit={data => this.submit(data)} />,
        <RCBModalContainer />
      ];
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

const mapStateToProps = (state, ownProps) => ({
  ...userSelector(state, ownProps),
  submit: (data, dispatch) => {
    // POST TO USER ACTIONS
    // AND THEN UPDATE USER STATE? (state.user has to be updated with profiles rcb)
    // SAYING PROFILE HAS BEEN UPDATED?
    data.slug = ownProps.propertySlug;
    return dispatch(resourceCreateRequest('platform/user_actions', data));
  },
});

const mapDispatchToProps = dispatch => ({
  getUser: () => {
    // TODO: FIXME: hardcoded uuid
    console.error('fetching the data with hardcoded uuid from ConciergeContainer');
    dispatch(resourceDetailReadRequest('platform', 'user_actions', {
      uuid: '3fd36c8b-1cda-4381-aac0-9d937edd1037',
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeContainer);
