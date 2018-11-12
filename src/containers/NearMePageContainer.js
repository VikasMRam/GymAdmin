import React, { Component } from 'react';
import { object, number, array, bool, func } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import NearMePage from 'sly/components/pages/NearMePage';
import { getSearchParamFromPlacesResponse, filterLinkPath, getSearchParams } from 'sly/services/helpers/search';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';

import queryString from 'query-string';

import withServerState from 'sly/store/withServerState';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList, getListMeta, isResourceListRequestInProgress } from 'sly/store/selectors';
import ErrorPage from 'sly/components/pages/Error';

class NearMePageContainer extends Component {
  static propTypes = {
    setLocation: func,
    searchParams: object.isRequired,
    history: object.isRequired,
    communityList: array.isRequired,
    requestMeta: object.isRequired,
    errorCode: number,
    isFetchingResults: bool,
  };

  handleOnLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'nearMeHeroSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams, {});
    history.push(path);
  };

  handleClick(e, sectionRef) {
    // Link triggers router navigation so need to preventDefault.
    // TODO: find better way to do it with any other component without much styling code
    e.preventDefault();
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    const {
      searchParams,
      errorCode,
      communityList,
      requestMeta,
      history,
      isFetchingResults,
      location,
    } = this.props;

    // TODO Add Error Page
    if (errorCode) {
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    return (
      <NearMePage
        onLocationSearch={this.handleOnLocationSearch}
        requestMeta={requestMeta}
        searchParams={searchParams}
        communityList={communityList}
        isFetchingResults={isFetchingResults}
        handleAnchor={this.handleClick}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const searchParams = { toc: 'assisted-living', nearme: 'true' };
  return {
    searchParams,
    communityList: getList(state, 'searchResource', searchParams),
    isFetchingResults: isResourceListRequestInProgress(state, 'searchResource'),
    requestMeta: getListMeta(state, 'searchResource', searchParams),
  };
};

const fetchData = (dispatch) => {
  const searchParams = { toc: 'assisted-living', nearme: 'true' };
  return Promise.all([
    dispatch(resourceListReadRequest('searchResource', searchParams)),
  ]);
};

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};


export default withServerState({
  mapStateToProps,
  fetchData,
  handleError,
})(NearMePageContainer);

