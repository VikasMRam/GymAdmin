import React, { Component } from 'react';
import { modalShow, resourceDetailReadRequest } from 'store/actions';
import { connect } from 'react-redux';

import { getDetail } from 'store/entities/selectors';

import PropertyPage from 'sly/components/pages/PropertyPage';

class PropertyDetailPage extends Component {
  componentWillMount() {
    const { match, readProp } = this.props;
    readProp(match.params.slug);
  }

  render() {
    return <PropertyPage {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  state,
  detail: getDetail(state.entities, 'properties', props.match.params.slug), // UGLY?
});

const mapDispatchToProps = dispatch => ({
  readProp: id => dispatch(resourceDetailReadRequest('properties', id)),
  onClick: () => {
    console.log('Saw this on general  Click');
    return dispatch(modalShow('login'));
  }, // {console.log('Saw this on Click')},
  onLogout: () => {
    console.log('Saw this on logout Click');
  },
  onLogin: () => {
    console.log('Saw this on login Click');
  },
  onFacebookLogin: () => {
    console.log('Saw this on fb Click');
  },
  onClose: () => {
    console.log('Saw this on Close');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPage);
