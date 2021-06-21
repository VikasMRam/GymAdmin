import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';
import { id } from 'date-fns/locale';

import { required, createValidator } from 'sly/web/services/validation';
import { LISTING_RESOURCE_TYPE, ADDRESS_RESOURCE_TYPE } from 'sly/web/constants/resourceTypes';
import { query } from 'sly/web/services/api';
import AddListingForm from 'sly/web/dashboard/listings/AddListingForm';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';


const validate = createValidator({
  name: [required],
  phoneNumber: [required],
  slyScore: [required],
  line1: [required],
  city: [required],
  state: [required],
  zip: [required],
});

const formName = 'AddListingForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(AddListingForm);


@query('createListing', 'createListing')

export default class AddListingFormContainer extends Component {
  static propTypes = {
    createListing: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    onSuccess: func.isRequired,
    onCancel: func.isRequired,
  };
  state = { selectedCountry: 'United States' };

  onCountryChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };


  handleSubmit = (data) => {
    const { createListing, notifyError, notifyInfo, onSuccess, onCancel } = this.props;
    const { name, phoneNumber, line1, line2, city, state, country, zip, slyScore, id, slug: { value } } = data;


    const payload = {
      type: LISTING_RESOURCE_TYPE,
      attributes: {
        name,
        slyScore,
        status: 2,
        info: {
          phoneNumber,
          agentSlug: value,
        },
      },
      relationships: {
        address: {
          data: {
            type: ADDRESS_RESOURCE_TYPE,
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
        community: {
          data: {
            type: 'Community',
            id,
          },
        },
      },
    };
    return createListing(payload)
      .then((resp) => {
        onCancel();
        notifyInfo('Listing added successfully');
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
