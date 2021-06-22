import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';

import { apiUrl } from 'sly/web/config';
import { Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import { statuses } from 'sly/web/constants/communities';
import { PROVIDER_ROLE_PARAM } from 'sly/common/constants/roles';

import {
  Section,
  SectionActions,
  SectionForm,
  SectionHeader,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';

const statusOptions = statuses.map(s => <option key={s.label} value={s.value}>{s.label}</option>);
const tagColumn = { typeInfo: { api: `${apiUrl}/platform/tags?filter[category]=Affinity,Activeness,Acuity&filter[name]=` }, value: 'tag.name' };

export default class DashboardCommunityAdminForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    initialValues: object,
    onSelectChange: func,
    currentValues: object,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, currentValues,
    } = this.props;

    const contractInfo = currentValues?.rgsAux?.rgsInfo?.contract_info || {};
    const valueLabel = contractInfo.contractType === 'Percentage'
      ? 'Value between 0.0 - 1.0'
      : 'Value in dollars';

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
          />
          <EditField
            name="slyScore"
            label="Sly Score"
            type="number"
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
        </SectionForm>
        <SectionForm heading="Community information">
          <EditField
            name="propInfo.promoTitle"
            label="Promotions Title"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.promoDescription"
            label="Promotions Description"
            type="textarea"
            readOnly={!canEdit}
          />
        </SectionForm>
        <SectionForm heading="Notes">
          <EditField
            name="propInfo.adminNotes"
            label="Admin Notes"
            type="textarea"
            readOnly={!canEdit}
          />
        </SectionForm>
        <SectionForm heading="SEO">
          <EditField
            name="propInfo.websiteTitle"
            label="Website Title Tag"
            type="text"
            readOnly={!canEdit}
          />
          <EditField
            name="propInfo.websiteMetaDescription"
            label="Website Meta Description"
            type="text"
            readOnly={!canEdit}
          />
        </SectionForm>
        <SectionForm heading="Contract">
          <EditField
            name="rgsAux.rgsInfo.contract_info.hasContract"
            label="Has contract"
            type="boolean"
            readOnly={!canEdit}
          />
          {contractInfo?.hasContract && (
            <>
              <EditField
                label="Type of contract"
                name="rgsAux.rgsInfo.contract_info.contractType"
                type="choice"
                options={[
                  { value: 'Flat Rate', label: 'Flat rate' },
                  { value: 'Percentage', label: 'Percentage' },
                ]}
                readOnly={!canEdit}
              />
              <EditField
                label={valueLabel}
                name="rgsAux.rgsInfo.contract_info.value"
                type="number"
                inputmode="numeric"
                readOnly={!canEdit}
                parse={value => !value ? null : Number(value)}
              />
              <EditField
                label="Contract Url"
                name="rgsAux.rgsInfo.contract_info.url"
                type="text"
              />
              <EditField
                label="Contract Notes"
                name="rgsAux.rgsInfo.contract_info.notes"
                type="textarea"
                readOnly={!canEdit}
              />
              <EditField
                label="Contract Status"
                name="rgsAux.rgsInfo.contract_info.contractStatus"
                type="select"
                readOnly={!canEdit}Only={!canEdit}
              >
                <option value="" disabled>Select an option</option>
                <option value="No contract">No contract</option>
                <option value="Pending">Pending</option>
                <option value="Signed">Signed</option>
              </EditField>
            </>
          )}
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

