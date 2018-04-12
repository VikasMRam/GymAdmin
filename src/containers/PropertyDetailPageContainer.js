import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDetail } from 'sly/store/selectors';
import PropertyDetailPage from 'sly/components/pages/PropertyDetailPage';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class PropertyDetailPageContainer extends Component {
  componentWillMount() {
    const { fetchData, propertySlug } = this.props;
    fetchData(propertySlug);
  }

  render() {
    // TODO: Layout here
    const { propertySlug, property, userActions } = this.props;
    if (!property || !userActions) return <div>if you see this, something went wrong</div>;
    return <PropertyDetailPage propertySlug={propertySlug} property={property} userActions={userActions} />;
  }
}

const getPropertySlug = match => match.params.propertySlug;
const mapStateToProps = (state, { match }) => {
  const propertySlug = getPropertySlug(match);
  return {
    propertySlug,
    property: getDetail(state, 'property', propertySlug),
    userActions: getDetail(state, 'userAction'),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchData: slug => {
    dispatch(resourceDetailReadRequest('property', slug, { include: 'similar-communities,reviews' }));
    dispatch(resourceDetailReadRequest('userAction'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPageContainer);
