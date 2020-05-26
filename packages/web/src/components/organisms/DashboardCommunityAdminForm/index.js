import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
import { Block, Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import { statuses } from 'sly/web/constants/communities';


const statusOptions = statuses.map(s => <option key={s.label} value={s.value}>{s.label}</option>);
const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Warning = pad(styled(Block)`
  background-color: ${palette('warning.filler')};
  border-radius: ${size('border.xxLarge')};
  text-align: center;
  padding: ${size('spacing.large')};
`, 'xLarge');
Warning.displayName = 'Warning';

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

export default class DashboardCommunityAdminForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            <FormSectionHeading weight="medium">Meta Data</FormSectionHeading>
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
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Community Information</FormSectionHeading>
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
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">Notes</FormSectionHeading>
            <EditField
              name="propInfo.adminNotes"
              label="Admin Notes"
              type="textarea"
              readOnly={!canEdit}
              wideWidth
            />
          </FormSection>
          <FormSection>
            <FormSectionHeading weight="medium">SEO</FormSectionHeading>
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
          </FormSection>
        </FormScrollSection>
        <FormBottomSection>
          <StyledButton type="submit" disabled={!canEdit || invalid || submitting}>
            Save changes
          </StyledButton>
        </FormBottomSection>
      </form>
    );
  }
}

