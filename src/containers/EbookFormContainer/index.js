import React, { PureComponent } from 'react';
import { SubmissionError, clearSubmitErrors, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import { createValidator, email, required } from 'sly/services/validation';
import { query } from 'sly/services/newApi';
import EbookForm from 'sly/components/organisms/EbookForm';
import withNotification from 'sly/controllers/withNotification';
import SlyEvent from 'sly/services/helpers/events';

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
    event: string,
  };

  componentDidMount() {
    const { event, pathname } = this.props;

    sendEvent(`${event}-ebook-form-open`, pathname);
  }

  componentWillUnmount() {
    const { event, pathname } = this.props;

    sendEvent(`${event}-ebook-form-close`, pathname);
  }

  handleSubmit = (data) => {
    const {
      sendEbook, clearErrors, notifyInfo, event,
    } = this.props;

    clearErrors();

    return sendEbook(data).then(
      () => {
        sendEvent(`${event}-send-mail`, this.props.pathname);

        notifyInfo(`we have sent the booklet to your email ${data.email}`);
      },
    ).catch((response) => {
      notifyInfo(`we have sent the booklet to your email ${data.email}`);

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
