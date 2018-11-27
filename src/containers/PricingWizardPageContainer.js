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

const eventCategory = 'PricingWizard';

const handleStepChange = (step) => {
  const event = {
    action: 'step-completed', category: eventCategory, label: (step - 1).toString(),
  };
  SlyEvent.getInstance().sendEvent(event);
};

const PricingWizardPageContainer = ({
  community, user, postUserAction, history,
}) => {
  if (!community) {
    return null;
  }
  const { id, url } = community;
  const handleComplete = (data, toggleConfirmationModal) => {
    const {
      name, phone, medicaidCoverage, roomType, careType, ...restData
    } = data;
    const value = {
      ...restData,
      slug: id,
      user: {
        full_name: name,
        phone,
        medicaid_coverage: medicaidCoverage,
        type_of_care: careType,
        type_of_room: roomType,
      },
    };
    if (user) {
      if (!name && user.name) {
        value.user.name = user.name;
      }
      if (!phone && user.phoneNumber) {
        value.user.phone = user.phoneNumber;
      }
    }
    const payload = {
      action: CUSTOM_PRICING,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        const event = {
          action: 'pricing-requested', category: eventCategory, label: 'complete',
        };
        SlyEvent.getInstance().sendEvent(event);
        history.push(url);
        toggleConfirmationModal('pricing');
      });
  };

  return (
    <PricingWizardPage
      community={community}
      user={user}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
    />
  );
};

PricingWizardPageContainer.propTypes = {
  community: communityPropType,
  user: object,
  postUserAction: func.isRequired,
  history: object.isRequired,
};

const getCommunitySlug = match => match.params.communitySlug;
const mapStateToProps = (state, { match }) => {
  const communitySlug = getCommunitySlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
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
