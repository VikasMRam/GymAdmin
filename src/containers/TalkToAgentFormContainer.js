import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import { reduxForm, reset } from 'redux-form';
import { withRouter } from 'react-router';

import { query } from 'sly/services/newApi';
import { connectController } from 'sly/controllers';
import { resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import withServerState from 'sly/store/withServerState';
import { getDetail } from 'sly/store/selectors';
import { createValidator, required, usPhone } from 'sly/services/validation';
import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';
import { REQUEST_AGENT_CONSULT } from 'sly/services/api/actions';
import { getUserDetailsFromUAAndForm } from 'sly/services/helpers/userDetails';
import SlyEvent from 'sly/services/helpers/events';
import { CONSULTATION_REQUESTED } from 'sly/services/newApi/constants';

const form = 'TalkToAgentForm';
const validate = createValidator({
  location: [required],
  phone: [usPhone, required],
  message: [required],
  full_name: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const initialValues = {
  location: {},
  phone: '',
  message: '',
  full_name: '',
};
const ReduxForm = reduxForm({
  form,
  validate,
  initialValues,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(TalkToAgentForm);

const mapStateToProps = (state, { location }) => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails,
  pathName: location.pathname,
});

const mapDispatchToProps = dispatch => ({
  postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
});

const mapPropsToActions = () => ({
  userDetails: resourceDetailReadRequest('userAction'),
});

@withRouter

@withServerState(mapPropsToActions)

@connectController(mapStateToProps, mapDispatchToProps)

@query('createAction', 'createUuidAction')

export default class TalkToAgentFormContainer extends Component {
  static propTypes = {
    userDetails: object.isRequired,
    postUserAction: func.isRequired,
    postSubmit: func,
    pathName: string.isRequired,
    createAction: func.isRequired,
    match: object.isRequired,
  };

  handleSubmit = (data) => {
    const { message, location, full_name } = data;
    const {
      userDetails, postUserAction, postSubmit, pathName, createAction, match,
    } = this.props;

    const user = getUserDetailsFromUAAndForm({ userDetails, formData: data });
    const { formatted_address, geometry } = location;
    const { lat, lng } = geometry.location;
    const value = {
      user,
      details: {
        message,
        full_name,
        location_text: formatted_address,
        latitude: lat(),
        longitude: lng(),
      },
    };
    const payload = {
      action: REQUEST_AGENT_CONSULT,
      value,
    };

    const { email, phone } = user;

    return Promise.all([
      postUserAction(payload),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: { email, phone, name: full_name },
          actionPage: match.url,
          actionType: CONSULTATION_REQUESTED,
        },
      }),
    ]).then(() => {
      const event = {
        action: 'ask_question', category: 'agent', label: pathName,
      };
      SlyEvent.getInstance().sendEvent(event);
      if (postSubmit) {
        postSubmit();
      }
    });
  };

  render() {
    const { ...props } = this.props;
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        {...props}
      />
    );
  }
}
