import { Component } from 'react';
import { string, func, object, shape } from 'prop-types';
import produce from 'immer';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import isMatch from 'lodash/isMatch';

import SlyEvent from 'sly/services/helpers/events';
import {
  AVAILABILITY_REQUEST,
  CONSULTATION_REQUESTED, PRICING_REQUEST,
  PROFILE_CONTACTED,
} from 'sly/services/newApi/constants';
import { prefetch, query, withAuth } from 'sly/services/newApi';
import userPropType, { uuidAux as uuidAuxProptype } from 'sly/propTypes/user';
import { withRedirectTo } from 'sly/services/redirectTo';

export const CONVERSION_FORM = 'conversionForm';
export const ADVANCED_INFO = 'advancedInfo';
export const WHAT_NEXT = 'whatNext';
export const HOW_IT_WORKS = 'howItWorks';

const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return (
      uuidAction.actionType === type &&
      isMatch(uuidAction.actionInfo, actionInfo)
    );
  });
};

const mapStateToProps = (state, { communitySlug, uuidActions }) => {
  const hasProfileAction = createHasProfileAction(uuidActions);
  const pricingRequested = hasProfileAction(PROFILE_CONTACTED, {
    contactType: PRICING_REQUEST,
  });

  const availabilityRequested = hasProfileAction(PROFILE_CONTACTED, {
    contactType: AVAILABILITY_REQUEST,
  });

  return {
    communitySlug,
    concierge: {
      pricingRequested,
      availabilityRequested,
      contactRequested: pricingRequested || availabilityRequested,
    },
  };
};

@withRouter
@withRedirectTo

@withAuth
@prefetch('uuidActions', 'getUuidActions', (req, { communitySlug }) =>
  req({
    'filter[actionType]': `${PROFILE_CONTACTED}`,
    'filter[actionInfo-slug]': communitySlug,
  }),
)
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')
@connect(mapStateToProps)

export default class ConciergeController extends Component {
  static displayName = 'ConciergeController';

  static propTypes = {
    match: shape({ url: string.isRequired }),
    redirectTo: func.isRequired,
    children: func.isRequired,
    concierge: object.isRequired,
    communitySlug: string,
    user: userPropType,
    uuidAux: uuidAuxProptype,
    queryParams: object,
    setQueryParams: func.isRequired,
    gotoGetCustomPricing: func,
    status: shape({
      uuidAux: object,
      user: object,
    }).isRequired,
    updateUuidAux: func,
    createAction: func,
    createOrUpdateUser: func,
  };

  submitExpressConversion = (data) => {
    const {
      communitySlug,
    } = this.props;

    if (data.phone && data.phone.match(/\d+/)) {
      const eventCategory = 'requestConsultation';
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: eventCategory,
        label: communitySlug,
      });
      return this.doSubmitConversion(data, CONSULTATION_REQUESTED, true);
    }

    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: 'requestAvailability',
      label: communitySlug,
    });

    return this.doSubmitConversion(data, PROFILE_CONTACTED, true);
  };

  submitRegularConversion = (data) => {
    const {
      communitySlug,
    } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: 'requestConsultation',
      label: communitySlug,
    });

    return this.doSubmitConversion(data, CONSULTATION_REQUESTED, false);
  };

  doSubmitConversion = (data = {}, action) => {
    const {
      match,
      communitySlug,
      redirectTo,
      createAction,
      createOrUpdateUser,
    } = this.props;

    const { email, phone, full_name: name } = data;

    const attributes = {
      actionInfo: { email, phone, name },
      actionPage: match.url,
      actionType: action,
    };

    if (action === PROFILE_CONTACTED) {
      attributes.actionInfo.slug = communitySlug;
      attributes.actionInfo.contactType = AVAILABILITY_REQUEST;
    }

    return createAction({
      type: 'UUIDAction',
      attributes,
    }).then(() => createOrUpdateUser({
      email,
      name,
      phone,
    })).then(() => {
      redirectTo(`/custom-pricing/${communitySlug}`);
    });
  };

  render() {
    const {
      children,
      concierge,
    } = this.props;

    const {
      submitRegularConversion,
      submitExpressConversion,
      close,
    } = this;

    return children({
      concierge,
      submitRegularConversion,
      submitExpressConversion,
      close,
    });
  }
}
