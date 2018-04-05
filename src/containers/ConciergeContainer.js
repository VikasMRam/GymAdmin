import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { string } from 'prop-types';

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
  static propTypes = {
    propertySlug: string.isRequired,
  };

  componentWillMount() {
    const { getUser } = this.props;
    getUser();
  }

  submit = data => {
    const { submit } = this.props;
    submit(data);
  }

  render() {
    const { propertySlug, userRequestedCB } = this.props;
    if (!propertySlug) return null;

    if (!userRequestedCB) {
      return [
        <ConversionFormContainer
          onSubmit={this.submit} />,
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
});

const mapDispatchToProps = dispatch => ({
  submit: (data) => {
    data.slug = ownProps.propertySlug;
    return dispatch(resourceCreateRequest('platform/user_actions', data));
  },
  getUser: () => {
    // TODO: FIXME: hardcoded uuid
    console.error('fetching the data with hardcoded uuid from ConciergeContainer');
    dispatch(resourceDetailReadRequest('userActions', null, {
      uuid: '3fd36c8b-1cda-4381-aac0-9d937edd1037',
    }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeContainer);
