import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { resourceDetailReadRequest } from '../store/resource/actions';
import { getDetail } from '../store/entities/selectors';

import PropertyDetail from '../components/organisms/PropertyDetail';

class PropertyDetailContainer extends Component {
  static propTypes = {
    name: string,
  };

  componentWillMount() {
    const { slug, readProperty } = this.props;
    readProperty(slug);
  }

  render() {
    const { detail } = this.props;
    return <PropertyDetail {...detail} />;
  }
}

const mapStateToProps = (state, { slug }) => ({
  detail: getDetail(state.entities, 'properties', slug) || {},
});

const mapDispatchToProps = dispatch => ({
  readProperty: slug => dispatch(resourceDetailReadRequest('properties', slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailContainer);
