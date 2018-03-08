import React, { Component } from 'react';
import ConversionFormContainer from '../../../containers/ConversionFormContainer';

export default class RCBModal extends Component {
  render() {
    const { propertySlug } = this.props;
    return (
      <ConversionFormContainer propertySlug={propertySlug} />
    );
  }
}
