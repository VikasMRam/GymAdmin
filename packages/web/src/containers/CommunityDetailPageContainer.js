import React from 'react';
import { func, object, array, bool, number, shape, string } from 'prop-types';
import isMatch from 'lodash/isMatch';
import { Redirect } from 'react-router-dom';

import { getLastSegment, replaceLastSegment } from 'sly/web/services/helpers/url';
import CommunityDetailPage from 'sly/web/components/pages/CommunityDetailPage';
import { prefetch, withAuth } from 'sly/web/services/api';
import {
  AVAILABILITY_REQUEST,
  PRICING_REQUEST,
  PROFILE_CONTACTED,
  TOUR_BOOKED,
} from 'sly/web/services/api/constants';
import { HydrationData } from 'sly/web/services/partialHydration';

const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return uuidAction.actionType === type && isMatch(uuidAction.actionInfo, actionInfo);
  });
};

const getCommunitySlug = match => match.params.communitySlug;

@withAuth
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: getCommunitySlug(match),
  include: 'similar-communities,questions,agents',
}))
@prefetch('uuidActions', 'getUuidActions', (req, { match }) => req({
  'filter[actionType]': `${PROFILE_CONTACTED},${TOUR_BOOKED}`,
  'filter[actionInfo-slug]': getCommunitySlug(match),
}))

export default class CommunityDetailPageContainer extends React.PureComponent {
  static propTypes = {
    set: func,
    status: object,
    community: object,
    uuidActions: array,
    errorCode: number,
    history: object,
    location: object,
    user: object,
    isQuestionModalOpenValue: bool,
    searchParams: object,
    setQueryParams: func,
    match: shape({
      url: string.isRequired,
    }),
  };

  render() {
    const { status, user, uuidActions, community, history } = this.props;

    const { location } = history;
    const { pathname } = location;

    if (status.community.status === 301) {
      const newSlug = getLastSegment(status.community.headers.location);
      console.log('seeing ', status.community);
      // return <Redirect to={replaceLastSegment(location.pathname, newSlug)} />;
    }

    if (status.community.status === 404) {
      console.log('seeing status ', status.community);
      // return <Redirect to={replaceLastSegment(location.pathname)} />;
    }

    if (!community) {
      return null;
    }

    // If request url does not match resource url from api, perform 302 redirect
    if (pathname !== community.url) {
      return <Redirect to={community.url} />;
    }

    const hasProfileAction = createHasProfileAction(uuidActions);
    const profileContacted = {
      tour: hasProfileAction(TOUR_BOOKED),

      pricing: hasProfileAction(PROFILE_CONTACTED, {
        contactType: PRICING_REQUEST,
      }),

      availability: hasProfileAction(PROFILE_CONTACTED, {
        contactType: AVAILABILITY_REQUEST,
      }),
    };

    return (
      <>
        <CommunityDetailPage
          user={user}
          community={community}
          location={location}
          profileContacted={profileContacted}
          history={history}
        />
        <HydrationData />
      </>
    );
  }
}
