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

const careServices = [
  'Activities of Daily Living Assistance',
  'Assistance with Bathing',
  'Assistance with Dressing',
  'Meal Preparation and Service',
  'Coordination with Health Care Providers',
  'Medication Management',
  'Transportation to Doctors Appointments',
  'Transportation Arrangement',
  '24-Hour Call System',
  '24-Hour Supervision',
  'Mental Wellness Program',
  'Rehabilitation Program',
  'Physical Therapy',
  'Respite Program',
  'Preventative Health Screenings',
  'Diabetes Diet',
  'Diabetes Care',
  'Parkinsons Care',
  'Special Dietary Restrictions',
  'Mild Cognitive Impairment',
  'Hospice Waiver',
  'Dementia Waiver',
  '24-Hour Nursing',
  '12-16 Hour Nursing',
  'Administer Insulin Injections',
  'Care with Behavioral Issues',
  'Accept Incoming Residents on Hospice',
  'Same Day Assessments',
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

const careServicesOptions = careServices.map(i => ({ value: i, label: i }));
const nonCareRelatedServicesOptions = nonCareRelatedServices.map(i => ({ value: i, label: i }));

export default class DashboardCommunityCareServicesForm extends Component {
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
              label="Care Services Provided"
              type="checkbox"
              component={ReduxField}
              options={careServicesOptions}
              wideWidth
            />
            <Field
              name="propInfo.nonCareServices"
              label="Non-Care Related Services Provided"
              type="checkbox"
              component={ReduxField}
              options={nonCareRelatedServicesOptions}
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

