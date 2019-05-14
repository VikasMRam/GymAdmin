import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { CARE_NEEDS_OPTIONS } from 'sly/external/constants/options';
import { STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const PaddedHeading = pad(Heading, 'xLarge');

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.regular')};
  }
`;

const Description = pad(styled.p`
  color: ${palette('slate', 'filler')};
`, 'xLarge');

const CareNeeds = () => (
  <>
    <PaddedHeading weight="regular">Do you have any care needs?</PaddedHeading>
    <Description>Select all that apply</Description>
    <StyledField
      multiChoice
      options={CARE_NEEDS_OPTIONS}
      name={STEP_INPUT_FIELD_NAMES.CareNeeds[0]}
      type="boxChoice"
      component={ReduxField}
    />
  </>
);

export default CareNeeds;
