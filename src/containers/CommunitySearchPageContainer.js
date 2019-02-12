import React, { Component } from 'react';
import { object, array, bool } from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';

import withServerState from 'sly/store/withServerState';
import SlyEvent from 'sly/services/helpers/events';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import ErrorPage from 'sly/components/pages/Error';
import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { CARE_ASSESSMENT_WIZARD } from 'sly/constants/modalType';
import {
  getList,
  getListMeta,
  isResourceListRequestInProgress,
} from 'sly/store/selectors';
import {
  filterLinkPath,
  getSearchParams,
} from 'sly/services/helpers/search';
import { logWarn } from 'sly/services/helpers/logging';
import ModalController from 'sly/controllers/ModalController';

class CommunitySearchPageContainer extends Component {
  static propTypes = {
    searchParams: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array.isRequired,
    geoGuide: array,
    requestMeta: object.isRequired,
    serverState: object,
    isFetchingResults: bool,
  };

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
  };

  changeSearchParams = ({ changedParams }) => {
    const { searchParams, history } = this.props;
    const { path } = filterLinkPath(searchParams, changedParams);
    const event = {
      action: 'search', category: searchParams.toc, label: queryString.stringify(searchParams),
    };
    SlyEvent.getInstance().sendEvent(event);

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

  handleOnAdTileClick = () => {
    this.changeSearchParams({ changedParams: { modal: CARE_ASSESSMENT_WIZARD } });
  };

  render() {
    const {
      searchParams,
      serverState,
      communityList,
      geoGuide,
      requestMeta,
      location,
      history,
      isFetchingResults,
    } = this.props;

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    const isMapView = searchParams.view === 'map';
    const gg = geoGuide && geoGuide.length > 0 ? geoGuide[0] : {};
    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <CommunitySearchPage
            isMapView={isMapView}
            requestMeta={requestMeta}
            toggleMap={this.toggleMap}
            searchParams={searchParams}
            onParamsChange={this.changeSearchParams}
            onParamsRemove={this.removeSearchFilters}
            communityList={communityList}
            geoGuide={gg}
            location={location}
            onAdTileClick={this.handleOnAdTileClick}
            isFetchingResults={isFetchingResults}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    searchParams,
    communityList: getList(state, 'searchResource', searchParams),
    isFetchingResults: isResourceListRequestInProgress(state, 'searchResource'),
    requestMeta: getListMeta(state, 'searchResource', searchParams),
    geoGuide: getList(state, 'geoGuide', searchParams),
  };
};

const mapPropsToActions = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    searchResource: resourceListReadRequest('searchResource', searchParams),
    geoGuide: resourceListReadRequest('geoGuide', searchParams),
  };
};

const handleResponses = (responses) => {
  const { geoGuide } = responses;
  geoGuide(null, (error) => {
    // ignore all geoGuides errors
    logWarn(error);
  });
};

export default withServerState(
  mapPropsToActions,
  handleResponses,
)(connect(mapStateToProps)(CommunitySearchPageContainer));
