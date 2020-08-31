import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { LOOKING_FOR_OPTIONS } from 'sly/web/external/constants/options';
import { STEP_INPUT_FIELD_NAMES } from 'sly/web/external/constants/steps';
import { Heading } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedHeading = pad(Heading, 'xLarge');
PaddedHeading.displayName = 'PaddedHeading';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.regular')};
  }
`;

const LookingFor = () => (
  <>
    <PaddedHeading weight="regular">Who are you looking for?</PaddedHeading>
    <StyledField
      options={LOOKING_FOR_OPTIONS}
      name={STEP_INPUT_FIELD_NAMES.LookingFor[0]}
      type="boxChoice"
      align="left"
      component={ReduxField}
    />
  </>
);

export default LookingFor;
