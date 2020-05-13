import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size, palette } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { CARE_NEEDS_OPTIONS } from 'sly/web/external/constants/options';
import { STEP_INPUT_FIELD_NAMES } from 'sly/web/external/constants/steps';
import { Heading } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedHeading = pad(Heading, 'xLarge');
PaddedHeading.displayName = 'PaddedHeading';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.regular')};
  }
`;

const Description = pad(styled.p`
  color: ${palette('slate', 'filler')};
`, 'xLarge');
Description.displayName = 'Description';

const CareNeeds = () => (
  <>
    <PaddedHeading weight="regular">Do you have any care needs?</PaddedHeading>
    <Description>Select all that apply</Description>
    <StyledField
      multiChoice
      options={CARE_NEEDS_OPTIONS}
      name={STEP_INPUT_FIELD_NAMES.CareNeeds[0]}
      type="boxChoice"
      align="left"
      component={ReduxField}
    />
  </>
);

export default CareNeeds;
