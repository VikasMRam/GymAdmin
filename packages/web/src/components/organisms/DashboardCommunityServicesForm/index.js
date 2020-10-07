import React, { Component } from 'react';
import { func, bool, string, arrayOf } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import {
  Section,
  SectionActions,
  SectionForm,
  SectionHeader,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import communityPropType from 'sly/common/propTypes/community';

const nonCareServicesOptions = [
  { value: 'Housekeeping and linen services', label: 'Housekeeping and linen services' },
  { value: 'Transportation arrangement (non-medical)', label: 'Transportation arrangement (non-medical)' },
  { value: 'Community Operated Transportation', label: 'Community operated transportation' },
  { value: 'Fitness programs', label: 'Fitness programs' },
  { value: 'Concierge services', label: 'Concierge services' },
  { value: 'Scheduled Daily Activities', label: 'Scheduled daily activities' },
  { value: 'Community-sponsored activities', label: 'Community-sponsored activities' },
  { value: 'Resident-run activities', label: 'Resident-run activities' },
  { value: 'Planned day trips', label: 'Planned day trips' },
  { value: 'Transportation arrangement (non-medical)', label: 'Transportation arrangement (non-medical)' },
  { value: 'Move-in coordination', label: 'Move-in coordination' },
  { value: 'Continuing learning programs', label: 'Continuing learning programs' },
  { value: 'Family education and support services', label: 'Family education and support services' },
];

const familyOvernightOptions = [
  { value: 'Family Overnight Stay Rooms', label: 'Family overnight stay rooms' },
];

const amenitiesOptions = [
  { value: 'Cable', label: 'Cable' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Telephone', label: 'Telephone' },
  { value: 'Air-conditioning', label: 'Air-conditioning' },
  { value: 'Kitchenettes', label: 'Kitchenettes' },
];
const communitySpaceOptions = [
  { value: 'Pet Friendly', label: 'Pet Friendly' },
  { value: 'Small Library', label: 'Library' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Outdoor patio', label: 'Outdoor patio' },
  { value: 'Dining room', label: 'Dining room' },
  { value: 'Restaurant-style dining', label: 'Restaurant-style dining' },
  { value: 'Located close to shopping centers', label: 'Located close to shopping centers' },
];

const assistedLivingCareServices = [
  'Medication management',
  'Meal preparation and service',
  'Transportation arrangement',
  '24-hour supervision',
  '24-hour call system',
  'Coordination with health care providers',
  'Activities of Daily Living Assistance',
  'Assistance with Transfers',
  'Special Dietary Restrictions',
];

const memoryCareCareServices = [
  'Dementia Waiver',
  'Specialized Memory Care Programming',
];

const otherCareServices = [
  'Hospice Waiver',
];

const assistedLivingCareServicesOptions = assistedLivingCareServices.map(i => ({ value: i, label: i }));
const memoryCareCareServicesOptions = memoryCareCareServices.map(i => ({ value: i, label: i }));
const otherCareServicesOptions = otherCareServices.map(i => ({ value: i, label: i }));

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
      handleSubmit, invalid, submitting, canEdit, typeCare, community,
    } = this.props;

    const isCommunityLarge = parseInt(community.propInfo.capacity || '0', 10) > 50;

    return (
      <Section as="form" onSubmit={handleSubmit}>
        <SectionHeader>
          Services and Amenities
        </SectionHeader>

        <SectionForm>
          {typeCare.indexOf('Assisted Living') !== -1 &&
            <EditField
              name="propInfo.careServices"
              label="Care Services"
              type="checkbox"
              options={assistedLivingCareServicesOptions}
              readOnly={!canEdit}
              wideWidth
            />
          }
          {typeCare.indexOf('Memory Care') !== -1 &&
            <EditField
              name="propInfo.careServices"
              label="Care Services"
              type="checkbox"
              options={memoryCareCareServicesOptions}
              readOnly={!canEdit}
              wideWidth
            />
          }
          <EditField
            name="propInfo.careServices"
            label="Care Services"
            type="checkbox"
            options={otherCareServicesOptions}
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
            label="Non-Care Services"
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

        <SectionForm heading="Amenities">
          <EditField
            name="propInfo.communityDescription"
            label="Community Description"
            type="textarea"
            placeholder="Enter an exciting description of your senior living community. I.e. Welcome to Manor Home. Our quaint home is located in the Cow Hollow"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.personalSpace"
            type="checkbox"
            label="Room Amenities"
            options={amenitiesOptions}
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communitySpace"
            type="checkbox"
            label="Community Amenities"
            options={communitySpaceOptions}
            readOnly={!canEdit}
          />
          {isCommunityLarge && (
            <EditField
              name="propInfo.communitySpace"
              type="checkbox"
              label="Community Amenities"
              options={familyOvernightOptions}
              readOnly={!canEdit}
            />
          )}
          <EditField
            name="propInfo.communitySpaceOther"
            label="Other Amenities"
            type="textarea"
            placeholder="More useful information about the community amenities"
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

