import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';

import clientPropType from 'sly/common/propTypes/client';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import DashboardListingAdditionalInfoForm from 'sly/web/dashboard/listings/DashboardListingAdditionalInfoForm';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { patchFormInitialValues } from 'sly/web/services/edits';
import { withProps } from 'sly/web/services/helpers/hocs';
import { DEFAULT_SECTION_ORDER } from 'sly/web/dashboard/listings/constants';

const formName = 'DashboardListingAdditionalInfoForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardListingAdditionalInfoForm);

@query('updateListing', 'updateListing')
@withUser
@withRouter
@prefetch('listing', 'getListing', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@withProps(({ status }) => ({
  community: status.listing.getRelationship(status.listing.result, 'community'),
}))

export default class DashboardListingAdditionalInfoFormContainer extends Component {
  static propTypes = {
    // updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    // community: clientPropType.isRequired,
    status: object,
    currentEdit: object,
  };

  handleSubmit = (values) => {
    const { status, updateListing, notifyError, notifyInfo } = this.props;
    const rawListing = status.listing.result;
    const { id, attributes } = rawListing;

    return updateListing({ id }, {
      attributes: values,
    })
      .then(() => notifyInfo(`Details for ${attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${attributes.name} could not be saved`));
  };

  render() {
    const { listing, status, user, currentEdit, ...props } = this.props;
    const { info } = listing;
    const { description } = info;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const init = status.listing.result.attributes;

    const initialValues = pick(
      init,
      [
        'info.activities',
        'info.activityCalendarURL',
        'info.floorPlan.bathroomCount',
        'info.floorPlan.area',
        'info.description',
        'slyScore',
        'info.sections',
      ],
    );

    // start - this is redudant logic just to make sure that the order is maintained if someone makes a post request from postman
    const ordered = [];

    if (initialValues.info.sections) {
      DEFAULT_SECTION_ORDER.forEach((section) => {
        if (!ordered.includes(section)) {
          ordered.push(initialValues.info.sections.find(el => el.type === section));
        }
      });
      initialValues.info.sections = [...ordered];
    }
    // end


    patchFormInitialValues(initialValues, currentEdit);

    // passes by ref
    defaultsDeep(initialValues, {
      info: {
        profileServices: [],
      },
    });

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        listing={listing}
        {...props}
      />
    );
  }
}
