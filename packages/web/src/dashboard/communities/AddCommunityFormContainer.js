import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import { required, createValidator } from 'sly/web/services/validation';
import { COMMUNITY_RESOURCE_TYPE, ADDRESS_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import { query } from 'sly/web/services/api';
import AddCommunityForm from 'sly/web/components/organisms/AddCommunityForm';
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

const formName = 'AddCommunityForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(AddCommunityForm);


@query('createCommunity', 'createCommunity')

export default class AddCommunityFormContainer extends Component {
  static propTypes = {
    createCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired
  };

  state = { selectedCountry: 'United States' };

  onCountryChange = ( event ) => {
    this.setState({ selectedCountry: event.target.value });
  };


  handleSubmit = (data) => {
    const { createCommunity, notifyError, notifyInfo, onSuccess, onCancel } = this.props;
    const { name, communityPhone, typeCare, line1, line2, city, state, country, zip } = data;

    const payload = {
      type: COMMUNITY_RESOURCE_TYPE,
      attributes: {
        name: name,
        propInfo: {
          communityPhone: communityPhone,
          typeCare: typeCare,
        }
      },
      relationships: {
        address: {
          data: {
            type: ADDRESS_RESOURCE_TYPE,
            attributes: {
              line1: line1,
              line2: line2,
              city: city,
              state: state,
              country: country,
              zip: zip,
            }
          }
        }
      }
    };

    return createCommunity(payload)
      .then((resp) => {
        onCancel();
        notifyInfo('Community added successfully');
        if (onSuccess) {
          onSuccess(normJsonApi(resp));
        }
      })
      .catch(() => notifyError(`${name} could not be created`));
  };

  render() {
    const initialValues = {};
    initialValues.country = 'United States';
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        onCountryChange={this.onCountryChange}
        selectedCountry={this.state.selectedCountry}
        initialValues={initialValues}
        {...this.props}
      />
    );
  }
}
