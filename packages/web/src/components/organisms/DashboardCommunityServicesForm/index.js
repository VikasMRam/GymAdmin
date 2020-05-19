import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Button } from 'sly/web/components/atoms';
import communityPropType from 'sly/web/propTypes/community';
import EditField from 'sly/web/components/form/EditField';

const nonCareServicesOptions = [
  { value: 'Community Operated Transportation', label: 'Community operated transportation' },
  { value: 'Scheduled Daily Activities', label: 'Scheduled daily activities' },
];

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

const FormScrollSection = styled.div`
  // max-height: calc(100vh - 240px);
`;

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

export default class DashboardCommunityServicesForm extends Component {
  static propTypes = {
    community: communityPropType,
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
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
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
        </FormScrollSection>

        <FormBottomSection>
          <StyledButton type="submit" disabled={!canEdit || invalid || submitting}>
            Save changes
          </StyledButton>
        </FormBottomSection>
      </Form>
    );
  }
}

