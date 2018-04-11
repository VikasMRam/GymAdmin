import React, { Component } from 'react';
import PropertyDetailContainer from 'sly/containers/PropertyDetailContainer';
import ConciergeContainer from 'sly/containers/ConciergeContainer';

const getPropertySlug = match => match.params.propertySlug;

export default class PropertyDetailPage extends Component {
  render() {
    const { match } = this.props;
    const propertySlug = getPropertySlug(match);

    // TODO: Layout here
    return (
      <div className="thisWillBeALayout">
        <PropertyDetailContainer propertySlug={propertySlug} />
        <ConciergeContainer propertySlug={propertySlug} />
      </div>
    );
  }
}
