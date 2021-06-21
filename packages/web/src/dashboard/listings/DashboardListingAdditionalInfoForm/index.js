import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import EditField from 'sly/web/components/form/EditField';
import { numberOfBedRooms, numberOfBathRooms, statuses } from 'sly/web/constants/listings';
import { states, countries } from 'sly/web/constants/geo';
import {
  SectionForm,
  Section,
  SectionActions,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { apiUrl } from 'sly/web/config';

const getOptions = options => options.map(s => <option key={s} value={s}>{s}</option>);

// const getStatesOptions = country => states[country].map(e => <option key={e.abbe} value={e.abbr}>{e.name}</option>);
// const getAvailableTags = country => AVAILABLE_TAGS[country];
// const countryOptions = countries.map(s => <option key={s} value={s}>{s}</option>);
// const sizeOfCommunityOptions = sizeOfCommunity.map(s => <option key={s} value={s}>{s}</option>);
// const numberOfBedRoomsOptions = numberOfBedRooms.map(s => <option key={s} value={s}>{s}</option>);

const statusOptions = statuses.map(s => <option key={s.label} value={s.value}>{s.label}</option>);
const communityColumn = { typeInfo: { api: `${apiUrl}/marketplace/search/community?filter[is-plus]=true:true&filter[name]=` }, value: 'community.id' };
// const communityColumn = { typeInfo: { api: `${apiUrl}/marketplace/search/community?filter[name]=` }, value: 'community.id' };

const activitiesOptions = [
  { value: 'Art classes', label: 'Art classes' },
  { value: 'Music classes', label: 'Music classes' },
  { value: 'Field trips', label: 'Field trips' },
  { value: 'Book clubs', label: 'Book clubs' },
  { value: 'Virtual entertainment', label: 'Virtual entertainment' },
  { value: 'Yoga and Tai Chi', label: 'Yoga and Tai Chi' },
  { value: 'Gardening', label: 'Gardening' },
  { value: 'Spritual practice', label: 'Spritual practice' },
];

export default class DashboardListingAdditionalInfoForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    respiteAllowed: object,
    handleSubmit: func.isRequired,
  };

  render() {
    console.log(communityColumn.value);
    const {
      handleSubmit, invalid, submitting, canEdit,
    } = this.props;

    return (
      <Section
        as="form"
        onSubmit={handleSubmit}
      >
        <SectionHeader>
          Details
        </SectionHeader>

        <SectionForm heading="Additional listing information">
          <EditField
            name="info.activities"
            label="Activities"
            type="checkbox"
            options={activitiesOptions}
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="info.diningSection.content"
            label="Dining"
            type="richtextarea"
            placeholder=""
            wideWidth
            widthSpacing="tabletLayout.col5"
          />
          <EditField
            name="info.neighborhoodSection.content"
            label="Neighborhood"
            type="richtextarea"
            placeholder=""
            wideWidth
            widthSpacing="tabletLayout.col5"
          />
        </SectionForm>


        <SectionForm heading="Community details">
          <EditField
            name="community"
            label="Community Slug"
            type="autocomplete"
            readOnly={!canEdit}
            column={communityColumn}
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

