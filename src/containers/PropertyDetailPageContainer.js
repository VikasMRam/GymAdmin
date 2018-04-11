import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const { propertySlug } = this.props;
    return <PropertyDetailPage propertySlug={propertySlug} />;
  }
}

const getPropertySlug = match => match.params.propertySlug;
const mapStateToProps = (state, { match }) => ({
  propertySlug: getPropertySlug(match),
});

const mapDispatchToProps = dispatch => ({
  fetchData: slug => {
    dispatch(resourceDetailReadRequest('property', slug));
    dispatch(resourceDetailReadRequest('userAction'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPageContainer);
