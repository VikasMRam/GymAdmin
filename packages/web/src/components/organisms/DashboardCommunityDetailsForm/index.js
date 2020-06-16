import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';

import { Button } from 'sly/web/components/atoms';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import EditField from 'sly/web/components/form/EditField';
import { states, sizeOfCommunity } from 'sly/web/constants/communities';
import {
  SectionForm,
  Section,
  SectionActions,
  SectionHeader,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';

const statesOptions = states.map(s => <option key={s} value={s}>{s}</option>);
const sizeOfCommunityOptions = sizeOfCommunity.map(s => <option key={s} value={s}>{s}</option>);

export default class DashboardCommunityDetailsForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    respiteAllowed: object,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, respiteAllowed,
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
            wideWidth
          />
          <EditField
            name="propInfo.communityPhone"
            label="Front desk phone number"
            type="phone"
            readOnly={!canEdit}
            placeholder="(925) 555-5555"
            parens
            wideWidth
          />
          <EditField
            name="propInfo.ownerName"
            label="Owner name"
            type="text"
            readOnly={!canEdit}
            placeholder="John Doe"
            wideWidth
          />
          <EditField
            name="propInfo.ownerEmail"
            label="Owner email"
            type="email"
            readOnly={!canEdit}
            placeholder="john@community.com"
            wideWidth
          />
          <EditField
            name="propInfo.websiteUrl"
            label="Website URL"
            type="text"
            readOnly={!canEdit}
            placeholder="https://www.seniorly.com"
            wideWidth
          />
          <EditField
            name="propInfo.parentCompany"
            label="Name of Parent Company"
            type="text"
            readOnly={!canEdit}
            placeholder="Name of Parent Company(if applicable)"
            wideWidth
          />
          <EditField
            name="propInfo.typeCare"
            label="Care type"
            type="choice"
            readOnly={!canEdit}
            isMulti
            options={AVAILABLE_TAGS.map(value => ({ label: value, value }))}
            wideWidth
          />
        </SectionForm>
        <SectionForm heading="Respite care">
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
              wideWidth
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
            wideWidth
          />
          <EditField
            name="propInfo.communitySize"
            label="Community Size"
            type="select"
            wideWidth
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {sizeOfCommunityOptions}
          </EditField>
          <EditField
            name="propInfo.capacity"
            label="Licensed Capacity"
            type="number"
            readOnly={!canEdit}
            wideWidth
          />
        </SectionForm>
        <SectionForm heading="Location">
          <EditField
            name="address.line1"
            label="Line 1"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="address.line2"
            label="Line 2"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="address.city"
            label="City"
            type="text"
            readOnly={!canEdit}
            wideWidth
          />
          <EditField
            name="address.state"
            label="State"
            type="select"
            wideWidth
            readOnly={!canEdit}
          >
            <option>Select an option</option>
            {statesOptions}
          </EditField>
          <EditField
            name="address.zip"
            label="Zipcode"
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

