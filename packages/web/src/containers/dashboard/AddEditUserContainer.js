import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { required, createValidator } from 'sly/web/services/validation';
import { query, withUser } from 'sly/web/services/api';
import userPropType from 'sly/common/propTypes/user';
import { USER_RESOURCE_TYPE, UUIDAUX_RESOURCE_TYPE, ORGANIZATION_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import AddEditUserForm from 'sly/web/components/organisms/AddEditUserForm';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';


const validate = createValidator({
  name: [required],
  communityPhone: [required],
  typeCare: [required],
  line1: [required],
  city: [required],
  state: [required],
  zip: [required],
});

const formName = 'AddEditUserForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(AddEditUserForm);


@query('createUser', 'createUser')
@query('updateUser', 'updateUser')
@withUser
@withNotification
export default class AddEditUserContainer extends Component {
  static propTypes = {
    createUser: func.isRequired,
    user: userPropType,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired,
  };


  handleSubmit = (data) => {
    const { createUser, user, notifyError, notifyInfo, onSuccess, onCancel } = this.props;
    const { name, communityPhone, typeCare, line1, line2, city, state, country, zip } = data;

    const payload = {
      type: USER_RESOURCE_TYPE,
      attributes: {
        name,
        propInfo: {
          communityPhone,
          typeCare,
        },
      },
      relationships: {
        organization: {
          data: {
            type: ORGANIZATION_RESOURCE_TYPE,
            attributes: {
              line1,
              line2,
              city,
              state,
              country,
              zip,
            },
          },
        },
        address: {
          data: {
            type: UUIDAUX_RESOURCE_TYPE,
            attributes: {
              line1,
              line2,
              city,
              state,
              country,
              zip,
            },
          },
        },
      },
    };
    console.log('WQas going to add user ', payload);
    // notifyInfo('USER added successfully');
    // notifyError(`${name} could not be created`);
    // return createUser(payload)
    //   .then((resp) => {
    //     onCancel();
    //     notifyInfo('USER added successfully');
    //     if (onSuccess) {
    //       onSuccess(normJsonApi(resp));
    //     }
    //   })
    //   .catch(() => notifyError(`${name} could not be created`));
  };

  render() {
    const  { user } = this.props;
    const initialValues = user ? { ...user } : {};
    initialValues.country = 'United States';
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        {...this.props}
      />
    );
  }
}
