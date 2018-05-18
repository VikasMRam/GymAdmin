import React, { Component } from 'react';
import { object, string } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';

class CommunityDetailPageContainer extends Component {
  static propTypes = {
    community: object,
    error: string,
    history: object,
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const { community, error, history } = this.props;


    if (error) {

      history.push('/notfound');
      return null;
      // return <div>{error}</div>;
    }

    if (!community) {
      return <div>Loading...</div>;
    }
    return (
      <CommunityDetailPage
        community={community}
        onLocationSearch={this.handleOnLocationSearch}
      />
    );
  }
}

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    community: getDetail(state, 'community', communitySlug),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

const handleError = (err) => {
  if (err.response && err.response.status === 404) {
    return { error: 'Unknown Profile!' };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  fetchData,
  handleError,
})(CommunityDetailPageContainer);
