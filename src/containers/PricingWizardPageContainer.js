import React, { Component } from 'react';
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
import { getLastSegment, replaceLastSegment } from "sly/services/helpers/url";
import ModalController from 'sly/controllers/ModalController';

const eventCategory = 'PricingWizard';

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
    user: object,
    userAction: object,
    postUserAction: func.isRequired,
    history: object.isRequired,
  };

  render() {
    const {
      community, user, postUserAction, history, userAction,
    } = this.props;

    if (!community || !userAction) {
      return null;
    }
    const { id, url } = community;

    const submitUserAction = (data) => {
      // here remove only fields that will be populated by getUserDetailsFromUAAndForm
      const {
        name, phone, medicaidCoverage, budget, roomType, careType, contactByTextMsg, interest, ...restData
      } = data;
      const { userDetails } = userAction;
      const user = getUserDetailsFromUAAndForm({
        userDetails,
        formData: data
      });
      const value = {
        ...restData,
        propertyIds: [id],
        user,
      };
      if (!user.email && !user.phone) {
        return;
      }
      const payload = {
        action: CUSTOM_PRICING,
        value,
      };
      const event = {
        action: 'pricing-requested',
        category: eventCategory,
        label: id,
      };
      SlyEvent.getInstance()
        .sendEvent(event);
      return postUserAction(payload);
    };

    const handleComplete = (data, openConfirmationModal) => {
      history.push(url);
      openConfirmationModal();
      return submitUserAction(data);
    };

    const userDetails = userAction ? userAction.userDetails : null;
    return (
      <ModalController>
        {({
            show,
            hide,
          }) => (
          <PricingWizardPage
            community={community}
            user={user}
            userDetails={userDetails}
            userActionSubmit={submitUserAction}
            onComplete={handleComplete}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  };
}
