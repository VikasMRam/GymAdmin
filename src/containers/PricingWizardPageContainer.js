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
    postUserAction: func.isRequired,
    history: object.isRequired,
  };

  submitUserAction = (data) => {
    const {
      community, postUserAction, userDetails,
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

    return Promise.all([
      postUserAction(payload),
    ]);
  };

  handleComplete = (data, openConfirmationModal) => {
    const {
      community, history,
    } = this.props;

    return this.submitUserAction(data).then(() => {
      history.push(community.url);
      openConfirmationModal();
    });
  };

  render() {
    const {
      community, user, userDetails,
    } = this.props;

    if (!community) {
      return null;
    }

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
            userActionSubmit={this.submitUserAction}
            onComplete={this.handleComplete}
            showModal={show}
            hideModal={hide}
          />
        )}
      </ModalController>
    );
  };
}
