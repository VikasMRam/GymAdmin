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
  { value: 'Community Operated Transportation', label: 'Community operated transportation' },
  { value: 'Scheduled Daily Activities', label: 'Scheduled daily activities' },
];

const familyOvernightOptions = [
  { value: 'Family Overnight Stay Rooms', label: 'Family overnight stay rooms' },
];

const communitySpaceOptions = [
  { value: 'Small Library', label: 'Library' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Pet Friendly', label: 'Pet Friendly' },
];

const assistedLivingCareServices = [
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
          Services
        </SectionHeader>

        <SectionForm heading="Community services">
          <EditField
            name="propInfo.nonCareServices"
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
          />
        </SectionForm>

        <SectionForm heading="Care services">
          {typeCare.indexOf('Assisted Living') !== -1 &&
            <EditField
              name="propInfo.careServices"
              label="Assisted Living"
              type="checkbox"
              options={assistedLivingCareServicesOptions}
              readOnly={!canEdit}
              wideWidth
            />
          }
          {typeCare.indexOf('Memory Care') !== -1 &&
            <EditField
              name="propInfo.careServices"
              label="Memory Care"
              type="checkbox"
              options={memoryCareCareServicesOptions}
              readOnly={!canEdit}
              wideWidth
            />
          }
          <EditField
            name="propInfo.careServices"
            label="Other"
            type="checkbox"
            options={otherCareServicesOptions}
            readOnly={!canEdit}
            wideWidth
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
          {isCommunityLarge && (
            <EditField
              name="propInfo.communitySpace"
              type="checkbox"
              options={familyOvernightOptions}
              readOnly={!canEdit}
            />
          )}
          <EditField
            name="propInfo.communitySpace"
            type="checkbox"
            options={communitySpaceOptions}
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.communitySpaceOther"
            label="Other"
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

