import React, { Component } from 'react';
import { func, bool, string, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Button } from 'sly/web/components/atoms';
import EditField from 'sly/web/components/form/EditField';
import { textAlign } from 'sly/web/components/helpers/text';


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

const assistedLivingCareServicesOptions = assistedLivingCareServices.map(i => ({ value: i, label: i }));
const memoryCareCareServicesOptions = memoryCareCareServices.map(i => ({ value: i, label: i }));
const otherCareServicesOptions = otherCareServices.map(i => ({ value: i, label: i }));

export default class DashboardCommunityCareServicesForm extends Component {
  static propTypes = {
    invalid: bool,
    canEdit: bool,
    submitting: bool,
    handleSubmit: func.isRequired,
    typeCare: arrayOf(string),
  };

  render() {
    const {
      handleSubmit, invalid, submitting, canEdit, typeCare,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <FormScrollSection>
          <FormSection>
            {typeCare.indexOf('Assisted Living') !== -1 &&
              <EditField
                name="propInfo.careServices"
                label="Assisted Living"
                type="checkbox"
                options={assistedLivingCareServicesOptions}
                wideWidth
              />
            }
            {typeCare.indexOf('Memory Care') !== -1 &&
              <EditField
                name="propInfo.careServices"
                label="Memory Care"
                type="checkbox"
                options={memoryCareCareServicesOptions}
                wideWidth
              />
            }
            <EditField
              name="propInfo.careServices"
              label="Other"
              type="checkbox"
              options={otherCareServicesOptions}
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

