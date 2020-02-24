import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size, palette, columnWidth } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { Block, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';


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

const assistedLivingCareServices = [
  'Activities of Daily Living Assistance',
  'Assistance with Transfers',
  'Special Dietary Restrictions',
];

const memoryCareCareServices = [
  'Dementia Waiver',
  'Specialized Memory Care Programming',
];

const otherCareServices = [
  'Hospice Waiver',
];

const nonCareRelatedServices = [
  'Concierge Services',
  'Move-In Coordination',
  'Housekeeping & Linen Services',
  'Scheduled Transportation (non-medical related)',
  'Fitness Programs',
  'Continuing Learning Programs',
  'Resident-Run Activities',
  'Community-Sponsored Activities',
  'Family Education and Support Services',
  'Planned Day Trips',
  'Community Operated Transportation',
];

const assistedLivingCareServicesOptions = assistedLivingCareServices.map(i => ({ value: i, label: i }));
const memoryCareCareServicesOptions = memoryCareCareServices.map(i => ({ value: i, label: i }));
const otherCareServicesOptions = otherCareServices.map(i => ({ value: i, label: i }));

export default class DashboardCommunityassistedLivingCareServicesForm extends Component {
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
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            <Field
              name="propInfo.careServices"
              label="Assisted Living"
              type="checkbox"
              component={ReduxField}
              options={assistedLivingCareServicesOptions}
              wideWidth
            />
            <Field
              name="propInfo.careServices"
              label="Memory Care"
              type="checkbox"
              component={ReduxField}
              options={memoryCareCareServicesOptions}
              wideWidth
            />
            <Field
              name="propInfo.careServices"
              label="Other"
              type="checkbox"
              component={ReduxField}
              options={otherCareServicesOptions}
              wideWidth
            />
          </FormSection>
        </FormScrollSection>
        {canEdit &&
          <FormBottomSection>
            <StyledButton type="submit" disabled={invalid || submitting}>
              Save changes
            </StyledButton>
          </FormBottomSection>
        }
      </Form>
    );
  }
}

