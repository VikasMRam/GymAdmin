import React, { Component } from 'react';
import { func, string, bool } from 'prop-types';

import  withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    fetchData: func.isRequired,
    communitySlug: string.isRequired,
    setServerState: func.isRequired,
    hasServerState: bool.isRequired,
    cleanServerState: func.isRequired,
    error: string,
  };

  render() {
    // TODO: Layout here
    const { communitySlug, community, userActions, error } = this.props;

    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }

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

const fetchData = (dispatch, { communitySlug }) => Promise.all([
  dispatch(resourceDetailReadRequest('community', communitySlug, { include: 'similar-communities' })),
  dispatch(resourceDetailReadRequest('userAction')),
]);

export default withServerState({ mapStateToProps, fetchData })(CommunityDetailPageContainer);

