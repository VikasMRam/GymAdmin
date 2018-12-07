import React from 'react';
import { object, func } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';
import { CUSTOM_PRICING } from 'sly/services/api/actions';
import PricingWizardPage from 'sly/components/pages/PricingWizardPage';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';

const eventCategory = 'PricingWizard';

const PricingWizardPageContainer = ({
  community, user, postUserAction, history, userAction,
}) => {
  if (!community) {
    return null;
  }
  const { id, url } = community;
  const handleComplete = (data, toggleConfirmationModal) => {
    const {
      name, phone, medicaidCoverage, roomType, careType, contactByTextMsg, interest, ...restData
    } = data;
    const { userDetails } = userAction;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      ...restData,
      propertyIds: [id],
      user,
    };
    const payload = {
      action: CUSTOM_PRICING,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        const event = {
          action: 'pricing-requested', category: eventCategory, label: id,
        };
        SlyEvent.getInstance().sendEvent(event);
        history.push(url);
        toggleConfirmationModal('pricing');
      });
  };
  const userDetails = userAction ? userAction.userDetails : null;
  return (
    <PricingWizardPage
      community={community}
      user={user}
      userDetails={userDetails}
      onComplete={handleComplete}
    />
  );
};

PricingWizardPageContainer.propTypes = {
  community: communityPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
  history: object.isRequired,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    userAction: getDetail(state, 'userAction'),
    community: getDetail(state, 'community', communitySlug),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('community', getCommunitySlug(match), {
      include: 'similar-communities',
    })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
      if (err.location) {
        const redUrl = err.location.split('/');
        return {
          errorCode: err.response.status,
          redirectUrl: redUrl[redUrl.length - 1],
        };
      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

export default withServerState({
  fetchData,
  handleError,
})(connectController(
  mapStateToProps,
  mapDispatchToProps
)(PricingWizardPageContainer));
