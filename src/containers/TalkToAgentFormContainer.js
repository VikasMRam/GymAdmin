import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset } from 'redux-form';

import { createValidator, required, usPhone } from 'sly/services/validation';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import { REQUEST_AGENT_CONSULT } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import SlyEvent from 'sly/services/helpers/events';

const handleLocationChange = () => {

};

const form = 'TalkToAgentForm';
const validate = createValidator({
  location: [required],
  phone: [usPhone, required],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

class TalkToAgentFormContainer extends Component {
  static propTypes = {
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    postSubmit: func,
    pathName: string.isRequired,
  };

  handleSubmit = (data) => {
    const { message, location } = data;
    const {
      userDetails, postUserAction, postSubmit, pathName,
    } = this.props;
    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const { formatted_address, geometry } = location;
    const { lat, lng } = geometry.location;
    const value = {
      user,
      details: {
        message,
        location_text: formatted_address,
        latitude: lat(),
        longitude: lng(),
      },
    };
    const payload = {
      action: REQUEST_AGENT_CONSULT,
      value,
    };

    return postUserAction(payload)
      .then(() => {
        const event = {
          action: 'ask_question', category: 'agent', label: pathName,
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
        onLocationChange={handleLocationChange}
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}

export default TalkToAgentFormContainer;
