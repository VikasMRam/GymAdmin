import React, { Component } from 'react';
import { object, number, array, bool, func } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList, getListMeta, isResourceListRequestInProgress } from 'sly/store/selectors';
import ErrorPage from 'sly/components/pages/Error';
import NearMePage from 'sly/components/pages/NearMePage';
import { parseURLQueryParams } from 'sly/services/helpers/url';

const handleClick = (e, sectionRef) => {
  // Link triggers router navigation so need to preventDefault.
  // TODO: find better way to do it with any other component without much styling code
  e.preventDefault();
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

class NearMePageContainer extends Component {
  static propTypes = {
    setLocation: func,
    searchParams: object.isRequired,
    history: object.isRequired,
    communityList: array.isRequired,
    requestMeta: object.isRequired,
    errorCode: number,
    isFetchingResults: bool,
    location: object.isRequired,
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
        handleAnchor={handleClick}
        location={location}
      />
    );
  }
}

const mapStateToProps = (state, {location}) => {
  const qs = parseURLQueryParams(location.search);
  const searchParams = { toc: 'assisted-living', nearme: 'true', 'page-number': qs['page-number'] };
  return {
    searchParams,
    communityList: getList(state, 'searchResource', searchParams),
    isFetchingResults: isResourceListRequestInProgress(state, 'searchResource'),
    requestMeta: getListMeta(state, 'searchResource', searchParams),
  };
};

const fetchData = (dispatch, {location}) => {
  const qs = parseURLQueryParams(location.search);
  const searchParams = { toc: 'assisted-living', nearme: 'true', 'page-number': qs['page-number'] };
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

