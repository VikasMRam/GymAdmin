import React, { Component } from 'react';
import { reduxForm, SubmissionError, clearSubmitErrors, reset } from 'redux-form';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { createValidator, required, email } from 'sly/services/validation';
import { withAuth, query } from 'sly/services/newApi';
import EbookForm from 'sly/components/organisms/EbookForm';
import Thankyou from 'sly/components/molecules/Thankyou/index';
import SlyEvent from 'sly/services/helpers/events';

const formName = 'EbookForm';
const validate = createValidator({
  email: [required, email],
});

const afterSubmit = (result, dispatch) => dispatch(reset(formName));

const ReduxForm = reduxForm({
  form: formName,
  validate,
  onSubmitSuccess: afterSubmit,
})(EbookForm);

const mapDispatchToProps = dispatch => ({
  clearSubmitErrors: () => dispatch(clearSubmitErrors(formName)),
});

@query('sendEbook', 'sendEbook')
@withAuth
@connect(null, mapDispatchToProps)
export default class EbookFormContainer extends Component {
  static propTypes = {
    sendEbook: func.isRequired,
    clearSubmitErrors: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    pathname: string,
  };

  handheSubmitSuccess = () => {
    const { hideModal, showModal, pathname } = this.props;
    const event = {
      action: 'send-email', category: 'ebook', label: pathname,
    };
    hideModal();
    showModal(<Thankyou />);

    SlyEvent.getInstance().sendEvent(event);

    console.log('handle success');
  }

  handleSubmit = (data) => {
    const { sendEbook, clearSubmitErrors } = this.props;

    clearSubmitErrors();

    return sendEbook(data).then(this.handheSubmitSuccess).catch((response) => {
      const errorMessage = Object.values(response.body.errors).join('. ');

      throw new SubmissionError({ _error: errorMessage });
    });
  };

  render() {
    return <ReduxForm onSubmit={this.handleSubmit} {...this.props} />;
  }
}
