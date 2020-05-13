import React, { Component } from 'react';
import { reset, reduxForm, clearSubmitErrors, SubmissionError } from 'redux-form';
import { func, arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SlyEvent from 'sly/web/services/helpers/events';
import { query, prefetch } from 'sly/web/services/api';
import { CURTIANUP_SUBSCRIBE } from 'sly/web/services/api/constants';
import matchPropType from 'sly/web/propTypes/match';
import uuidActionPropType from 'sly/web/propTypes/uuidAction';
import withNotification from 'sly/web/controllers/withNotification';
import { createValidator, email, usPhone, dependentRequired } from 'sly/web/services/validation';
import CurtainupSubscribeForm from 'sly/web/components/organisms/CurtainupSubscribeForm';

const validate = createValidator({
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const formName = 'CurtainupSubscribeForm';

const afterSubmit = (result, dispatch) => dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit,
})(CurtainupSubscribeForm);

const mapDispatchToProps = {
  clearSubmitErrors: () => clearSubmitErrors(formName),
};

@withNotification

@withRouter

@connect(null, mapDispatchToProps)

@query('createAction', 'createUuidAction')

@prefetch('actions', 'getUuidActions', req => req({
  'filter[actionType]': CURTIANUP_SUBSCRIBE,
}))

export default class CurtainupSubscribeFormContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    createAction: func.isRequired,
    clearSubmitErrors: func.isRequired,
    match: matchPropType,
    actions: arrayOf(uuidActionPropType),
    status: object,
  };

  handleSubmit = ({ email, phone }) => {
    const { actions, status, notifyInfo, notifyError, clearSubmitErrors, createAction, match: { url } } = this.props;

    if (actions.length) {
      return notifyError('You are already subscribed!');
    }

    clearSubmitErrors();

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: CURTIANUP_SUBSCRIBE,
        actionPage: url,
        actionInfo: {
          email,
          phone,
        },
      },
    }).then((resp) => {
      const event = {
        action: 'subscribe', category: 'curtianup', label: email || phone,
      };
      SlyEvent.getInstance().sendEvent(event);
      notifyInfo('You have been subscribed successfully.');
      actions.push(resp);
    }).catch(() => {
      throw new SubmissionError({ _error: 'Failed to subscribe. Please try again.' });
    });
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
