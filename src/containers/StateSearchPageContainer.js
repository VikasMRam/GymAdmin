import React, { Component } from 'react';
import { object, number, array } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { stateNames, urlize, replaceLastSegment } from  'sly/services/helpers/url';
import { CARE_ASSESSMENT_WIZARD } from 'sly/constants/modalType';
import ErrorPage from 'sly/components/pages/Error';
import StateSearchPage from 'sly/components/pages/StateSearchPage';
import ModalController from 'sly/controllers/ModalController';
import { withProps } from 'sly/services/helpers/hocs';
import { prefetch } from 'sly/services/newApi';
import {
  filterLinkPath,
  getSearchParams,
} from 'sly/services/helpers/search';

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))

@prefetch('geoGuide', 'getGeoGuides', (request, { searchParams }) => request(searchParams))
@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))

export default class StateSearchPageContainer extends Component {
  static propTypes = {
    searchParams: object.isRequired,
    serverState: object,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array.isRequired,
    geoGuide: array,
    requestMeta: object.isRequired,
    status: object,
    errorCode: number,
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

    if (searchParams.view === 'map') {
      history.replace(path);
    } else {
      history.push(path);
    }
  };

  removeSearchFilters = ({ paramsToRemove }) => {
    const { searchParams, history } = this.props;

    const changedParams = paramsToRemove.reduce((cumul, param) => {
      if (param === 'toc') {
        cumul[param] = 'retirement-community';
      } else {
        cumul[param] = undefined;
      }
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
      communityList,
      status,
      location,
      geoGuide,
      history,
    } = this.props;
    const { pathname, search } = location;

    if (status.communityList.error) {
      const error = status.communityList.error.errors[0];
      const errorCode = error.status || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }
    const isMapView = searchParams.view === 'map';
    const gg = geoGuide && geoGuide.length > 0 ? geoGuide[0] : {};

    const notPermittedSeparators = ['_', '%20'];
    const ucStateQp = searchParams.state.toUpperCase();
    if (stateNames[ucStateQp]) {
      return <Redirect to={replaceLastSegment(pathname, urlize(stateNames[ucStateQp])) + search} />;
    }
    const hasNotPermittedSeparators = notPermittedSeparators.some(v => ucStateQp.indexOf(v) >= 0);
    if (hasNotPermittedSeparators) {
      return <Redirect to={replaceLastSegment(pathname, urlize(ucStateQp)) + search} />;
    }

    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <StateSearchPage
            isMapView={isMapView}
            requestMeta={status.communityList.meta || {}}
            toggleMap={this.toggleMap}
            searchParams={searchParams}
            onParamsChange={this.changeSearchParams}
            onParamsRemove={this.removeSearchFilters}
            onAdTileClick={this.handleOnAdTileClick}
            communityList={communityList || []}
            geoGuide={gg}
            location={location}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}

