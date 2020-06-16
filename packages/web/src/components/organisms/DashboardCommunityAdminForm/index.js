import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import Field from 'sly/web/components/molecules/Field';
import { statuses } from 'sly/web/constants/communities';
import { PROVIDER_ROLE_PARAM } from 'sly/web/constants/roles'

import {
  Section,
  SectionActions,
  SectionForm,
  SectionHeader,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';

const statusOptions = statuses.map(s => <option key={s.label} value={s.value}>{s.label}</option>);

export default class DashboardCommunityAdminForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    initialValues: object,
    onSelectChange: func,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, currentValues, propUser,
    } = this.props;

    return (
      <Section
        as="form"
        onSubmit={handleSubmit}
      >
        <SectionHeader>
          Admin
        </SectionHeader>

        <SectionForm heading="Metadata">
          <EditField
            name="user"
            label="Primary User"
            type="user"
            role={PROVIDER_ROLE_PARAM}
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="slyScore"
            label="Sly Score"
            type="number"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="status"
            label="Status"
            type="select"
            wideWidth
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {statusOptions}
          </EditField>
        </SectionForm>
        <SectionForm heading="Community information">
          <EditField
            name="propInfo.covidInfoTitle"
            label="Covid Title"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="propInfo.covidInfoDescription"
            label="Covid Description"
            type="textarea"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="propInfo.promoTitle"
            label="Promotions Title"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="propInfo.promoDescription"
            label="Promotions Description"
            type="textarea"
            readOnly={!canEdit}
            wideWidth
          />
        </SectionForm>
        <SectionForm heading="Notes">
          <EditField
            name="propInfo.adminNotes"
            label="Admin Notes"
            type="textarea"
            readOnly={!canEdit}
            wideWidth
          />
        </SectionForm>
        <SectionForm heading="SEO">
          <EditField
            name="propInfo.websiteTitle"
            label="Website Title Tag"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="propInfo.websiteMetaDescription"
            label="Website Meta Desctiption"
            type="text"
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

