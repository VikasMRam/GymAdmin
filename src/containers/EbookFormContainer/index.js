import React, { PureComponent } from 'react';
import { SubmissionError, clearSubmitErrors, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { func, string, object } from 'prop-types';

import { createValidator, email, required } from 'sly/services/validation';
import { query } from 'sly/services/newApi';
import EbookForm from 'sly/components/organisms/EbookForm';
import withNotification from 'sly/controllers/withNotification';
import SlyEvent from 'sly/services/helpers/events';
import { EBOOK_SEND_EMAIL } from 'sly/services/newApi/constants';
import withAuth from 'sly/services/newApi/withAuth';

const formName = 'EbookForm';
const validate = createValidator({
  email: [required, email],
});

const sendEvent = (action, label) => SlyEvent.getInstance().sendEvent({
  category: 'ebook',
  action,
  label,
});

const afterSubmit = (result, dispatch) => dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit,
})(EbookForm);

ReduxForm.displayName = 'EbookForm';

const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch(clearSubmitErrors(formName)),
});

@withRouter
@withNotification
@withAuth
@query('sendEbook', 'sendEbook')
@query('createAction', 'createUuidAction')
@connect(null, mapDispatchToProps)
export default class EbookFormContainer extends PureComponent {
  static propTypes = {
    sendEbook: func.isRequired,
    clearErrors: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    createAction: func.isRequired,
    createOrUpdateUser: func.isRequired,
    location: object,
    event: string,
  };

  componentDidMount() {
    const { event, location: { pathname } } = this.props;

    sendEvent(`${event}-ebook-form-open`, pathname);
  }

  componentWillUnmount() {
    const { event, location: { pathname } } = this.props;

    sendEvent(`${event}-ebook-form-close`, pathname);
  }

  handleSubmit = (data) => {
    const {
      clearErrors, event, hideModal, notifyInfo, sendEbook, createAction, createOrUpdateUser, location: { pathname },
    } = this.props;

    clearErrors();

    return Promise.all([
      sendEbook({
        type: 'HealthyAging',
        attributes: {
          ...data,
        },
      }),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionType: EBOOK_SEND_EMAIL,
          actionPage: pathname,
          actionInfo: {
            email: data.email,
          },
        },
      }),
    ]).then(() => createOrUpdateUser({
      email: data.email,
    })).then(
      () => {
        hideModal();
        sendEvent(`${event}-send-mail`, pathname);
        notifyInfo(`We have sent the booklet to your email ${data.email}`);
      },
    ).catch((response) => {
      const errorMessage = Object.values(response.body.errors).join('. ');

      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return (
      <ReduxForm onSubmit={this.handleSubmit} {...this.props} />
    );
  }
}
