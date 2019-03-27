import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object, func, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/services/newApi';
import SlyEvent from 'sly/services/helpers/events';
import { REQUEST_FLOORPLAN } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import CommunityFloorPlanPopupForm from 'sly/components/molecules/CommunityFloorPlanPopupForm';
import { createValidator, required } from 'sly/services/validation';
import { FLOOR_PLAN_REQUESTED } from 'sly/services/newApi/constants';

const validate = createValidator({
  name: [required],
  phone: [required],
});
const ReduxForm = reduxForm({
  form: 'CommunityFloorPlanPopupForm',
  destroyOnUnmount: true,
  validate,
})(CommunityFloorPlanPopupForm);


const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

@withRouter

@connect(null, mapDispatchToProps)

@query('createAction', 'createUuidAction')

export default class CommunityFloorPlanPopupFormContainer extends Component {
  handleSubmit = (data) => {
    const { notes } = data;
    const {
      communitySlug, userDetails, postUserAction, postSubmit, floorPlanInfo, typeOfCare,
      createAction, match,
    } = this.props;
    const { roomType } = floorPlanInfo;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      notes,
      slug: communitySlug,
      listingType: `${typeOfCare} - ${roomType}`,
      user,
    };
    const payload = {
      action: REQUEST_FLOORPLAN,
      value,
    };

    return Promise.all([
      postUserAction(payload),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType: FLOOR_PLAN_REQUESTED,
          actionPage: match.url,
          actionInfo: {
            slug: communitySlug,
            notes,
            listingType: 'Property',
          },
        },
      }),
    ])
      .then(() => {
        const event = {
          action: 'consultation_requested', category: 'floorPlan', label: communitySlug,
        };
        SlyEvent.getInstance().sendEvent(event);
        if (postSubmit) {
          postSubmit();
        }
      });
  };

  render() {
    const { ...props } = this.props;
    const initialValues = {};
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}

CommunityFloorPlanPopupFormContainer.propTypes = {
  communitySlug: string.isRequired,
  userDetails: object.isRequired,
  postUserAction: func.isRequired,
  typeOfCare: string,
  floorPlanInfo: object,
  postSubmit: func,
};

