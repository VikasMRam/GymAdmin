import React, { Component } from 'react';
import { object, number, array, bool, func } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import ErrorPage from 'sly/components/pages/Error';
import AssistedLivingNearMePage from 'sly/components/pages/AssistedLivingNearMePage';
import MemoryCareNearMePage from 'sly/components/pages/MemoryCareNearMePage';
import SeniorLivingNearMePage from 'sly/components/pages/SeniorLivingNearMePage';
import BNCNearMePage from 'sly/components/pages/BNCNearMePage';
import NursingHomesNearMePage from 'sly/components/pages/NursingHomesNearMePage';
import SNFNearMePage from 'sly/components/pages/SNFNearMePage';
import CCRCNearMePage from 'sly/components/pages/CCRCNearMePage';
import IndependentLivingNearMePage from 'sly/components/pages/IndependentLivingNearMePage';
import HomeCareNearMePage from 'sly/components/pages/HomeCareNearMePage';
import RespiteCareNearMePage from 'sly/components/pages/RespiteCareNearMePage';
import { parseURLQueryParams, generateCityPathSearchUrl } from 'sly/services/helpers/url';
import { prefetch } from 'sly/services/newApi';
import { withProps } from 'sly/services/helpers/hocs';

const handleClick = (e, sectionRef) => {
  // Link triggers router navigation so need to preventDefault.
  // TODO: find better way to do it with any other component without much styling code
  e.preventDefault();
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

@withProps(({ match, location }) => {
  const qs = parseURLQueryParams(location.search);
  const { params } = match;
  const { hub } = params;
  const sp = {};

  sp.nearme = 'true';
  sp.toc = hub;

  if (hub === 'senior-living') {
    sp.toc = 'nursing-homes'
  }

  if (hub === 'respite-care') {
    sp.toc = 'assisted-living'
  }

  if (qs && qs['page-number']) {
    sp['page-number'] = qs['page-number']
  }

  return {
    searchParams: sp,
  };
})

@prefetch('communityList', 'getSearchResources', (request, { searchParams }) => request(searchParams))

export default class NearMePageContainer extends Component {
  static propTypes = {
    setLocation: func,
    searchParams: object.isRequired,
    history: object.isRequired,
    communityList: array.isRequired,
    requestMeta: object.isRequired,
    errorCode: number,
    isFetchingResults: bool,
    location: object.isRequired,
    status: object,
    redirectTo: func.isRequired,
  };

  handleOnLocationSearch = (result) => {
    const { searchParams } = this.props;
    const event = {
      action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    const params = getSearchParamFromPlacesResponse(result);
    params.toc = searchParams.toc;
    const { path } = filterLinkPath(params, {});
    history.push(path);
  };

  handleCurrentLocation = (addresses, { latitude, longitude }) => {
    const { searchParams, history } = this.props;

    const event = {
      action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: 'currentLocation',
    };
    SlyEvent.getInstance().sendEvent(event);

    if (addresses.length) {
      const path = `/${searchParams.toc}/${generateCityPathSearchUrl(addresses[0])}?latitude=${latitude}&longitude=${longitude}`;
      history.push(path);
    }
  };

  render() {
    const {
      searchParams,
      communityList,
      status,
      location,
      history,
      match,
    } = this.props;

    if (status.communityList.error) {
      const error = status.communityList.error.errors[0];
      const errorCode = error.status || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }
    const { params } = match;
    const { hub } = params;

    if (hub === 'nursing-homes') {
      return (
        <NursingHomesNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'skilled-nursing-facility') {
      return (
        <SNFNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'memory-care') {
      return (
        <MemoryCareNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'independent-living') {
      return (
        <IndependentLivingNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'senior-living') {
      return (
        <SeniorLivingNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'board-and-care-home') {
      return (
        <BNCNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'continuing-care-retirement-community') {
      return (
        <CCRCNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          requestMeta={status.communityList.meta || {}}
          searchParams={searchParams}
          communityList={communityList}
          isFetchingResults={!status.communityList.hasFinished}
          handleAnchor={handleClick}
          location={location}
        />
      );
    }
    if (hub === 'in-home-care') {
      return (
        <HomeCareNearMePage
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'respite-care') {
      return (
        <RespiteCareNearMePage
          handleAnchor={handleClick}
        />
      );
    }
    return (
      <AssistedLivingNearMePage
        onLocationSearch={this.handleOnLocationSearch}
        requestMeta={status.communityList.meta || {}}
        searchParams={searchParams}
        communityList={communityList}
        isFetchingResults={!status.communityList.hasFinished}
        handleAnchor={handleClick}
        location={location}
        onCurrentLocation={this.handleCurrentLocation}
      />
    );
  }
}
