import React, { Component } from 'react';
import { func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Button } from 'sly/web/components/atoms';
import FormSection from 'sly/web/components/molecules/FormSection';
import EditField from 'sly/web/components/form/EditField';
import { textAlign } from 'sly/web/components/helpers/text';

const trueFalseOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const StyledButton = pad(Button, 'regular');
StyledButton.displayName = 'StyledButton';

const Form = styled.form``;
Form.displayName = 'Form';

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

const FormBottomSection = styled.div`
  margin-top: ${size('spacing.xLarge')};
`;

export default class DashboardCommunityPricingForm extends Component {
  static propTypes = {
    currentValues: object,
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, currentValues,
    } = this.props;


    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection heading="Base Costs">
            <EditField
              name="propInfo.sharedSuiteRate"
              label="Shared suite"
              type="text"
              readOnly={!canEdit}
              placeholder="2,000"
              wideWidth
            />
            <EditField
              name="propInfo.privateSuiteRate"
              label="Private suite"
              type="text"
              readOnly={!canEdit}
              placeholder="3,000"
              wideWidth
            />
            <EditField
              name="propInfo.studioApartmentRate"
              label="Studio apartment"
              type="text"
              readOnly={!canEdit}
              placeholder="5,000"
              wideWidth
            />
            <EditField
              name="propInfo.oneBedroomApartmentRate"
              label="One bedroom apartment"
              type="text"
              readOnly={!canEdit}
              placeholder=""
              wideWidth
            />
            <EditField
              name="propInfo.twoBedroomApartmentRate"
              label="Two bedroom apartment"
              type="text"
              readOnly={!canEdit}
              placeholder=""
              wideWidth
            />
          </FormSection>

          <FormSection heading="Additional Care Costs">
            <EditField
              name="propInfo.isCareCostIncluded"
              type="boolean"
              label="Care costs included"
              readOnly={!canEdit}
              wideWidth
            />
            {!currentValues?.propInfo?.isCareCostIncluded && (
              <>
                <EditField
                  name="propInfo.alCareRate"
                  label="Assisted living"
                  type="text"
                  options={trueFalseOptions}
                  readOnly={!canEdit}
                  wideWidth
                />
                <EditField
                  name="propInfo.mcCareRate"
                  label="Memory care"
                  type="text"
                  options={trueFalseOptions}
                  readOnly={!canEdit}
                  wideWidth
                />
              </>
            )}
            <EditField
              name="propInfo.isUtilitiesIncluded"
              type="boolean"
              label="Utitilies included"
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
      </Form>
    );
  }
}

