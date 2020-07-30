import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { reduxForm } from 'redux-form';

import { query, withUser } from 'sly/web/services/api';
import contactPropType from 'sly/common/propTypes/contact';
import { createValidator, email, required, usPhone } from 'sly/web/services/validation';
import AddContactForm from 'sly/web/components/organisms/AddContactForm';
import withNotification from 'sly/web/controllers/withNotification';
import { saveContactPayload } from 'sly/web/containers/dashboard/helpers';

const validate = createValidator({
  name: [required],
  email: [required, email],
  mobilePhone: [required, usPhone],
  community: [required],
});

const ReduxForm = reduxForm({
  form: 'AddOrEditContactForm',
  validate,
})(AddContactForm);

@query('createContact', 'createContact')
@query('updateContact', 'updateContact')
@withUser
@withNotification
export default class AddOrEditContactFormContainer extends Component {
  static propTypes = {
    createContact: func.isRequired,
    updateContact: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired,
    contact: contactPropType,
    refetchContacts: func.isRequired,
    entityId: string.isRequired,
    entityType: string.isRequired,
    entityName: string.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmitTask = this.handleSubmitTask.bind(this);
  }

  async handleSubmitTask(data) {
    const { createContact, updateContact, notifyInfo, onSuccess, contact, refetchContacts, notifyError, entityId, entityType } = this.props;

    try {
      if (contact) {
        const payload = saveContactPayload({
          name: data.name,
          email: data.email,
          mobilePhone: data.mobilePhone,
          entity: { id: entityId, type: entityType },
        });
        await updateContact({ id: contact.id }, payload);
      } else {
        const payload = saveContactPayload({
          name: data.name,
          email: data.email,
          mobilePhone: data.mobilePhone,
          entity: { id: entityId, type: entityType },
        });
        await createContact(payload);
      }

      await refetchContacts();

      notifyInfo(contact ? 'Contact successfully updated' : 'Contact created');
      onSuccess();
    } catch (error) {
      const { errors } = error.body || {};
      const errorMessage = errors ? errors.map(e => e.title).join('. ') : error;

      console.error(errorMessage);
      notifyError('Failed to modify contact. Please try again.');
    }
  }

  render() {
    const { contact, onCancel, entityId, entityType, entityName } = this.props;
    const initialValues = contact ? { ...contact } : {};
    initialValues.entity = { id: entityId, type: entityType, name: entityName };
    return (
      <ReduxForm
        onSubmit={this.handleSubmitTask}
        onCancel={onCancel}
        initialValues={initialValues}
        heading={initialValues.name || 'Add contact'}
      />
    );
  }
}
