import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import { merge, omit } from 'lodash';

import withServerState from 'sly/store/withServerState';

import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';

import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { filterLinkPath, getSearchParams } from 'sly/services/helpers/search'; 

class CommunitySearchPageContainer extends Component {
  // TODO Define Search Parameters
  toggleMap = () => {
    const event = { changedParams: { view: 'map' } };
    if (this.props.searchParams && this.props.searchParams.view === 'map') {
      event.changedParams = { view: 'list' };
    }
    this.changeSearchParams(event);
  };

  changeSearchParams = ({ changedParams }) => {
    // Changed search params
    const origParams = this.props.searchParams;
    const { path } = filterLinkPath(origParams, changedParams);
    this.props.history.push(path);
  };

  removeSearchFilters = ({ paramsToRemove }) => {
    const fullParams = omit(this.props.searchParams, paramsToRemove);

    const { path } = filterLinkPath(fullParams, {});
    this.props.history.push(path);
  };

  render() {
    const {
      searchParams, error, communityList, requestMeta,
    } = this.props;
    // TODO Add Error Page
    if (error) {
      return <div>{error}</div>;
    }
    const isMapView = searchParams.view === 'map';
    return (
      <CommunitySearchPage
        isMapView={isMapView}
        requestMeta={requestMeta}
        toggleMap={this.toggleMap}
        searchParams={searchParams}
        onParamsChange={this.changeSearchParams}
        onParamsRemove={this.removeSearchFilters}
        communityList={communityList}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    searchParams,
    communityList: getList(state, 'searchResource'),
  };
};

const fetchData = (dispatch, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return dispatch(resourceListReadRequest('searchResource', searchParams));
};

const handleError = (err) => {
  if (err.response.status === 404) {
    return { error: 'Unknown City and State!' };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  fetchData,
  handleError,
})(CommunitySearchPageContainer);
