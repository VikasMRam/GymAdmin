import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { reduxForm, SubmissionError, reset } from 'redux-form';


import ContactUsForm from 'sly/web/components/common/ContactUsForm';
import { createValidator, required, email, usPhone } from 'sly/web/services/validation';
import { useQuery } from 'sly/web/services/api';
import { useNotification } from 'sly/web/components/helpers/notification';
import SlyEvent from 'sly/web/services/helpers/events';

const form = 'ContactUsForm';
const validate = createValidator({
  firstName: [required],
  lastName: [required],
  email: [required, email],
  phone_number: [required, usPhone],
  message: [required],
});

const afterSubmit = (result, dispatch) => dispatch(reset(form));

const ReduxForm = reduxForm({
  form: 'ContactUsForm',
  validate,
  onSubmitSuccess: afterSubmit,
  destroyOnUnmount: false,
})(ContactUsForm);

const ContactUsFormContainer = (props) => {
  const createAction = useQuery('createUuidAction');
  const { pathname: url } = useLocation();
  const { notifyInfo } = useNotification();

  const handleSubmit = useCallback((data) => {
    data = { ...data, name: `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` };
    const { phone, email, name, message } = data;
    const actionInfo = { phone, name, email, message };

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo,
        actionPage: url,
        actionType: 'consultationRequested',
      },
    })
      .then(({ body: { data } }) => {
        if (data) {
          const { attributes } = data || {};
          const event = {
            action: 'send_message',
            category: attributes?.actionType,
            label: url,
          };
          SlyEvent.getInstance().sendEvent(event);
          notifyInfo('We have received your message and we will get back to you soon.');
        }
      })
      .catch(({ body }) => {
        let errorMessage;
        if (body?.errors) {
          errorMessage = body.errors[0].detail;
        } else {
          console.error(body);
        }
        throw new SubmissionError({ _error: errorMessage });
      });
  }, [url]);

  return (
    <ReduxForm
      onSubmit={handleSubmit}
      {...{ ...props }}
    />
  );
};

export default ContactUsFormContainer;
