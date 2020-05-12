import React, { Component } from 'react';
import { object, func, string, shape } from 'prop-types';
import * as immutable from 'object-path-immutable';

import { prefetch, query, withAuth } from 'sly/services/api';
import { community as communityPropType } from 'sly/propTypes/community';
import SlyEvent from 'sly/services/helpers/events';
import BookATourPage from 'sly/components/pages/BookATourPage';
import { TOUR_BOOKED } from 'sly/services/api/constants';
import { medicareToBool, boolToMedicare } from 'sly/services/helpers/userDetails';
import { withRedirectTo } from 'sly/services/redirectTo';

const eventCategory = 'BAT';

const getCommunitySlug = match => match.params.communitySlug;

@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: getCommunitySlug(match),
    include: 'similar-communities,questions,agents',
  }),
)

@withAuth
@query('updateUuidAux', 'updateUuidAux')
@query('createAction', 'createUuidAction')
@withRedirectTo

export default class BookATourPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    history: object.isRequired,
    status: object,
    updateUuidAux: func,
    createOrUpdateUser: func,
    createAction: func.isRequired,
    uuidAux: object,
    match: shape({ url: string }),
    redirectTo: func.isRequired
  };


  handleComplete = (data) => {
    const {
      community, createAction, updateUuidAux, createOrUpdateUser, status, match,
    } = this.props;

    const {
      name, phone, medicaidCoverage,
    } = data;

    const rawUuidAux = status.uuidAux.result;

    const uuidAux = immutable.wrap(rawUuidAux);

    if (medicaidCoverage) {
      uuidAux.set('attributes.uuidInfo.financialInfo.medicaid', medicareToBool(medicaidCoverage));
    }

    return Promise.all([
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            name,
            phone,
            slug: community.id,
            scheduledDay: data.scheduledDate,
            scheduledTime: data.scheduledTime,
          },
          actionType: TOUR_BOOKED,
          actionPage: match.url,
        },
      }),
      updateUuidAux({ id: rawUuidAux.id }, uuidAux.value()),
    ]).then(() => createOrUpdateUser({
      name,
      phone,
    })).then(() => {
      const event = {
        action: 'tour-booked', category: eventCategory, label: community.id,
      };
      SlyEvent.getInstance().sendEvent(event);
    });
  };

  render() {
    const {
      community, user, uuidAux, redirectTo, match,
    } = this.props;

    if (!community) {
      return null;
    }

    const medicaid = boolToMedicare(uuidAux.financialInfo && uuidAux.financialInfo.medicaid);

    return (
      <BookATourPage
        community={community}
        user={user}
        medicaidCoverage={medicaid}
        onComplete={this.handleComplete}
        redirectTo={redirectTo}
        match={match}
      />
    );
  }
}