import React, { Component } from 'react';
import { func, bool, string, arrayOf } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import {
  Section,
  SectionActions,
  SectionForm,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import communityPropType from 'sly/common/propTypes/community';

const nonCareServicesOptions = [
  { value: 'Housekeeping and linen services', label: 'Housekeeping and linen services' },
  { value: 'Transportation arrangement (non-medical)', label: 'Transportation arrangement (non-medical)' },
  { value: 'Community operated transportation', label: 'Community operated transportation' },
  { value: 'Fitness programs', label: 'Fitness programs' },
  { value: 'Concierge services', label: 'Concierge services' },
  { value: 'Scheduled daily activities', label: 'Scheduled daily activities' },
  { value: 'Community-sponsored activities', label: 'Community-sponsored activities' },
  { value: 'Resident-run activities', label: 'Resident-run activities' },
  { value: 'Planned day trips', label: 'Planned day trips' },
  { value: 'Move-in coordination', label: 'Move-in coordination' },
  { value: 'Continuing learning programs', label: 'Continuing learning programs' },
  { value: 'Family education and support services', label: 'Family education and support services' },
];

const familyOvernightOptions = [
  { value: 'Family overnight stay rooms', label: 'Family overnight stay rooms' },
];

const amenitiesOptions = [
  { value: 'Cable', label: 'Cable' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Telephone', label: 'Telephone' },
  { value: 'Private bathrooms', label: 'Private bathrooms' },
  { value: 'Air-conditioning', label: 'Air-conditioning' },
  { value: 'Kitchenettes', label: 'Kitchenettes' },
  { value: 'Fully furnished', label: 'Fully furnished' },
];
const communitySpaceOptions = [
  { value: 'Dining room', label: 'Dining room' },
  { value: 'Restaurant-style dining', label: 'Restaurant-style dining' },
  { value: 'Family private dining rooms', label: 'Family private dining rooms' },
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Organic food and ingredients', label: 'Organic food and ingredients' },
  { value: 'On-site market', label: 'On-site market' },
  { value: 'Outdoor space', label: 'Outdoor space' },
  { value: 'Outdoor patio', label: 'Outdoor patio' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Small library', label: 'Small library' },
  { value: 'Gaming room', label: 'Gaming room' },
  { value: 'Computer center', label: 'Computer center' },
  { value: 'Fitness room', label: 'Fitness room' },
  { value: 'Swimming pool', label: 'Swimming pool' },
  { value: 'Spa', label: 'Spa' },
  { value: 'Beauty salon', label: 'Beauty salon' },
  { value: 'Wellness center', label: 'Wellness center' },
  { value: 'Religious/meditation center', label: 'Religious/meditation center' },
  { value: 'Located close to shopping centers', label: 'Located close to shopping centers' },
  { value: 'Located close to restaurants', label: 'Located close to restaurants' },
  { value: 'Pet friendly', label: 'Pet friendly' },
];

const careServicesOptions = [
  { value: 'Activities of daily living assistance', label: 'Activities of daily living assistance' },
  { value: 'Assistance with bathing', label: 'Assistance with bathing' },
  { value: 'Assistance with dressing', label: 'Assistance with dressing' },
  { value: 'Assistance with transfers', label: 'Assistance with transfers' },
  { value: 'Medication management', label: 'Medication management' },
  { value: 'Meal preparation and service', label: 'Meal preparation and service' },
  { value: 'Transportation arrangement (medical)', label: 'Transportation arrangement (medical)' },
  { value: 'Transportation arrangement', label: 'Transportation arrangement' },
  { value: 'Transportation to doctors appointments', label: 'Transportation to doctors appointments' },
  { value: 'Coordination with health care providers', label: 'Coordination with health care providers' },
  { value: '24-hour call system', label: '24-hour call system' },
  { value: '24-hour supervision', label: '24-hour supervision' },
  { value: 'Physical therapy', label: 'Physical therapy' },
  { value: 'Special dietary restrictions', label: 'Special dietary restrictions' },
  { value: 'Diabetes diet', label: 'Diabetes diet' },
  { value: 'Diabetes care', label: 'Diabetes care' },
  { value: 'Administer insulin injections', label: 'Administer insulin injections' },
  { value: '24-hour nursing', label: '24-hour nursing' },
  { value: '12-16 hour nursing', label: '12-16 hour nursing' },
  { value: "Parkinson's care", label: "Parkinson's care" },
  { value: 'Care with behavioral issues', label: 'Care with behavioral issues' },
  { value: 'Rehabilitation program', label: 'Rehabilitation program' },
  { value: 'Mental wellness program', label: 'Mental wellness program' },
  { value: 'Mild cognitive impairment', label: 'Mild cognitive impairment' },
  { value: 'Dementia waiver', label: 'Dementia waiver' },
  { value: 'Specialized memory care programming', label: 'Specialized memory care programming' },
  { value: 'Respite program', label: 'Respite program' },
  { value: 'Hospice waiver', label: 'Hospice waiver' },
  { value: 'Accept incoming residents on hospice', label: 'Accept incoming residents on hospice' },
  { value: 'Same day assessments', label: 'Same day assessments' },
  { value: 'Preventative health screenings', label: 'Preventative health screenings' },
];

export default class DashboardCommunityServicesForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    community: communityPropType.isRequired,
    handleSubmit: func.isRequired,
    typeCare: arrayOf(string),
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, community,
    } = this.props;

    const isCommunityLarge = parseInt(community.propInfo.capacity || '0', 10) > 50;

    return (
      <Section as="form" onSubmit={handleSubmit}>
        <SectionHeader>
          Services and Amenities
        </SectionHeader>

        <SectionForm>
          <EditField
            name="propInfo.careServices"
            label="Care services"
            type="checkbox"
            options={careServicesOptions}
            readOnly={!canEdit}
            wideWidth
          />

          <EditField
            name="propInfo.careServicesOther"
            label="Other"
            type="textarea"
            placeholder="More useful information about the care services"
            readOnly={!canEdit}
            wideWidth={false}
            leftMargin
          />
        </SectionForm>

        <SectionForm>
          <EditField
            name="propInfo.nonCareServices"
            label="Non-care services"
            type="checkbox"
            options={nonCareServicesOptions}
            readOnly={!canEdit}
          />

          <EditField
            name="propInfo.nonCareServicesOther"
            label="Other"
            type="textarea"
            placeholder="More useful information about the community services"
            readOnly={!canEdit}
            wideWidth={false}
            leftMargin
          />
        </SectionForm>

        <SectionForm>
          <EditField
            name="propInfo.communityDescription"
            label="Community description"
            type="textarea"
            placeholder="Enter an exciting description of your senior living community. I.e. Welcome to Manor Home. Our quaint home is located in the Cow Hollow"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.personalSpace"
            type="checkbox"
            label="Room amenities"
            options={amenitiesOptions}
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communitySpace"
            type="checkbox"
            label="Community amenities"
            options={isCommunityLarge ? [...communitySpaceOptions, ...familyOvernightOptions] : communitySpaceOptions}
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communitySpaceOther"
            label="Other room amenities"
            type="textarea"
            placeholder="More useful information about the room amenities"
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

