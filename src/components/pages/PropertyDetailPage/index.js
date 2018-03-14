import React, { Component } from 'react';
import PropertyDetailContainer from 'sly/containers/PropertyDetailContainer';
import RCBModal from 'sly/components/organisms/RCBModal';

const getPropertySlug = match => match.params.slug;

export default class PropertyDetailPage extends Component {
  render() {
    const { match } = this.props;
    const slug = getPropertySlug(match);
    return (
      <div className="thisWillBeALayout">
        <PropertyDetailContainer slug={slug} />
        <RCBModal propertySlug={slug} />
      </div>
    );
  }
}
