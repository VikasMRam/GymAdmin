import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';
import { Field as RFField } from 'redux-form';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import communityPropType from 'sly/web/propTypes/community';

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

export default class DashboardCommunityContactsForm extends Component {
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


    const Field = ({ ...props }) => <RFField component={ReduxField} readOnly={!canEdit} wideWidth {...props} />;
    const contractInfo = currentValues?.rgsInfo?.contract_info || {};
    const valueLabel = contractInfo.contractType === 'Percentage'
      ? 'Value between 0.0 - 1.0'
      : 'Value in dollars';

    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <Field
            name="rgsInfo.contract_info.hasContract"
            label="Has contract"
            type="boolean"
          />
          {contractInfo?.hasContract && (
            <>
              <Field
                label="Type of contract"
                name="rgsInfo.contract_info.contractType"
                type="choice"
                options={[
                  { value: 'Flat Rate', label: 'Flat rate' },
                  { value: 'Percentage', label: 'Percentage' },
                ]}
              />
              <Field
                label={valueLabel}
                name="rgsInfo.contract_info.value"
                type="number"
                inputmode="numeric"
              />
              <Field
                label="Notes"
                name="rgsInfo.contract_info.notes"
                type="textarea"
              />
            </>
          )}
        </FormScrollSection>

        {canEdit && (
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        )}
      </Form>
    );
  }
}

