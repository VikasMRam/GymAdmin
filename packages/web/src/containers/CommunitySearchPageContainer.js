import React, { PureComponent } from 'react';
import { object, array, func } from 'prop-types';
import { Redirect } from 'react-router-dom';

import { stateNames, urlize, replaceLastSegment } from 'sly/web/services/helpers/url';
import ErrorPage from 'sly/web/components/pages/Error';
import CommunitySearchPage from 'sly/web/components/pages/CommunitySearchPage';
import { getSearchParams } from 'sly/web/services/helpers/search';
import { prefetch } from 'sly/web/services/api';
import { withProps } from 'sly/web/services/helpers/hocs';
import withGenerateFilterLinkPath from 'sly/web/services/search/withGenerateFilterLinkPath';

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))

@prefetch('geoGuides', 'getGeoGuides', (request, { searchParams }) => request(searchParams))
@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))
@withGenerateFilterLinkPath

export default class CommunitySearchPageContainer extends PureComponent {
  static propTypes = {
    status: object.isRequired,
    searchParams: object.isRequired,
    history: object.isRequired,
    location: object.isRequired,
    communityList: array,
    geoGuides: array,
    serverState: object,
    generateFilterLinkPath: func.isRequired,
  };

  state = {
    areFiltersOpen: false,
  };

  // componentDidUpdate = whyDidComponentUpdate('CommunitySearchPageContainer');

  render() {
    const {
      searchParams,
      communityList,
      geoGuides,
      location,
      history,
      status,
      generateFilterLinkPath,
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

    if (status.communityList.error) {
      const error = status.communityList.error.errors[0];
      const errorCode = error.status || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    const isFetchingResults = !status.communityList.hasFinished;
    const requestMeta = status.communityList.meta;
    const isMapView = searchParams.view === 'map';
    const mapViewUrl = generateFilterLinkPath({
      changedParams: {
        view: 'map',
        'page-number': 0,
        'page-size': 50,
        searchOnMove: true,
        radius: '10',
      },
    });
    const listViewUrl = generateFilterLinkPath({ changedParams: { view: 'list', 'page-size': 15 } });

    return (
      <CommunitySearchPage
        isMapView={isMapView}
        requestMeta={requestMeta || {}}
        mapViewUrl={mapViewUrl}
        listViewUrl={listViewUrl}
        searchParams={searchParams}
        communityList={communityList || []}
        geoGuide={(geoGuides && geoGuides[0]) || {}}
        location={location}
        isFetchingResults={isFetchingResults}
        areFiltersOpen={this.state.areFiltersOpen}
        toggleFiltersOpen={() => this.setState(({ areFiltersOpen }) => ({ areFiltersOpen: !areFiltersOpen }))}
      />
    );
  }
}
