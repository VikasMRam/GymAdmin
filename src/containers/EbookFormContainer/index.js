import React, { PureComponent } from 'react';
import { SubmissionError, clearSubmitErrors, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { createValidator, email, required } from 'sly/services/validation';
import { query, withAuth } from 'sly/services/newApi';
import EbookForm from 'sly/components/organisms/EbookForm';
import Thankyou from 'sly/components/molecules/Thankyou/index';
import withNotification from 'sly/controllers/withNotification';

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
  clearErrors: () => dispatch(clearSubmitErrors(formName)),
});

@withNotification
@query('sendEbook', 'sendEbook')
@connect(null, mapDispatchToProps)
export default class EbookFormContainer extends PureComponent {
  static propTypes = {
    sendEbook: func.isRequired,
    clearErrors: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    pathname: string,
    notifyInfo: func.isRequired,
    sendEvent: func.isRequired,
  };

  componentDidMount() {
    this.props.sendEvent('ebook-form-open', this.props.pathname, '', 'ebook');
  }

  componentWillUnmount() {
    this.props.sendEvent('ebook-form-close', this.props.pathname, '', 'ebook');
  }

  handleSubmit = (data) => {
    const { sendEbook, clearErrors, notifyInfo } = this.props;

    clearErrors();

    return sendEbook(data).then(
      () => {
        this.props.sendEvent('send-mail', this.props.pathname, '', 'ebook');

        notifyInfo(`we have sent the booklet to your email ${data.email}`);
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
