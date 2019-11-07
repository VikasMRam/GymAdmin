import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';
import { withRouter } from 'react-router';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';
import { CUSTOM_PRICING } from 'sly/services/api/actions';
import PricingWizardPage from 'sly/components/pages/PricingWizardPage';
import { getUserDetailsFromUAAndForm, medicareToBool } from 'sly/services/helpers/userDetails';
import { getLastSegment, replaceLastSegment } from 'sly/services/helpers/url';
import { query, withAuth } from 'sly/services/newApi';
import { PRICING_REQUEST, PROFILE_CONTACTED } from 'sly/services/newApi/constants';

const eventCategory = 'PricingWizard';

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    userDetails: (getDetail(state, 'userAction') || {}).userDetails,
    community: getDetail(state, 'community', communitySlug),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const mapPropsToActions = ({ match }) => ({
  community: resourceDetailReadRequest('community', getCommunitySlug(match), {
    include: 'similar-communities',
  }),
  userAction: resourceDetailReadRequest('userAction'),
});

const handleResponses = (responses, { location }, redirect) => {
  const {
    community,
  } = responses;

  const {
    pathname,
  } = location;

  community(null, (error) => {
    if (error.response) {
      if (error.response.status === 301) {
        redirect(replaceLastSegment(pathname, getLastSegment(error.location)));
        return null;
      }

      if (error.response.status === 404) {
        // Not found so redirect to city page
        redirect(replaceLastSegment(pathname));
        return null;
      }
    }

    return Promise.reject(error);
  });
};

@withAuth

@withRouter

@query('updateUuidAux', 'updateUuidAux')

@query('createAction', 'createUuidAction')

@withServerState(
  mapPropsToActions,
  handleResponses,
)

@connectController(
  mapStateToProps,
  mapDispatchToProps,
)

export default class PricingWizardPageContainer extends Component {
  static propTypes = {
    community: communityPropType,
    userDetails: object,
    user: object,
    userHas: func.isRequired,
    uuidAux: object,
    status: object,
    postUserAction: func.isRequired,
    history: object.isRequired,
    createAction: func.isRequired,
    updateUuidAux: func.isRequired,
    createOrUpdateUser: func.isRequired,
    match: object.isRequired,
  };

  submitUserAction = (data) => {
    const {
      match,
      community,
      postUserAction,
      userDetails,
      createAction,
      status,
      updateUuidAux,
      createOrUpdateUser,
    } = this.props;

    // here remove only fields that will be populated by getUserDetailsFromUAAndForm
    const {
      name, phone, medicaidCoverage, budget, roomType, careType, contactByTextMsg, interest, ...restData
    } = data;

    const user = getUserDetailsFromUAAndForm({
      userDetails,
      formData: data,
    });

    const value = {
      ...restData,
      propertyIds: [community.id],
      user,
    };

    if (!user.email && !user.phone) {
      return Promise.resolve();
    }

    const payload = {
      action: CUSTOM_PRICING,
      value,
    };

    SlyEvent.getInstance().sendEvent({
      action: 'pricing-requested',
      category: eventCategory,
      label: community.id,
    });

    const uuidAux = status.uuidAux.result;

    return Promise.all([
      postUserAction(payload),
      updateUuidAux({ id: uuidAux.id }, produce(uuidAux, (draft) => {
        const housingInfo = draft.attributes.uuidInfo.housingInfo || {};
        housingInfo.roomPreference = data.roomType;
        draft.attributes.uuidInfo.housingInfo = housingInfo;

        const careInfo = draft.attributes.uuidInfo.careInfo || {};
        careInfo.adls = data.careType;
        draft.attributes.uuidInfo.careInfo = careInfo;

        const financialInfo = draft.attributes.uuidInfo.financialInfo || {};
        if (data.medicaidCoverage) {
          financialInfo.medicare = medicareToBool(data.medicaidCoverage);
        }
        if (data.budget) {
          financialInfo.maxMonthlyBudget = data.budget;
        }
        draft.attributes.uuidInfo.financialInfo = financialInfo;
      })),
      createAction({
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
      }),
    ]).then(() => createOrUpdateUser({
      name,
      phone,
    }));
  };

  render() {
    const {
      community, user, userHas, uuidAux, history, match
    } = this.props;

    if (!community) {
      return null;
    }

    const redirectTo = path => history.push(path);

    return (
      <PricingWizardPage
        community={community}
        user={user}
        uuidAux={uuidAux}
        userHas={userHas}
        userActionSubmit={this.submitUserAction}
        onComplete={this.submitUserAction}
        redirectTo={redirectTo}
        match={match}
      />
    );
  }
}
