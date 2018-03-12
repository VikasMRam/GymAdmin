import React, { Component } from 'react';
import PropertyDetailContainer from '../../../containers/PropertyDetailContainer';
import RCBModal from '../../organisms/RCBModal';

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
