import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchState } from 'react-router-server';
import { getDetail } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import { isBrowser, isServer } from 'sly/config';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class CommunityDetailPageContainer extends Component {
  componentWillMount() {
    const {
      fetchData, communitySlug, setServerState, hasServerState, cleanServerState
    } = this.props;

    if(!hasServerState) {
      if (isServer) {
        fetchData(communitySlug).then(setServerState, setServerState);
      } else {
        fetchData(communitySlug);
      }
    } else if (isBrowser) {
      cleanServerState();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchData, communitySlug } = this.props;
    if (communitySlug !== nextProps.communitySlug) {
      fetchData(nextProps.communitySlug);
    }
  }

  render() {
    // TODO: Layout here
    const { communitySlug, community, userActions } = this.props;

    if (!community /*|| !userActions*/) {
      return <div>Loading...</div>;
    }
    return (
      <CommunityDetailPage
        communitySlug={communitySlug}
        community={community}
        userActions={userActions}
      />
    );
  }
}

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    communitySlug,
    community: getDetail(state, 'community', communitySlug),
    userActions: getDetail(state, 'userAction'),
  };
}

const mapDispatchToProps = dispatch => ({
  fetchData: slug => Promise.all([
    dispatch(resourceDetailReadRequest('community', slug, { include: 'similar-communities' })),
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

export default withServerState(connect(mapStateToProps, mapDispatchToProps)(CommunityDetailPageContainer));
