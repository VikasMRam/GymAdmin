import React, { Component } from 'react';
import { object, number, array } from 'prop-types';

import withServerState from 'sly/store/withServerState';

import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList, getListMeta } from 'sly/store/selectors';
import ErrorPage from 'sly/components/pages/Error';
import StateSearchPage from 'sly/components/pages/StateSearchPage';

import {
  filterLinkPath,
  getSearchParams,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';

class StateSearchPageContainer extends Component {
  static propTypes = {
    searchParams: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array.isRequired,
    requestMeta: object.isRequired,
    errorCode: number,
  }

  // TODO Define Search Parameters
  toggleMap = () => {
    const event = {
      changedParams: {
        view: 'map', 'page-number': 0, 'page-size': 50, searchOnMove: true,
      },
    };
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


  handleOnLocationSearch = (result) => {
    const { history } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const {
      searchParams,
      errorCode,
      communityList,
      requestMeta,
      location,
      history,
    } = this.props;
    // TODO Add Error Page
    if (errorCode) {
      return <ErrorPage errorCode={errorCode} history={history} />;
    }
    const isMapView = searchParams.view === 'map';
    return (
      <StateSearchPage
        isMapView={isMapView}
        requestMeta={requestMeta}
        toggleMap={this.toggleMap}
        searchParams={searchParams}
        onParamsChange={this.changeSearchParams}
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
})(StateSearchPageContainer);
