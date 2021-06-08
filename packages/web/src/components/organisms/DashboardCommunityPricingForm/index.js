import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import { Section, SectionActions, SectionHeader, SectionForm } from 'sly/web/dashboard/DashboardWithSummaryTemplate';

const trueFalseOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

export default class DashboardCommunityPricingForm extends Component {
  static propTypes = {
    currentValues: object,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, currentValues,
    } = this.props;

    return (
      <Section
        as="form"
        onSubmit={handleSubmit}
      >
        <SectionHeader>
          Pricing
        </SectionHeader>

        <SectionForm heading="Base costs">
          <EditField
            name="propInfo.ratesText"
            label="Rates starting at"
            type="text"
            readOnly={!canEdit}
            placeholder="Starting rates"
            wideWidth
          />
          <EditField
            name="propInfo.sharedSuiteRate"
            label="Shared suite"
            type="text"
            readOnly={!canEdit}
            placeholder="2,000"
            wideWidth
          />
          <EditField
            name="propInfo.privateSuiteRate"
            label="Private suite"
            type="text"
            readOnly={!canEdit}
            placeholder="3,000"
            wideWidth
          />
          <EditField
            name="propInfo.studioApartmentRate"
            label="Studio apartment"
            type="text"
            readOnly={!canEdit}
            placeholder="5,000"
            wideWidth
          />
          <EditField
            name="propInfo.oneBedroomApartmentRate"
            label="One bedroom apartment"
            type="text"
            readOnly={!canEdit}
            placeholder=""
            wideWidth
          />
          <EditField
            name="propInfo.twoBedroomApartmentRate"
            label="Two bedroom apartment"
            type="text"
            readOnly={!canEdit}
            placeholder=""
            wideWidth
          />
        </SectionForm>

        <SectionForm heading="Additional Care Costs">
          <EditField
            name="propInfo.isCareCostIncluded"
            type="boolean"
            label="Care costs included"
            readOnly={!canEdit}
            wideWidth
          />
          {!currentValues?.propInfo?.isCareCostIncluded && (
            <>
              <EditField
                name="propInfo.alCareRate"
                label="Assisted living"
                type="text"
                options={trueFalseOptions}
                readOnly={!canEdit}
                wideWidth
              />
              <EditField
                name="propInfo.mcCareRate"
                label="Memory care"
                type="text"
                options={trueFalseOptions}
                readOnly={!canEdit}
                wideWidth
              />
            </>
          )}
          <EditField
            name="propInfo.isUtilitiesIncluded"
            type="boolean"
            label="Utitilies included"
            readOnly={!canEdit}
            wideWidth
          />
        </SectionForm>

        <SectionActions>
          <Button type="submit" disabled={!canEdit || invalid || submitting}>
            Save changes
          </Button>
        </SectionActions>
      </Section>
    );
  }
}

