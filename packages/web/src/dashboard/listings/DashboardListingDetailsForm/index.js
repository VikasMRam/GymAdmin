import React from 'react';
import { func, bool, object, string } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/dashboard/listings/components/EditField';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import { statuses } from 'sly/web/constants/listings';
import { states, countries } from 'sly/web/constants/geo';
import {
  SectionForm,
  Section,
  SectionActions,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { apiUrl } from 'sly/web/config';

const getStatesOptions = country => states[country].map(e => <option key={e.abbe} value={e.abbr}>{e.name}</option>);
const getAvailableTags = country => AVAILABLE_TAGS[country];
const countryOptions = countries.map(s => <option key={s} value={s}>{s}</option>);

const statusOptions = statuses.map(s => <option key={s.label} value={s.value}>{s.label}</option>);
const tagColumn = { typeInfo: { api: `${apiUrl}/platform/tags?filter[category]=Affinity,Activeness,Acuity&filter[name]=` }, value: 'tag.name' };

const DashboardCommunityDetailsForm = ({ handleSubmit, invalid, submitting, canEdit, selectedCountry, onCountryChange }) => {
  return (
    <Section
      as="form"
      onSubmit={handleSubmit}
    >
      <SectionHeader>
        Details
      </SectionHeader>

      <SectionForm heading="Listing details">
        <EditField
          name="name"
          label="Listing title"
          type="text"
          readOnly={!canEdit}
        />
        <EditField
          name="info.startingRate"
          label="Starting rate"
          type="number"
          readOnly={!canEdit}
        />
        <EditField
          name="info.phoneNumber"
          label="Front desk phone"
          type="phone"
          readOnly={!canEdit}
          placeholder="(925) 555-5555"
          parens
        />
        <EditField
          name="info.description"
          label="Description"
          type="richtextarea"
          placeholder=""
          wideWidth
          widthSpacing="tabletLayout.col5"
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
      <SectionForm heading="Floor Plan">
        <EditField
          name="info.floorPlan.bedroomCount"
          label="Number of bedroom"
          type="number"
          max="4"
          readOnly={!canEdit}
        />
        <EditField
          name="info.floorPlan.bathroomCount"
          label="Number of bathroom"
          type="number"
          max="4"
          readOnly={!canEdit}
        />
        <EditField
          name="info.floorPlan.area"
          label="Area sq/ft"
          type="number"
          readOnly={!canEdit}
        />
      </SectionForm>
      <SectionForm heading="Admin">
        <EditField
          name="slyScore"
          label="Sly Score"
          type="number"
          max="100"
          readOnly={!canEdit}
        />
        <EditField
          name="status"
          label="Status"
          type="select"
          readOnly={!canEdit}
        >
          <option>Select an option</option>
          {statusOptions}
        </EditField>
        <EditField
          name="tags"
          label="Tags"
          type="autocomplete"
          readOnly={!canEdit}
          column={tagColumn}
          isMulti
        />
        <EditField
          name="info.care"
          label="Care type"
          type="choice"
          readOnly={!canEdit}
          isMulti
          options={getAvailableTags(selectedCountry).map(value => ({ label: value, value }))}
        />
      </SectionForm>
      <SectionActions>
        <Button type="submit" disabled={!canEdit || invalid || submitting}>
          Save changes
        </Button>
      </SectionActions>
    </Section>
  );
};

DashboardCommunityDetailsForm.propTypes = {
  invalid: bool,
  canEdit: bool,
  submitting: bool,
  handleSubmit: func.isRequired,
  onCountryChange: func,
  selectedCountry: string,
};

export default DashboardCommunityDetailsForm;