import React, { Component } from 'react';
import { object, func, string, shape } from 'prop-types';
import produce from 'immer';

import { prefetch, query } from 'sly/services/newApi';
import { community as communityPropType } from 'sly/propTypes/community';
import SlyEvent from 'sly/services/helpers/events';
import BookATourPage from 'sly/components/pages/BookATourPage';
import ModalController from 'sly/controllers/ModalController';
import { TOUR_BOOKED } from 'sly/services/newApi/constants';
import { medicareToBool, boolToMedicare } from 'sly/services/helpers/userDetails';
import withAuth from 'sly/services/newApi/withAuth';

const eventCategory = 'BAT';

const getCommunitySlug = match => match.params.communitySlug;

@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: getCommunitySlug(match),
    include: 'similar-communities,questions,agents',
  })
)

@withAuth
@query('updateUuidAux', 'updateUuidAux')
@query('createAction', 'createUuidAction')

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
  };

  handleComplete = (data) => {
    const {
      community, history, createAction, updateUuidAux, createOrUpdateUser, match, status,
    } = this.props;

    const {
      name, phone, medicaidCoverage,
    } = data;

    const uuidAux = status.uuidAux.result;

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
      updateUuidAux({ id: uuidAux.id }, produce(uuidAux, (draft) => {
        const financialInfo = draft.attributes.uuidInfo.financialInfo || {};
        if (medicaidCoverage) {
          financialInfo.medicare = medicareToBool(medicaidCoverage);
        }
        draft.attributes.uuidInfo.financialInfo = financialInfo;
      })),
    ]).then(() => createOrUpdateUser({
      name,
      phone,
    })).then(() => {
      const event = {
        action: 'tour-booked', category: eventCategory, label: community.id,
      };
      SlyEvent.getInstance().sendEvent(event);
      history.push(community.url);
    });
  };

  render() {
    const {
      community, user, uuidAux,
    } = this.props;

    if (!community) {
      return null;
    }

    const medicaid = boolToMedicare(uuidAux.financialInfo && uuidAux.financialInfo.medicaid);

    return (
      <ModalController>
        {({
          show,
          hide,
        }) => (
          <BookATourPage
            community={community}
            user={user}
            medicaidCoverage={medicaid}
            onComplete={this.handleComplete}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  }
}
