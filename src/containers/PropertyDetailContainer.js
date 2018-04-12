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
    function onLeaveReview() {
      console.log('OnLeaveReview from Container');
    }
    if (detail) {
      return <PropertyDetail {...detail} onLeaveReview={onLeaveReview} />;
    }
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state, { propertySlug }) => ({
  detail: getDetail(state, 'property', propertySlug),
});

export default connect(mapStateToProps)(PropertyDetailContainer);
