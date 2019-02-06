import React, { Component } from 'react';
import { object, number, array, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import withServerState from 'sly/store/withServerState';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList, getListMeta, isCommunitySearchPageModalFilterPanelActive } from 'sly/store/selectors';
import ErrorPage from 'sly/components/pages/Error';
import StateSearchPage from 'sly/components/pages/StateSearchPage';
import {
  filterLinkPath,
  getSearchParams,
} from 'sly/services/helpers/search';
import { CARE_ASSESSMENT_WIZARD } from 'sly/constants/modalType';
import { toggleModalFilterPanel } from 'sly/store/actions';

class StateSearchPageContainer extends Component {
  static propTypes = {
    searchParams: object.isRequired,
    serverState: object,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array.isRequired,
    geoGuide: array,
    requestMeta: object.isRequired,
    errorCode: number,
    toggleModalFilterPanel: func,
    isModalFilterPanelVisible: bool,
  };

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
      requestMeta,
      location,
      geoGuide,
      history,
      isModalFilterPanelVisible,
      toggleModalFilterPanel,
    } = this.props;

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }
    const isMapView = searchParams.view === 'map';
    const gg = geoGuide && geoGuide.length > 0 ? geoGuide[0] : {};

    return (
      <StateSearchPage
        isMapView={isMapView}
        requestMeta={requestMeta}
        toggleMap={this.toggleMap}
        searchParams={searchParams}
        onParamsChange={this.changeSearchParams}
        onParamsRemove={this.removeSearchFilters}
        onAdTileClick={this.handleOnAdTileClick}
        communityList={communityList}
        geoGuide={gg}
        location={location}
        isModalFilterPanelVisible={isModalFilterPanelVisible}
        onToggleModalFilterPanel={toggleModalFilterPanel}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  const isModalFilterPanelVisible = isCommunitySearchPageModalFilterPanelActive(state);
  return {
    searchParams,
    isModalFilterPanelVisible,
    communityList: getList(state, 'searchResource', searchParams),
    requestMeta: getListMeta(state, 'searchResource', searchParams),
    geoGuide: getList(state, 'geoGuide', searchParams),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModalFilterPanel: () => dispatch(toggleModalFilterPanel()),
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
)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(StateSearchPageContainer));
