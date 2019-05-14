import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { BUYING_OR_RENTING_OPTIONS } from 'sly/external/constants/options';
import { STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const PaddedHeading = pad(Heading, 'xLarge');

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.regular')};
  }
`;

const BuyingOrRenting = () => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <PaddedHeading weight="regular">Are you interested in renting or buying into a retirement community?</PaddedHeading>
    <StyledField
      options={BUYING_OR_RENTING_OPTIONS}
      name={STEP_INPUT_FIELD_NAMES.BuyingOrRenting[0]}
      type="boxChoice"
      component={ReduxField}
    />
  </Fragment>
);

export default BuyingOrRenting;
