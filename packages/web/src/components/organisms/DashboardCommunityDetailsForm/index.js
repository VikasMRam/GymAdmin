import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
import { Block, Button } from 'sly/web/components/atoms';
import { AVAILABLE_TAGS } from 'sly/web/constants/tags';
import EditField from 'sly/web/components/form/EditField';
import { states } from 'sly/web/constants/communities';

const statesOptions = states.map(s => <option key={s} value={s}>{s}</option>);

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

const IntroInfo = textAlign(styled(Block)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('tabletLayout.gutter')};
    flex: 0 0 ${columnWidth(3, size('layout.gutter'))};
  }
`, 'left');
IntroInfo.displayName = 'IntroInfo';

const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

const FormSectionHeading = pad(Block, 'large');
// const contactPreferenceOptionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

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
      <form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            <FormSectionHeading weight="medium">Metadata</FormSectionHeading>
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
              name="propInfo.typeCare"
              label="Care type"
              type="choice"
              readOnly={!canEdit}
              isMulti
              options={AVAILABLE_TAGS.map(value => ({ label: value, value }))}
              wideWidth
            />
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Respite care</FormSectionHeading>
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
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">License Number</FormSectionHeading>
            <EditField
              name="propInfo.licenseNumber"
              label="License number"
              type="text"
              readOnly={!canEdit}
              wideWidth
            />
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Address</FormSectionHeading>
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
          </FormSection>
        </FormScrollSection>
        <FormBottomSection>
          <Button type="submit" disabled={!canEdit || invalid || submitting}>
            Save changes
          </Button>
        </FormBottomSection>
      </form>
    );
  }
}

