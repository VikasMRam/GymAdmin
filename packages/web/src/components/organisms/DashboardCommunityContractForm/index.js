import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Button } from 'sly/web/components/atoms';
import communityPropType from 'sly/web/propTypes/community';
import EditField from 'sly/web/components/form/EditField';

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

export default class DashboardCommunityContractForm extends Component {
  static propTypes = {
    currentValues: object,
    community: communityPropType,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
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
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
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
                label="Notes"
                name="rgsAux.rgsInfo.contract_info.notes"
                type="textarea"
                readOnly={!canEdit}
              />
            </>
          )}
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

