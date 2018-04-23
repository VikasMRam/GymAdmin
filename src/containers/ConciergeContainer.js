import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import Thankyou from 'sly/components/molecules/Thankyou';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import RCBModal from 'sly/components/organisms/RCBModal';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';


class ConciergeContainer extends Component {
  static propTypes = {
    // TODO: shape
    property: object,
    userRequestedCB: bool,
  };

  static defaultProps = {
    userRequestedCB: false,
  };

  state = { modalIsOpen: false };

  next = (data) => {
    console.log('next', data); 
    this.setState({ modalIsOpen: true });
  };

  render() {
    const { userRequestedCB, property, className } = this.props;
    const column = (
      <div key="column" className={className}>
        { userRequestedCB
          ? <Thankyou community={property} onClose={() => {}} />
          : <ConversionFormContainer next={this.next} />
        }
      </div>
    );
    const { modalIsOpen } = this.state;
    // I return an array here as RCBModal is not even rendered here in the three
    return [ 
      column,
      <RCBModal key="modal" onClose={()=>{}} isOpen={modalIsOpen} community={property} />
    ];
  }
}

const isCallback = contact => contact.type === 'request_callback';
const mapStateToProps = (state, { propertySlug, userActions, property }) => {
  const userRequestedCB = userActions && (userActions.profilesContacted || [])
    .some(contact => contact.slug === propertySlug && isCallback(contact));
  return { userRequestedCB, property };
};

export default connect(mapStateToProps)(ConciergeContainer);
