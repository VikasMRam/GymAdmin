import React, { Component } from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import defaultsDeep from 'lodash/defaultsDeep';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/web/services/validation';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import DashboardListingDetailsForm from 'sly/web/dashboard/listings/DashboardListingDetailsForm';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { patchFormInitialValues } from 'sly/web/services/edits';
import { withProps } from 'sly/web/services/helpers/hocs';
import listingPropType from 'sly/common/propTypes/listing';

const validate = createValidator({
  name: [required],
});

const formName = 'DashboardCommunityDetailsForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(DashboardListingDetailsForm);

const formValue = formValueSelector(formName);

const mapStateToProps = (state, { status }) => ({
  currentValues: state.form[formName]?.values,
});

@query('updateListing', 'updateListing')
@withUser
@withRouter
@prefetch('listing', 'getListing', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect(mapStateToProps)
@withProps(({ status }) => ({
  address: status.listing.getRelationship(status.listing.result, 'address'),
}))
export default class DashboardListingDetailsFormContainer extends Component {
  static propTypes = {
    updateListing: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    listing: listingPropType.isRequired,
    match: object.isRequired,
    status: object,
    address: object,
    invalidateCommunity: func,
    currentEdit: object,
  };

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
    console.log(values);
    const { match, updateListing, notifyError, notifyInfo } = this.props;
    const { id } = match.params;

    const { address, tags, status, ...attributes } = values;
    attributes.status = parseFloat(status);

    const relationships = {
      address: { data: {
        attributes: address,
      } },
    };

    if (tags) {
      const jsonapiTags = tags.map(({ label, value }) => ({ type: 'Tag', id: value, attributes: { name: label } }));
      relationships.tags = { data: jsonapiTags };
    }
    return updateListing({ id }, {
      attributes,
      relationships,
    })
      .then(() => notifyInfo(`Details for ${attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${attributes.name} could not be saved`));
  };

  render() {
    const { listing, status, user, address, currentEdit, ...props } = this.props;
    const { tags: modelTags } = listing;
    let tags = [];
    if (modelTags) {
      tags = modelTags.map(({ id, name }) => ({ label: name, value: id }));
    }

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
        'info.description',
        'slyScore',
      ],
    );
    initialValues.address =  address.attributes;

    // passes by ref
    defaultsDeep(initialValues, {
      tags,
    });

    patchFormInitialValues(initialValues, currentEdit);

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        onCountryChange={this.onCountryChange}
        selectedCountry={this.state.selectedCountry}
        {...props}
      />
    );
  }
}
