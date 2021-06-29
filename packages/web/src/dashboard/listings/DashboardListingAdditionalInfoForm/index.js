import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/dashboard/listings/components/EditField';
import {
  SectionForm,
  Section,
  SectionActions,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import { apiUrl } from 'sly/web/config';

const communityColumn = { typeInfo: { api: `${apiUrl}/marketplace/search/community?filter[is-plus]=true:true&filter[name]=` }, value: 'community.id' };

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

const DashboardListingAdditionalInfoForm = ({ handleSubmit, invalid, submitting, canEdit }) => {
  return (
    <Section
      as="form"
      onSubmit={handleSubmit}
    >
      <SectionHeader>
        Details
      </SectionHeader>

      <SectionForm heading="Activities Section">
        <EditField
          name="info.activities"
          label="Activities"
          type="checkbox"
          options={activitiesOptions}
          readOnly={!canEdit}
          wideWidth
        />
        <EditField
          name="info.activityCalendarURL"
          label="Activities calendar URL"
          type="text"
          readOnly={!canEdit}
        />
      </SectionForm>
      <SectionForm heading="Dining Section">
        <EditField
          name="info.sections[0].content"
          label="Dining"
          type="richtextarea"
          placeholder=""
          wideWidth
          widthSpacing="tabletLayout.col5"
        />
        <EditField
          name="info.sections[0].url"
          label="Sample menu URL"
          type="text"
          readOnly={!canEdit}
        />
      </SectionForm>
      <SectionForm heading="Neighborhood Section">
        <EditField
          name="info.sections[1].content"
          label="Neighborhood"
          type="richtextarea"
          placeholder=""
          wideWidth
          widthSpacing="tabletLayout.col5"
        />
      </SectionForm>


      <SectionForm heading="Community details">
        <EditField
          name="info.sections[2].content"
          label="Community details"
          type="richtextarea"
          placeholder=""
          wideWidth
          widthSpacing="tabletLayout.col5"
        />
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
};

DashboardListingAdditionalInfoForm.propTypes = {
  invalid: bool,
  canEdit: bool,
  handleSubmit: func.isRequired,
};

export default DashboardListingAdditionalInfoForm;
