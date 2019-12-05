import React, { Component } from 'react';
import { object, number, array, bool, func } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/search';
import ErrorPage from 'sly/components/pages/Error';
import NearMePage from 'sly/components/pages/NearMePage';
import NursingHomesNearMePage from 'sly/components/pages/NursingHomesNearMePage';
import SNFNearMePage from 'sly/components/pages/SNFNearMePage';
import { parseURLQueryParams } from 'sly/services/helpers/url';
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

@withProps(({ location }) => {
  const qs = parseURLQueryParams(location.search);
  const toc = location.pathname.slice(1);
  return {
    searchParams: { toc, nearme: 'true', 'page-number': qs['page-number'] },
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
  };

  handleOnLocationSearch = (result) => {
    const event = {
      action: 'submit', category: 'nearMeHeroSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history, location } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    const toc = location.pathname.slice(1);
    searchParams.toc = toc
    const { path } = filterLinkPath(searchParams, {});
    history.push(path);
  };

  render() {
    const {
      searchParams,
      communityList,
      status,
      location,
      history,
    } = this.props;

    if (status.communityList.error) {
      const error = status.communityList.error.errors[0];
      const errorCode = error.status || 500;
      return <ErrorPage errorCode={errorCode} history={history} />;
    }

    const { toc } = searchParams;

    if (toc === 'nursing-homes') {
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
    if (toc === 'skilled-nursing-facility') {
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
    return (
      <NearMePage
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
}
