import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/web/services/validation';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import DashboardListingDetailsForm from 'sly/web/dashboard/listings/DashboardListingDetailsForm';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { patchFormInitialValues } from 'sly/web/services/edits';
import { withProps } from 'sly/web/services/helpers/hocs';

const validate = createValidator({
  name: [required],
});

const formName = 'DashboardCommunityDetailsForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(DashboardListingDetailsForm);

const formValue = formValueSelector(formName);

@query('updateListing', 'updateListing')
@withUser
@withRouter
@prefetch('listing', 'getListing', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect((state, { status }) => ({
  respiteAllowed: formValue(state, 'attributes.info.respiteAllowed'),
}))
@withProps(({ status }) => ({
  address: status.listing.getRelationship(status.listing.result, 'address'),
}))
export default class DashboardListingDetailsFormContainer extends Component {
  // static propTypes = {
  //   updateCommunity: func.isRequired,
  //   notifyInfo: func.isRequired,
  //   notifyError: func.isRequired,
  //   user: userProptype,
  //   community: object.isRequired,
  //   match: object.isRequired,
  //   status: object,
  //   address: object,
  //   respiteAllowed: object,
  //   invalidateCommunity: func,
  //   currentEdit: object,
  // };

  state = { selectedCountry: 'United States' };

  componentDidMount() {
    this.setCountry();
  }

  componentDidUpdate() {
    this.setCountry();
  }

  setCountry= () => {
    const {
      address,
    } = this.props;
    if (address && this.state.selectedCountry !== address.attributes.country) {
      this.setState({ selectedCountry: address.attributes.country });
    }
  };

  onCountryChange = (event) => {
    this.setState({ selectedCountry: event.target.value });
  };

  handleSubmit = (values) => {
    const { match, updateListing, notifyError, notifyInfo } = this.props;
    const { id } = match.params;

    const { address, ...attributes } = values;
    console.log(attributes);
    return updateListing({ id }, {
      attributes,
      relationships: {
        address: { data: {
          attributes: address,
        } },
      },
    })
      .then(() => notifyInfo(`Details for ${attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${attributes.name} could not be saved`));
  };

  render() {
    const { listing, status, user, address, respiteAllowed, currentEdit, ...props } = this.props;

    const canEdit = !currentEdit?.isPendingForAdmin
       && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.listing.result.attributes,
      [
        'name',
        'info.phoneNumber',
        'info.ownerName',
        'info.floorPlan.bedroomCount',
        'info.floorPlan.bathroomCount',
        'info.floorPlan.area',
        'slyScore',
      ],
    );
    initialValues.address =  address.attributes;

    // patchFormInitialValues(initialValues, currentEdit);

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        respiteAllowed={respiteAllowed}
        onCountryChange={this.onCountryChange}
        selectedCountry={this.state.selectedCountry}
        {...props}
      />
    );
  }
}
