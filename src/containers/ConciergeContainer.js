import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { string, func, bool, object } from 'prop-types';

import { getDetail } from 'sly/store/selectors';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import Thankyou from 'sly/components/molecules/Thankyou';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import RCBModalContainer from 'sly/containers/RCBModalContainer';

import {
  resourceDetailReadRequest,
  resourceCreateRequest,
} from 'sly/store/resource/actions';

class ConciergeContainer extends Component {
  static propTypes = {
    fetchData: func.isRequired,
    // TODO: shape
    property: object,
    userRequestedCB: bool,
  };

  static defaultProps = {
    userRequestedCB: false,
  };

  componentWillMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  submit = data => {
    const { submit } = this.props;
    submit(data);
  }

  render() {
    const { userRequestedCB, property } = this.props;

    if (!property) return null;

    if (!userRequestedCB) {
      return [
        <ConversionFormContainer onSubmit={this.submit} />,
        <RCBModalContainer />
      ];
    }
    return <Thankyou community={property} />;
  }
}

const mapStateToProps = (state, { propertySlug }) => {
  const userActions = getDetail(state, 'userAction');
  const userRequestedCB = userActions && (userActions.profilesContacted || [])
    .some(property => property.slug === propertySlug);
  const property = getDetail(state, 'property', propertySlug);
  return { userRequestedCB, property };
};

const mapDispatchToProps = (dispatch, { propertySlug }) => ({
  submit: data => {
    data.slug = propertySlug;
    return dispatch(resourceCreateRequest('platform/user_actions', data));
  },
  fetchData: () => {
    dispatch(resourceDetailReadRequest('property', propertySlug));
    dispatch(resourceDetailReadRequest('userAction'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConciergeContainer);
