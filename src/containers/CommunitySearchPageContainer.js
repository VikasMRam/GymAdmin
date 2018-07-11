import React, { Component } from 'react';
import { object, number, array, bool, func } from 'prop-types';
import queryString from 'query-string';

import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';

import {resourceDetailReadRequest, resourceListReadRequest} from 'sly/store/resource/actions';
import { getList, getListMeta } from 'sly/store/selectors';
import { isCommunitySearchPageModalFilterPanelActive } from 'sly/store/selectors';
import ErrorPage from 'sly/components/pages/Error';
import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { toggleModalFilterPanel } from 'sly/store/communitySearchPage/actions';

import {
  filterLinkPath,
  getSearchParams,
  getSearchParamFromPlacesResponse,
  getFiltersApplied,
} from 'sly/services/helpers/search';

class CommunitySearchPageContainer extends Component {
  static propTypes = {
    searchParams: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array.isRequired,
    geoGuide: array,
    requestMeta: object.isRequired,
    errorCode: number,
    isModalFilterPanelVisible: bool,
    toggleModalFilterPanel: func,
  }

  componentDidUpdate() {
    const { searchParams } = this.props;
    const filters = getFiltersApplied(searchParams);
    const cityState = (({ city, state }) => ({ city, state }))(searchParams);
    const event = {
      action: 'show', category: 'searchToc', label: searchParams.toc, value: queryString.stringify(cityState),
    };
    SlyEvent.getInstance().sendEvent(event);
    if (searchParams.sort) {
      const event = {
        action: 'show', category: 'searchSort', label: searchParams.sort, value: queryString.stringify(cityState),
      };
      SlyEvent.getInstance().sendEvent(event);
    }
    filters.forEach((filter) => {
      const filterName = filter.charAt(0).toUpperCase() + filter.slice(1);
      const event = {
        action: 'show', category: `search${filterName}`, label: searchParams[filter], value: queryString.stringify(cityState),
      };
      SlyEvent.getInstance().sendEvent(event);
   });
  }

  // TODO Define Search Parameters
  toggleMap = () => {
    const event = {
      changedParams: {
        view: 'map', 'page-number': 0, 'page-size': 50, searchOnMove: true, radius: '10',
      },
    };
    if (this.props.searchParams && this.props.searchParams.view === 'map') {
      event.changedParams = { view: 'list', 'page-size': 15 };
    }
    this.changeSearchParams(event);

    const slyEvent = {
      action: 'show', category: 'searchPageView', label: event.changedParams.view,
      value: this.props.location.pathname + this.props.location.search,
    };
    SlyEvent.getInstance().sendEvent(slyEvent);
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

  handleToggleModalFilterPanel = () => {
    const { toggleModalFilterPanel } = this.props;
    toggleModalFilterPanel();
  };

  render() {
    const {
      searchParams,
      errorCode,
      communityList,
      geoGuide,
      requestMeta,
      location,
      history,
      isModalFilterPanelVisible,
    } = this.props;

    // TODO Add Error Page
    if (errorCode) {
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    const isMapView = searchParams.view === 'map';
    let gg = geoGuide && geoGuide.length > 0 ? geoGuide[0] : {};
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
        geoGuide={gg}
        location={location}
        isModalFilterPanelVisible={isModalFilterPanelVisible}
        onToggleModalFilterPanel={this.handleToggleModalFilterPanel}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  const isModalFilterPanelVisible = isCommunitySearchPageModalFilterPanelActive(state);
  return {
    searchParams,
    communityList: getList(state, 'searchResource'),
    requestMeta: getListMeta(state, 'searchResource'),
    geoGuide: getList(state, 'geoGuide'),
    isModalFilterPanelVisible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalFilterPanel: () => dispatch(toggleModalFilterPanel()),
  };
};

const fetchData = (dispatch, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return Promise.all([
    dispatch(resourceListReadRequest('searchResource', searchParams)),
    dispatch(resourceListReadRequest('geoGuide', searchParams)),
  ]);
  // return dispatch(resourceListReadRequest('searchResource', searchParams));
};

const handleError = (err) => {
  if (err.response) {
    if (err.response.url && err.response.url.match(/geo-guide/) ){
      //Ignore
      return;
    }
    if (err.response.status !== 200) {
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(CommunitySearchPageContainer);
