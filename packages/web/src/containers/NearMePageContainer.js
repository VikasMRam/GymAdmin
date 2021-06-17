import React, { Component } from 'react';
import { object, func } from 'prop-types';

import SlyEvent from 'sly/web/services/helpers/events';
import AssistedLivingNearMePage from 'sly/web/components/pages/AssistedLivingNearMePage';
import MemoryCareNearMePage from 'sly/web/components/pages/MemoryCareNearMePage';
import SeniorLivingNearMePage from 'sly/web/components/pages/SeniorLivingNearMePage';
import BNCNearMePage from 'sly/web/components/pages/BNCNearMePage';
import NursingHomesNearMePage from 'sly/web/components/pages/NursingHomesNearMePage';
import SNFNearMePage from 'sly/web/components/pages/SNFNearMePage';
import CCRCNearMePage from 'sly/web/components/pages/CCRCNearMePage';
import IndependentLivingNearMePage from 'sly/web/components/pages/IndependentLivingNearMePage';
import HomeCareNearMePage from 'sly/web/components/pages/HomeCareNearMePage';
import RespiteCareNearMePage from 'sly/web/components/pages/RespiteCareNearMePage';
import VeteransBenefitAssistedLivingPage from 'sly/web/components/pages/VeteransBenefitAssistedLivingPage';
import ActiveAdultNearMePage from 'sly/web/components/pages/ActiveAdultNearMePage';
import { parseURLQueryParams, generateCityPathSearchUrl } from 'sly/web/services/helpers/url';
import { query, normalizeResponse } from 'sly/web/services/api';
import { withProps } from 'sly/web/services/helpers/hocs';

const handleClick = (e, sectionRef) => {
  e.preventDefault();
  // Link triggers router navigation so need to preventDefault.
  // TODO: find better way to do it with any other component without much styling code
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
    sp.toc = 'nursing-homes';
  }

  if (hub === 'respite-care') {
    sp.toc = 'assisted-living';
  }

  if (qs && qs['page-number']) {
    sp['page-number'] = qs['page-number'];
  }

  return {
    searchParams: sp,
  };
})

@query('searchCommunities', 'getSearchResources')

export default class NearMePageContainer extends Component {
  static propTypes = {
    setLocation: func,
    searchParams: object.isRequired,
    history: object.isRequired,
    searchCommunities: func,
    location: object.isRequired,
    redirectTo: func.isRequired,
  };


  handleOnLocationSearch = (result) => {
    const { searchParams } = this.props;
    const event = {
      action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: result.displayText,
    };
    SlyEvent.getInstance().sendEvent(event);

    const { history } = this.props;
    let joiner = '?';

    if (result.url.includes('?')) {
      joiner = '&';
    }

    history.push(`${result.url}${joiner}toc=${searchParams.toc}`);
  };

  handleCurrentLocation = (addresses, { latitude, longitude }) => {
    const { searchParams, history } = this.props;

    const event = {
      action: 'submit', category: `nearMeHeroSearch_${searchParams.toc}`, label: 'currentLocation',
    };
    SlyEvent.getInstance().sendEvent(event);

    if (addresses.length) {
      const path = `/${searchParams.toc}/${generateCityPathSearchUrl(addresses[0])}`; //?geo=${latitude},${longitude},10`;
      history.push(path);
    }
  };

  render() {
    const {
      match,
    } = this.props;

    const { params } = match;
    const { hub } = params;

    if (hub === 'nursing-homes') {
      return (
        <NursingHomesNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'skilled-nursing-facility') {
      return (
        <SNFNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'memory-care') {
      return (
        <MemoryCareNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'independent-living') {
      return (
        <IndependentLivingNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'senior-living') {
      return (
        <SeniorLivingNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'board-and-care-home') {
      return (
        <BNCNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'continuing-care-retirement-community') {
      return (
        <CCRCNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
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
    if (hub === 'veterans-benefit-assisted-living') {
      return (
        <VeteransBenefitAssistedLivingPage
          handleAnchor={handleClick}
        />
      );
    }
    if (hub === 'active-adult') {
      return (
        <ActiveAdultNearMePage
          onLocationSearch={this.handleOnLocationSearch}
          handleAnchor={handleClick}
        />
      );
    }
    return (
      <AssistedLivingNearMePage
        onLocationSearch={this.handleOnLocationSearch}
        handleAnchor={handleClick}
        onCurrentLocation={this.handleCurrentLocation}
      />
    );
  }
}
