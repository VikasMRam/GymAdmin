import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, array } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';


import clientPropType from 'sly/common/propTypes/client';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import { withProps } from 'sly/web/services/helpers/hocs';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import DashboardCommunityNewPricingForm from 'sly/web/components/organisms/DashboardCommunityNewPricingForm';
import { patchFormInitialValues } from 'sly/web/services/edits';
import {  costSections, costSectionOptions } from 'sly/web/constants/communityPricing';


let defaultValues = [];
const initialDataStrings = [];

const formName = 'DashboardCommunityNewPricingForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityNewPricingForm);

const dashboardCommunityCareSorter = (a, b) => {
  return costSections.indexOf(a.attributes.title) - costSections.indexOf(b.attributes.title);
};


@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@withProps(({ status }) => {
  const prices  = status.community.getRelationship(status.community.result, 'prices');
  const rgsAux = status.community.getRelationship(status.community.result, 'rgsAux');
  return {
    prices,
    rgsAux,
  };
})
@connect((state) => {
  return {
    currentValues: state.form[formName]?.values,
  };
})

export default class DashboardCommunityPricingFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    currentValues: object.isRequired,
    match: object.isRequired,
    currentEdit: object,
    status: object,
    prices: array,
    rgsAux: object,
  };


  state={
    hasNewPricing: !!this.props.prices[0],
    newPricingOnWaitlist: !!this.props?.rgsAux?.attributes?.rgsInfo?.availabilityInfo?.onNewPricingWaitlist,
    eligibleForNewPricing: this.props.community.care.some(careType => costSections.includes(careType)),
  }


  onUpdatePricingClick=() => {
    this.setState({ hasNewPricing: true });
  }

  onJoinWaitListClick=() => {
    const { match, updateCommunity, notifyError, notifyInfo, community } = this.props;
    const { id } = match.params;

    return updateCommunity({ id }, {
      relationships:
        { rgsAux:
          { data: {
            attributes: {
              rgsInfo: {
                availabilityInfo: {
                  onNewPricingWaitlist: true,
                },
                contract_info: {
                  hasContract: true,
                },
              },
            },
          },

          },
        },
    },
    )
      .then(() => {
        notifyInfo(`${community.name} added to waitlist`);
        this.setState({ newPricingOnWaitlist: true });
      },
      )
      .catch(() => notifyError(`${community.name} could not be added to waitlist`));
  }

  handleSubmit = (values) => {
    const { match, updateCommunity, community, notifyError, notifyInfo } = this.props;
    const { id } = match.params;
    const { prices, ...attributes } = values;
    const valuesArray = Object.values(prices);


    // Check that at least one pricing type that isn't additional costs is filled and that the correct inputs are filled for to and from pricing types
    let atLeastOne = false;
    let error = '';


    valuesArray.every((entityPrice) => {
      Object.values(entityPrice.attributes.info.prices).forEach((room) => {
        if (room.type !== 'disabled' && entityPrice.title !== 'Additonal Costs') {
          atLeastOne = true;
        }
        if (room.type === 'range' && !room.to && !room.from) {
          error = 'For "range" pricing "to" and "from" values must both be filled';
          return false;
        }
        if (room.type === 'range' && room.to <= room.from) {
          error = 'For "range" pricing "to" value must be greater than "from"';
          return false;
        }

        if (room.type === 'from' && !room.from) {
          error = 'For "from" pricing "from" value must be filled';
          return false;
        }
      });
      return true;
    });

    if (!atLeastOne) {
      notifyError('All pricing types cannot be disabled');
      return null;
    }

    if (error) {
      notifyError(error);
      return null;
    }

    return updateCommunity({ id }, {
      attributes,
      relationships:
        { prices:
          { data:
            [
              ...valuesArray,
            ],
          },
        },
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, status, prices, currentEdit, user, currentValues, ...props } = this.props;
    const { hasNewPricing, eligibleForNewPricing, newPricingOnWaitlist } = this.state;


    // filter care for only pricing types available in constants and add Additonal Costs
    const validatedCareTypes = community.care.filter(careType => costSections.includes(careType));
    validatedCareTypes.push('Additional Costs');

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    console.log(prices);
    const sortedPrices = { prices: prices.sort(dashboardCommunityCareSorter) };


    if (!initialDataStrings[0]) {
      validatedCareTypes.forEach((priceEntity, index) => {
        costSectionOptions[priceEntity].costTypes.forEach((roomType) => {
          initialDataStrings.push(`prices.${index}.attributes.info.prices.${roomType.value}.to`);
          initialDataStrings.push(`prices.${index}.attributes.info.prices.${roomType.value}.from`);
          initialDataStrings.push(`prices.${index}.attributes.info.prices.${roomType.value}.type`);
        });
        initialDataStrings.push(`prices.${index}.attributes.title`);
      });


      defaultValues = validatedCareTypes.map((careType) => {
        const entityPrice = {
          type: 'EntityPrice',
          attributes: {
            entityType: 'Property',
            title: careType,
            info: {
              prices: {

              },
            },
          },
        };
        costSectionOptions[careType].costTypes.forEach((roomType) => {
          entityPrice.attributes.info.prices[roomType.value] = {};
          entityPrice.attributes.info.prices[roomType.value].type = 'range';
        });
        return entityPrice;
      });
    }


    const initialValues = pick(
      sortedPrices,
      initialDataStrings,
    );


    patchFormInitialValues(initialValues, currentEdit);


    // passes by ref
    defaultsDeep(initialValues, { prices: defaultValues },
    );


    return (
      <ReduxForm
        careTypes={validatedCareTypes}
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        currentValues={currentValues}
        user={user}
        canEdit={canEdit}
        hasNewPricing={hasNewPricing}
        eligibleForNewPricing={eligibleForNewPricing}
        newPricingOnWaitlist={newPricingOnWaitlist}
        onUpdatePricingClick={this.onUpdatePricingClick}
        onJoinWaitListClick={this.onJoinWaitListClick}
        {...props}
      />
    );
  }
}
