import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import EditField from 'sly/web/components/form/EditField';
import { sizeOfCommunity } from 'sly/web/constants/communities';
import { states, countries } from 'sly/web/constants/geo'
import {
  SectionForm,
  Section,
  SectionActions,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';

const getStatesOptions = ( country ) => states[country].map(e => <option key={e.abbe} value={e.abbr}>{e.name}</option>);
const getAvailableTags = ( country ) => AVAILABLE_TAGS[country];
const countryOptions = countries.map(s => <option key={s} value={s}>{s}</option>);
const sizeOfCommunityOptions = sizeOfCommunity.map(s => <option key={s} value={s}>{s}</option>);

export default class DashboardCommunityDetailsForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    respiteAllowed: object,
    handleSubmit: func.isRequired,
    onCountryChange: func,
    selectedCountry: string,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, respiteAllowed, selectedCountry, onCountryChange
    } = this.props;

    return (
      <Section
        as="form"
        onSubmit={handleSubmit}
      >
        <SectionHeader>
          Details
        </SectionHeader>

        <SectionForm heading="Community details">
          <EditField
            name="name"
            label="Community name"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communityPhone"
            label="Front desk phone"
            type="phone"
            readOnly={!canEdit}
            placeholder="(925) 555-5555"
            parens
          />
          <EditField
            name="propInfo.ownerName"
            label="Owner name"
            type="text"
            readOnly={!canEdit}
            placeholder="John Doe"
          />
          <EditField
            name="propInfo.ownerEmail"
            label="Owner email"
            type="email"
            readOnly={!canEdit}
            placeholder="john@community.com"
          />
          <EditField
            name="propInfo.websiteUrl"
            label="Website URL"
            type="text"
            readOnly={!canEdit}
            placeholder="https://www.seniorly.com"
          />
          <EditField
            name="propInfo.parentCompany"
            label="Name of parent company"
            type="text"
            readOnly={!canEdit}
            placeholder="Name of parent company(if applicable)"
          />
        </SectionForm>
        <SectionForm heading="Location">
          <EditField
            name="address.line1"
            label="Line 1"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="address.line2"
            label="Line 2"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="address.city"
            label="City"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="address.country"
            label="Country"
            type="select"
            onChange={onCountryChange}
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {countryOptions}
          </EditField>
          <EditField
            name="address.state"
            label="State"
            type="select"
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {getStatesOptions(selectedCountry)}
          </EditField>
          <EditField
            name="address.zip"
            label="Zipcode"
            type="text"
            readOnly={!canEdit}
          />
        </SectionForm>
        <SectionForm heading="Type of community">
          <EditField
            name="propInfo.typeCare"
            label="Care type"
            type="choice"
            readOnly={!canEdit}
            isMulti
            options={getAvailableTags(selectedCountry).map(value => ({ label: value, value }))}
          />
          <EditField
            name="propInfo.respiteAllowed.checked"
            type="boolean"
            readOnly={!canEdit}
            options={[{ value: true, label: 'Respite care allowed' }]}
          />
          {respiteAllowed?.checked &&
            <EditField
              name="propInfo.respiteAllowed.minlength"
              label="Minimum stay length"
              type="number"
              readOnly={!canEdit}
              parse={value => !value ? null : Number(value)}
            />
          }
        </SectionForm>
        <SectionForm heading="License number">
          <EditField
            name="propInfo.licenseNumber"
            label="License number"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communitySize"
            label="Community size"
            type="select"
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {sizeOfCommunityOptions}
          </EditField>
          <EditField
            name="propInfo.capacity"
            label="Licensed capacity"
            type="text"
            readOnly={!canEdit}
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

