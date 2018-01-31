import React, { Component } from 'react';
import { resourceDetailReadRequest } from 'store/actions';
import { connect } from 'react-redux';

import { getDetail } from 'store/entities/selectors';
import PropertyPage from "../components/pages/PropertyPage";

class PropertyDetailPage extends Component {
  componentWillMount() {
    const { match,readProp } = this.props;
    readProp(match.params.slug);

  }

  render() {
    const { state } = this.props;
    console.info('Saw this props',this.props);
    return (
      <PropertyPage props={state.detail}/>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
  detail: getDetail(state, 'properties'),
});

const mapDispatchToProps = dispatch => ({
  readProp: (id) => dispatch(resourceDetailReadRequest('properties',id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPage);
