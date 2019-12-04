import React, { PureComponent } from 'react';
import { object, array, func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { stateNames, urlize, replaceLastSegment } from 'sly/services/helpers/url';
import ErrorPage from 'sly/components/pages/Error';
import CommunitySearchPage from 'sly/components/pages/CommunitySearchPage';
import { getSearchParams } from 'sly/services/helpers/search';
import { prefetch } from 'sly/services/newApi';
import { withProps } from 'sly/services/helpers/hocs';
import withGenerateFilterLinkPath from 'sly/services/search/withGenerateFilterLinkPath';
import withRouter from 'react-router/withRouter';
// import whyDidComponentUpdate from 'sly/services/helpers/whyDidComponentUpdate';

@withProps(({ match, location }) => ({
  searchParams: getSearchParams(match, location),
}))
@prefetch('geoGuides', 'getGeoGuides', (request, { searchParams }) => request(searchParams))

@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))

@withGenerateFilterLinkPath

@withRouter

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
      serverState,
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

    if (serverState instanceof Error) {
      const errorCode = (serverState.response && serverState.response.status) || 500;
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
    const listViewUrl = generateFilterLinkPath({ changedParams: { view: 'list', 'page-size': 15 } })

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
