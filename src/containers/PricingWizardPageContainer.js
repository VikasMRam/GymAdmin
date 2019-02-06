import React from 'react';
import { object, func, bool } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { connectController } from 'sly/controllers';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';
import { CUSTOM_PRICING } from 'sly/services/api/actions';
import PricingWizardPage from 'sly/components/pages/PricingWizardPage';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import {getLastSegment, replaceLastSegment} from "sly/services/helpers/url";

const eventCategory = 'PricingWizard';

const PricingWizardPageContainer = ({
  community, user, postUserAction, history, userAction,
}) => {
  if (!community || !userAction) {
    return null;
  }
  const { id, url } = community;

  const submitUserAction = (data) => {
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
    const event = {
      action: 'pricing-requested', category: eventCategory, label: id,
    };
    SlyEvent.getInstance().sendEvent(event);
    return postUserAction(payload);
  };

  const handleComplete = (data, toggleConfirmationModal) => {
    history.push(url);
    toggleConfirmationModal('pricing');
    // return submitUserAction(data)
    //   .then(() => {
    //
    //   });
  };

  const userDetails = userAction ? userAction.userDetails : null;
  return (
    <PricingWizardPage
      community={community}
      user={user}
      userDetails={userDetails}
      userActionSubmit={submitUserAction}
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
    userAction: getDetail(state, 'userAction') || {},
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

export default withServerState(
  mapPropsToActions,
  handleResponses,
)(connectController(
  mapStateToProps,
  mapDispatchToProps
)(PricingWizardPageContainer));
