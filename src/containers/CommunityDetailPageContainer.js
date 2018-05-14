import React, { Component } from 'react';
import { object, string, func } from 'prop-types';

import  withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getDetailedPricing } from 'sly/store/concierge/actions';

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    getDetailedPricing: func.isRequired,
    community: object,
    userActions: object,
    error: string,
  };

  render() {
    const { community, userActions, error, getDetailedPricing } = this.props;

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
        getDetailedPricing={getDetailedPricing}
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
    community: getDetail(state, 'community', communitySlug),
    userActions: getDetail(state, 'userAction'),
  };
}

const fetchData = (dispatch, { match }) => Promise.all([
  dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
    include: 'similar-communities'
  })),
  dispatch(resourceDetailReadRequest('userAction')),
]);

const handleError = err => {
  if (err.response.status === 404) {
    return { error: 'Unknown Profile!' };
  }
  throw err;
};

const mapDispatchToProps = {
  getDetailedPricing
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(CommunityDetailPageContainer);

