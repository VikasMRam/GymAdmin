import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, object } from 'prop-types';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';

import PropertyDetail from 'sly/components/organisms/PropertyDetail';

class PropertyDetailContainer extends Component {
  static propTypes = {
    // TODO: shape
    property: object,
    propertySlug: string.isRequired,
  };

  render() {
    const { detail } = this.props;
    return <PropertyDetail detail={detail} />;
  }
}

const mapStateToProps = (state, { propertySlug }) => ({
  detail: getDetail(state, 'property', propertySlug),
});

export default connect(mapStateToProps)(PropertyDetailContainer);
