import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';
import NumberFormat from 'react-number-format';

import { palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import { STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { Heading } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const PaddedHeading = pad(Heading, 'xLarge');

const Description = pad(styled.p`
  color: ${palette('slate', 'filler')};
`, 'xLarge');

const MoneyValue = pad(Heading, 'large');

const StyledReduxField = styled(ReduxField)`
  display: flex;
  align-items: baseline;
`;

const moneyValue = val =>
  <MoneyValue weight="regular" palette="secondary">Up to <NumberFormat value={val} displayType="text" thousandSeparator prefix="$" /></MoneyValue>;

const MonthlyBudget = () => (
  <Fragment>
    {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
    <PaddedHeading weight="regular">What is your monthly budget for rent and care?</PaddedHeading>
    <Description> Monthly budget is an important criteria for narrowing down your search. Slide bar below.</Description>
    <Description>Note: The average monthly budget in US is roughly $3,750</Description>
    <Field
      name={STEP_INPUT_FIELD_NAMES.MonthlyBudget[0]}
      type="slider"
      component={ReduxField}
      responsive
      min={2000}
      max={10000}
      step={1}
      valuePosition="top"
      valueWidth="regular"
      valueParse={moneyValue}
    />
    <Field
      name={STEP_INPUT_FIELD_NAMES.MonthlyBudget[1]}
      label="I'm only using Medicaid to pay."
      type="checkbox"
      responsive
      component={StyledReduxField}
    />
  </Fragment>
);

export default MonthlyBudget;
