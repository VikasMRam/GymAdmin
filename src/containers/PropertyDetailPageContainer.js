import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchState } from 'react-router-server';
import { getDetail } from 'sly/store/selectors';
import PropertyDetailPage from 'sly/components/pages/PropertyDetailPage';
import { isBrowser, isServer } from 'sly/config';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class PropertyDetailPageContainer extends Component {
  componentWillMount() {
    const { 
      fetchData, propertySlug, setServerState, hasServerState, cleanServerState 
    } = this.props;

    if(!hasServerState) {
      if (isServer) {
        fetchData(propertySlug).then(setServerState, setServerState);
      } else {
        fetchData(propertySlug);
      }
    } else if (isBrowser) {
      cleanServerState();
    }
  }

  render() {
    // TODO: Layout here
    const { propertySlug, property, userActions } = this.props;

    if (!property /*|| !userActions*/) {
      return <div>if you see this, something went wrong</div>;
    }
    return (
      <PropertyDetailPage 
        propertySlug={propertySlug} 
        property={property} 
        userActions={userActions} 
      />
    );
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
  fetchData: slug => Promise.all([ 
    dispatch(resourceDetailReadRequest('property', slug, { include: 'similar-communities,reviews' })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]),
});

const withServerState = fetchState(
  state => ({
    hasServerState: !!state.data,
  }),
  actions => ({
    setServerState: data => { 
      actions.done({ data });
    },
    cleanServerState: () => actions.done(),
  })
);

export default withServerState(connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPageContainer));
