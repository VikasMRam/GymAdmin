import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';

import { community as communityPropType } from 'sly/propTypes/community';
import SlyEvent from 'sly/services/helpers/events';
import PricingWizardPage from 'sly/components/pages/PricingWizardPage';
import { medicareToBool } from 'sly/services/helpers/userDetails';
import { prefetch, query, withAuth } from 'sly/services/newApi';
import { PRICING_REQUEST, PROFILE_CONTACTED } from 'sly/services/newApi/constants';
import { withRedirectTo } from 'sly/services/redirectTo';

const eventCategory = 'PricingWizard';

const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities',
}))

@withAuth
@query('updateUuidAux', 'updateUuidAux')
@query('createAction', 'createUuidAction')
@withRedirectTo

export default class PricingWizardPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    userDetails: object,
    user: object,
    userHas: func.isRequired,
    uuidAux: object,
    status: object,
    createAction: func.isRequired,
    updateUuidAux: func.isRequired,
    createOrUpdateUser: func.isRequired,
    redirectTo: func.isRequired,
    match: object.isRequired,
  };

  updateUuidAux = (data) => {
    const {
      community,
      status,
      updateUuidAux,
    } = this.props;

    sendEvent('pricing-requested', community.id);

    const uuidAux = status.uuidAux.result;
    return Promise.all([
      updateUuidAux({ id: uuidAux.id }, produce(uuidAux, (draft) => {
        const housingInfo = draft.attributes.uuidInfo.housingInfo || {};
        if (data.roomType) {
          housingInfo.roomPreference = data.roomType;
        }
        draft.attributes.uuidInfo.housingInfo = housingInfo;

        const careInfo = draft.attributes.uuidInfo.careInfo || {};
        if (data.careType) {
          careInfo.adls = data.careType;
        }
        draft.attributes.uuidInfo.careInfo = careInfo;

        const financialInfo = draft.attributes.uuidInfo.financialInfo || {};
        if (data.medicaidCoverage) {
          financialInfo.medicaid = medicareToBool(data.medicaidCoverage);
        }
        if (data.budget) {
          financialInfo.maxMonthlyBudget = data.budget;
        }
        draft.attributes.uuidInfo.financialInfo = financialInfo;
      })),
    ]);
  };

  submitActionAndCreateUser = (data, currentStep) => {
    const {
      community,
      user,
      createOrUpdateUser,
      match,
      createAction,
    } = this.props;

    const {
      name = (user && user.name) || undefined,
      phone = (user && user.phoneNumber) || undefined,
    } = data;

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo: {
          phone,
          name,
          contactType: PRICING_REQUEST,
          slug: community.id,
        },
        actionPage: match.url,
        actionType: PROFILE_CONTACTED,
      },
    }).then(() => createOrUpdateUser({
      name,
      phone,
    }, {
      ignoreAlreadyRegistered: true,
    }).then(() => {
      sendEvent('pricing-contact-submitted', community.id, currentStep);
    }));
  };

  render() {
    const {
      community, user, userHas, uuidAux, redirectTo, match,
    } = this.props;

    if (!community) {
      return null;
    }

    return (
      <PricingWizardPage
        community={community}
        user={user}
        uuidAux={uuidAux}
        userHas={userHas}
        updateUuidAux={this.updateUuidAux}
        submitActionAndCreateUser={this.submitActionAndCreateUser}
        redirectTo={redirectTo}
        match={match}
      />
    );
  }
}
