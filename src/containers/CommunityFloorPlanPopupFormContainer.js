import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object, func, string } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { REQUEST_FLOORPLAN } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import { resourceCreateRequest } from 'sly/store/resource/actions';
import CommunityFloorPlanPopupForm from 'sly/components/molecules/CommunityFloorPlanPopupForm';
import { createValidator, required } from 'sly/services/validation';

const validate = createValidator({
  name: [required],
  phone: [required],
});
const ReduxForm = reduxForm({
  form: 'CommunityFloorPlanPopupForm',
  destroyOnUnmount: true,
  validate,
})(CommunityFloorPlanPopupForm);

class CommunityFloorPlanPopupFormContainer extends Component {
  handleSubmit = (data) => {
    const { notes } = data;
    const {
      community, userDetails, postUserAction, postSubmit, typeOfCare, floorPlanInfo,
    } = this.props;
    const { roomType } = floorPlanInfo;
    const { id } = community;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const value = {
      notes,
      slug: id,
      listingType: `${typeOfCare} - ${roomType}`,
      user,
    };
    const payload = {
      action: REQUEST_FLOORPLAN,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        const event = {
          action: 'consultation_requested', category: 'floorPlan', label: id,
        };
        SlyEvent.getInstance().sendEvent(event);
        if (postSubmit) {
          postSubmit();
        }
      });
  }

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
  community: object.isRequired,
  userDetails: object.isRequired,
  postUserAction: func.isRequired,
  typeOfCare: string,
  floorPlanInfo: object,
  postSubmit: func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

export default connect(null, mapDispatchToProps)(CommunityFloorPlanPopupFormContainer);
