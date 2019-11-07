import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

import { community as communityPropType } from 'sly/propTypes/community';

import SlyEvent from 'sly/services/helpers/events';

import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';

import InplaceWizardPage from 'sly/components/pages/InplaceWizardPage';
import { query } from 'sly/services/newApi';
import { CONSULTATION_REQUESTED } from 'sly/services/newApi/constants';
import { REQUEST_CONSULTATION } from 'sly/services/api/actions';
import { resourceCreateRequest } from 'sly/store/resource/actions';


const eventCategory = 'ProfileWizard';
const submit = data => resourceCreateRequest('userAction', data);
@query('createAction', 'createUuidAction')

@connect(null, { submit })

export default class CommunityInpageWizardContainer extends Component {
  static propTypes = {
    community: communityPropType,
    userAction: object,
    user: object,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    createAction: func,
    submit: func,

  };

  submitUserAction = (data) => {
    const {
      community, createAction, userAction, submit,
    } = this.props;

    // here remove only fields that will be populated by getUserDetailsFromUAAndForm
    const {
      name, phone, medicaidCoverage, budget, roomType, careType, contactByTextMsg, interest, ...restData
    } = data;

    const { userDetails } = userAction;

    const user = getUserDetailsFromUAAndForm({
      userDetails,
      formData: data,
    });

    if (!user.email && !user.phone) {
      return Promise.resolve();
    }
    SlyEvent.getInstance().sendEvent({
      action: 'wizard-requested',
      category: eventCategory,
      label: community.id,
    });
    return Promise.all([
      submit({
        action: REQUEST_CONSULTATION,
        value: { user, propertyIds: [community.id], type: 'InpageWizard' },
      }),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: community.id,
            name: user.full_name,
            phone: user.phone,
          },
          actionType: CONSULTATION_REQUESTED,
        },
      }),
    ]);
  };

  render() {
    const {
      community, user, userAction, showModal, hideModal,
    } = this.props;

    if (!community) {
      return null;
    }
    const { userDetails } = userAction;
    return (
      <InplaceWizardPage
        community={community}
        user={user}
        userActionSubmit={this.submitUserAction}
        userDetails={userDetails}
        onComplete={this.handleComplete}
        showModal={showModal}
        hideModal={hideModal}
      />
    );
  };
}
