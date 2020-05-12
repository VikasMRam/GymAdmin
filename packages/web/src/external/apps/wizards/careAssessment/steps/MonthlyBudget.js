import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { palette } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { STEP_INPUT_FIELD_NAMES } from 'sly/web/external/constants/steps';
import { Heading } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { formatMoney } from 'sly/web/services/helpers/numbers';

const PaddedHeading = pad(Heading, 'xLarge');
PaddedHeading.displayName = 'PaddedHeading';

const Description = pad(styled.p`
  color: ${palette('slate', 'filler')};
`, 'xLarge');
Description.displayName = 'Description';

const MoneyValue = pad(Heading, 'large');
MoneyValue.displayName = 'MoneyValue';

const StyledReduxField = styled(ReduxField)`
  display: flex;
  align-items: baseline;
`;

const moneyValue = val =>
  <MoneyValue weight="regular" palette="secondary" variation="dark35">Up to {formatMoney(val)}</MoneyValue>;

const MonthlyBudget = () => (
  <>
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
      type="checkbox"
      responsive
      component={StyledReduxField}
      options={[{ value: true, label: "I'm only using Medicaid to pay." }]}
    />
  </>
);

export default MonthlyBudget;
