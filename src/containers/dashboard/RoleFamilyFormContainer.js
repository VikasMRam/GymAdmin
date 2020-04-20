import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import { withUser } from 'sly/services/api';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import { createValidator, dependentRequired, usPhone, email, required } from 'sly/services/validation';
import AddFamilyForm from 'sly/components/organisms/AddFamilyForm';

const validateAgentFields = createValidator({
  name: [required],
  preferredLocation: [required],
  source: [required],
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const validateAdminFields = createValidator({
  name: [required],
  preferredLocation: [required],
  source: [required],
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const AddFamilyReduxFormAdmin = reduxForm({
  form: 'AddFamilyFormAdmin',
  destroyOnUnmount: false,
  validateAdminFields,
})(AddFamilyForm);

const AddFamilyReduxFormAgent = reduxForm({
  form: 'AddFamilyForm',
  destroyOnUnmount: false,
  validateAgentFields,
})(AddFamilyForm);



@withUser

export default class RoleFamilyFormContainer extends Component {

  render() {
    const { user, ...props } = this.props;
    const { roleID } = user;
    /* eslint-disable-next-line no-bitwise */
    if (roleID & PLATFORM_ADMIN_ROLE) {
      return <AddFamilyReduxFormAdmin needsSource={true} {...props} />
    } else {
      return <AddFamilyReduxFormAgent needsSource={true} isNonSlyCreator={true} {...props} />
    }
  }

}
