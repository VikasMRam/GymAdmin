import React, { Component } from 'react';
import { object, number, array, func } from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';

import { stateNames, urlize, replaceLastSegment } from  'sly/services/helpers/url';
import ErrorPage from 'sly/components/pages/Error';
import StateSearchPage from 'sly/components/pages/StateSearchPage';
import ModalController from 'sly/controllers/ModalController';
import { withProps } from 'sly/services/helpers/hocs';
import { prefetch } from 'sly/services/newApi';
import { getSearchParams } from 'sly/services/helpers/search';
import withGenerateFilterLinkPath from 'sly/services/search/withGenerateFilterLinkPath';

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))

@prefetch('geoGuide', 'getGeoGuides', (request, { searchParams }) => request(searchParams))
@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))

@withGenerateFilterLinkPath
@withRouter

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
    generateFilterLinkPath: func.isRequired,
  };

  render() {
    const {
      searchParams,
      communityList,
      status,
      location,
      geoGuide,
      history,
      generateFilterLinkPath,
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


    const mapViewUrl = generateFilterLinkPath({
      changedParams: {
        view: 'map',
        'page-number': 0,
        'page-size': 50,
        searchOnMove: true,
        radius: '10',
      },
    });
    const listViewUrl = generateFilterLinkPath({ changedParams: { view: 'list', 'page-size': 15 } })

    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <StateSearchPage
            isMapView={isMapView}
            requestMeta={status.communityList.meta || {}}
            searchParams={searchParams}
            communityList={communityList || []}
            geoGuide={gg}
            location={location}
            isLoading={!status.communityList.hasFinished}
            mapViewUrl={mapViewUrl}
            listViewUrl={listViewUrl}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}

