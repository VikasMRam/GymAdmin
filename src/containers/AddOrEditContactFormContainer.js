import React, { Component } from 'react';
import { func } from 'prop-types';
import { reduxForm } from 'redux-form';
import { query } from 'sly/services/api';
import { withUser } from 'sly/services/api';
import contactPropType from 'sly/propTypes/contact';
import { createValidator, email, required, usPhone } from 'sly/services/validation';
import { PROPERTY_ENTITY_TYPE } from 'sly/constants/entityTypes';
import AddContactForm from 'sly/components/organisms/AddContactForm';
import withNotification from 'sly/controllers/withNotification';
import { saveContactPayload } from 'sly/containers/dashboard/helpers';

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
  };

  constructor(props) {
    super(props);

    this.handleSubmitTask = this.handleSubmitTask.bind(this);
  }

  async handleSubmitTask(data) {
    const { createContact, updateContact, notifyInfo, onSuccess, contact, refetchContacts, notifyError } = this.props;

    const payload = saveContactPayload({
      name: data.name,
      email: data.email,
      mobilePhone: data.mobilePhone,
      entity: { id: data.community.id, type: PROPERTY_ENTITY_TYPE },
    });

    try {
      if (contact) {
        await updateContact({ id: contact.id }, payload);
      } else {
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
    const { contact, onCancel } = this.props;
    const initialValues = contact
      ? { ...contact, community: { id: contact.entities[0].id, name: contact.entities[0].label } }
      : {};

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
