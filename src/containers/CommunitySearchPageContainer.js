import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import { merge, omit } from 'lodash';

import withServerState from 'sly/store/withServerState';

import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList, getListMeta } from 'sly/store/selectors';

import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import {
  filterLinkPath,
  getSearchParams,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';

class CommunitySearchPageContainer extends Component {
  // TODO Define Search Parameters
  toggleMap = () => {
    const event = { changedParams: { view: 'map', 'page-number': 1, 'page-size': 50, searchOnMove: true, } };
    if (this.props.searchParams && this.props.searchParams.view === 'map') {
      event.changedParams = { view: 'list', 'page-size': 15 };
    }
    this.changeSearchParams(event);
  };

  changeSearchParams = ({ changedParams }) => {
    const { searchParams, history } = this.props;
    const { path } = filterLinkPath(searchParams, changedParams);
    history.push(path);
  };

  removeSearchFilters = ({ paramsToRemove }) => {
    const { searchParams, history } = this.props;

    const changedParams = paramsToRemove.reduce((cumul, param) => {
      cumul[param] = undefined;
      return cumul;
    }, {});

    const { path } = filterLinkPath(searchParams, changedParams);

    history.push(path);
  };

  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const {
      searchParams,
      error,
      communityList,
      requestMeta,
      location,
    } = this.props;

    // TODO Add Error Page
    if (error) {
      location.push('/error');
      return null ;//<div>{error}</div>;
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
        onLocationSearch={this.handleOnLocationSearch}
        communityList={communityList}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    searchParams,
    communityList: getList(state, 'searchResource'),
    requestMeta: getListMeta(state, 'searchResource'),
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
