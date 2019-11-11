import React from 'react';
import { func, object, array, bool, number, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import isMatch from 'lodash/isMatch';
import { Redirect } from 'react-router-dom';

import { withServerState } from 'sly/store';
import { getLastSegment, replaceLastSegment } from 'sly/services/helpers/url';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import CommunityDetailPage from 'sly/components/pages/CommunityDetailPage';
import { prefetch, withAuth, withApi } from 'sly/services/newApi';
import {
  AVAILABILITY_REQUEST,
  PRICING_REQUEST,
  PROFILE_CONTACTED,
  TOUR_BOOKED,
} from 'sly/services/newApi/constants';
import SlyEvent from 'sly/services/helpers/events';
import { HydrationData } from 'sly/services/partialHydration';

const ignoreSearchParams = ['modal', 'action', 'entityId', 'currentStep', 'token', 'modal'];


const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return uuidAction.actionType === type && isMatch(uuidAction.actionInfo, actionInfo);
  });
};

const getCommunitySlug = match => match.params.communitySlug;

const mapPropsToActions = () => ({
  userAction: resourceDetailReadRequest('userAction'),
});

const mapStateToProps = (state) => {
  // default state for ssr
  return {
    userAction: getDetail(state, 'userAction') || {},
  };
};

@withApi
@withAuth
@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: getCommunitySlug(match),
    include: 'similar-communities,questions,agents',
  })
)
@prefetch('uuidActions', 'getUuidActions', (req, { match }) =>
  req({
    'filter[actionType]': `${PROFILE_CONTACTED},${TOUR_BOOKED}`,
    'filter[actionInfo][slug]': getCommunitySlug(match),
  })
)
@withServerState(mapPropsToActions, undefined, ignoreSearchParams)
@connect(mapStateToProps)
export default class CommunityDetailPageContainer extends React.PureComponent {
  static propTypes = {
    set: func,
    status: object,
    community: object,
    uuidActions: array,
    userAction: object,
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

  handleSimilarCommunitiesClick = (index, to) => {
    const event = {
      action: 'exitintent-modal-click', category: 'similarCommunity', label: index.toString(), value: to,
    };
    SlyEvent.getInstance().sendEvent(event);
  };

  render() {
    const { status, user, uuidActions, community, history, userAction } = this.props;

    const { location } = history;
    const { pathname } = location;

    if (status.community.status === 301) {
      const newSlug = getLastSegment(status.community.headers.location);
      return <Redirect to={replaceLastSegment(location.pathname, newSlug)} />;
    }

    if (status.community.status === 404) {
      return <Redirect to={replaceLastSegment(location.pathname)} />;
    }

    if (!community || !userAction) {
      return null;
    }

    // If request url does not match resource url from api, perform 302 redirect
    if (pathname !== community.url) {
      return <Redirect to={community.url} />;
    }

    const hasProfileAction = createHasProfileAction(uuidActions, community.id);
    const profileContacted = {
      tour: hasProfileAction(TOUR_BOOKED, {
        slug: community.id,
      }),

      pricing: hasProfileAction(PROFILE_CONTACTED, {
        slug: community.id,
        contactType: PRICING_REQUEST,
      }),

      availability: hasProfileAction(PROFILE_CONTACTED, {
        slug: community.id,
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
          userAction={userAction}
          history={history}
        />
        <HydrationData />
      </>
    );
  }
}
