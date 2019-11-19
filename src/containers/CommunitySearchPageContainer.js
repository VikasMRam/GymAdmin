import React, { PureComponent } from 'react';
import { object, array } from 'prop-types';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import {
  stateNames,
  urlize,
  replaceLastSegment,
} from 'sly/services/helpers/url';
import SlyEvent from 'sly/services/helpers/events';
import ErrorPage from 'sly/components/pages/Error';
import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { CARE_ASSESSMENT_WIZARD } from 'sly/constants/modalType';
import {
  filterLinkPath,
  getSearchParams,
} from 'sly/services/helpers/search';
import ModalController from 'sly/controllers/ModalController';
import { prefetch } from 'sly/services/newApi';
import { withProps } from 'sly/services/helpers/hocs';


const onCommunityClick = (position, to) => {
  const event = {
    category: 'SearchPage',
    action: 'communityClick',
    label: position.toString(),
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))

@prefetch('geoGuide', 'getGeoGuides', (request, { searchParams }) => request(searchParams))
@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))

export default class CommunitySearchPageContainer extends PureComponent {
  static propTypes = {
    status: object.isRequired,
    searchParams: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array,
    geoGuide: array,
    serverState: object,
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
        cumul[param] = 'nursing-homes';
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
      serverState,
      communityList,
      geoGuide,
      location,
      history,
      status,
    } = this.props;

    const { pathname, search } = location;
    const notPermittedSeparators = ['_', '%20'];
    const ucStateQp = searchParams.state.toUpperCase();
    if (stateNames[ucStateQp]) {
      const nPathname = pathname.replace(searchParams.state, stateNames[ucStateQp]).toLowerCase();
      return <Redirect to={nPathname + search} />;
    }
    const hasNotPermittedSeparators = notPermittedSeparators.some(v => searchParams.city.indexOf(v) >= 0);
    if (hasNotPermittedSeparators) {
      return <Redirect to={replaceLastSegment(pathname, urlize(searchParams.city)) + search} />;
    }

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    const isFetchingResults = status.communityList.isLoading || !status.communityList.hasStarted;

    // if (isFetchingResults) {
    //   return null;
    // }

    const requestMeta = status.communityList.meta;

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
            requestMeta={requestMeta || {}}
            toggleMap={this.toggleMap}
            searchParams={searchParams}
            onParamsChange={this.changeSearchParams}
            onParamsRemove={this.removeSearchFilters}
            communityList={communityList || []}
            geoGuide={gg}
            location={location}
            onAdTileClick={this.handleOnAdTileClick}
            isFetchingResults={isFetchingResults}
            onCommunityClick={onCommunityClick}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}
