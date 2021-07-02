import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { func, string, oneOf, object } from 'prop-types';
import * as immutable from 'object-path-immutable';
import { withRouter } from 'react-router';

import ListingAgentForm from './ListingAgentForm';

import { prefetch, query, withAuth, withUser } from 'sly/web/services/api';
import { LISTING_CONSULTATION_REQUEST } from 'sly/web/services/api/constants';
import { capitalize } from  'sly/web/services/helpers/utils';
import matchPropType from 'sly/common/propTypes/match';
import userPropType from 'sly/common/propTypes/user';
import { createValidator, required, usPhone, email } from 'sly/web/services/validation';
import SlyEvent from 'sly/web/services/helpers/events';

const form = 'AskQuestionToAgentForm';
const validate = createValidator({
  location: [required],
  firstName: [required],
  lastName: [required],
  email: [required, email],
  phone: [required, usPhone],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form,
  validate,
  hasEmail: true,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(ListingAgentForm);

@withRouter
@withAuth
@withUser
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('createQuestion', 'createQuestion')
@query('updateUuidAux', 'updateUuidAux')

export default class ListingAgentFormContainer extends Component {
  static propTypes = {
    entityId: string,
    user: userPropType,
    createOrUpdateUser: func.isRequired,
    postSubmit: func,
    match: matchPropType.isRequired,
    createAction: func.isRequired,
    createQuestion: func,
    category: string,
    type: string,
    actionType: string,
    status: object.isRequired,
    updateUuidAux: func.isRequired,
  };

  static defaultProps = {
    category: 'listing',
    actionType: LISTING_CONSULTATION_REQUEST,
  };
  handleSubmit = (data, showSuccessPopup) => {
    const {
      entityId, postSubmit, createAction, createOrUpdateUser, updateUuidAux, match,
      user, category, type, status, actionType,
    } = this.props;
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };
    const rawUuidAux = status.uuidAux.result;
    const { message, location } = data;
    let { phone, email, name } = data;
    if (user) {
      if (user.phoneNumber) {
        ({ phoneNumber: phone } = user);
      }
      if (user.email) {
        ({ email } = user);
      }
      if (user.name) {
        ({ name } = user);
      }
    }
    const uuidInfo = rawUuidAux ? rawUuidAux.attributes.uuidInfo :  {};
    let updateUuidAuxReq = () => Promise.resolve();
    if (location) {
      const locationInfo = uuidInfo.locationInfo || {};
      const { city, state, geo } = location.searchParams;
      locationInfo.city = city;
      locationInfo.state = state;
      if (geo) {
        locationInfo.geo = {};
        locationInfo.geo.Latitude = geo.split(',')[0];
        locationInfo.geo.Longitude = geo.split(',')[1];
      }
      const uuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.locationInfo', locationInfo);
      updateUuidAuxReq = () => updateUuidAux({ id: uuidAux.id }, uuidAux);
    }
    const actionInfo = {
      listingSlug: entityId,
      name,
      email,
      phone,
      message,
    };
    return Promise.all([
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType,
          actionPage: match.url,
          actionInfo,
        },
      }),
      updateUuidAuxReq(),
    ])
      .then(() => {
        if (user) {
          if (postSubmit) {
            postSubmit();
          }
          return true;
        }
        return createOrUpdateUser({
          name,
          email,
          phone,
        }, { ignoreAlreadyRegistered: true });
      })
      .then(() => {
        const event = {
          action: 'consultaion_requested', category: 'Listing', label: entityId || match.url,
        };
        SlyEvent.getInstance().sendEvent(event);
        if (postSubmit) {
          postSubmit(showSuccessPopup);
        }
      });
  };

  sendMessageProgress = false;
  handleSendMessage = (data) => {
    this.sendMessageProgress = true;
    this.handleSubmit(data, true);
  }

  handleBookTour = (data) => {
    this.sendMessageProgress = true;
    this.handleSubmit(data, false);
    // URL hardcode for testing, it requires dashbaord and api changes
    const win = window.open('https://calendly.com/conciergebyseniorly/introductory-call-lake-shore-drive?utm_campaign=ILCalendly&utm_source=optimize&utm_medium=test&month=2021-07', '_blank');
    if (win != null) {
      win.focus();
    }
  }

  customProps = {
    handleSendMessage: this.handleSendMessage,
    sendMessageProgress: this.sendMessageProgress,
    handleBookTour: this.handleBookTour,
  };

  render() {
    // change user.name to first name and last name
    const { user } = this.props;
    let firstName; let lastName = '';
    if (user && user.name) {
      [firstName, lastName] = user.name ? user.name.split(' ') : ['', ''];
    }

    return (
      <ReduxForm
        firstName
        lastName
        {...this.props}
        onSubmit={this.handleSubmit}
        {...this.customProps}
      />
    );
  }
}
