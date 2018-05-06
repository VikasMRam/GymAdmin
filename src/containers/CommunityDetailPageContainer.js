import React, { Component } from 'react';
import { object, string } from 'prop-types';

import  withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import genRequest from 'sly/services/api/genRequest';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    community: object,
    userActions: object,
    error: string,
  };

  render() {
    const { community, userActions, error } = this.props;

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
        community={community}
        userActions={userActions}
      />
    );
  }
}

const genCommunityRequest = match => genRequest(
  'community', 
  match.params.communitySlug,
  { include: 'similarCommunities' },
);

const mapStateToProps = (state, { match }) => {
  return {
    community: getDetail(state, genCommunityRequest(match)),
    userActions: getDetail(state, 'userAction'),
  };
}

const fetchData = (dispatch, { match }) => Promise.all([
  dispatch(resourceDetailReadRequest(genCommunityRequest(match))),
  dispatch(resourceDetailReadRequest(genRequest('userAction'))),
]);

const handleError = err => {
  if (err.response.status === 404) {
    return { error: 'Unknown Profile!' }; 
  }
  throw err;
};

export default withServerState({ 
  mapStateToProps, 
  fetchData, 
  handleError,
})(CommunityDetailPageContainer);

