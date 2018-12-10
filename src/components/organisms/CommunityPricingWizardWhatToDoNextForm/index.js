import React from 'react';
import { string, func, number, array } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Field } from 'redux-form';

import { size, palette } from 'sly/components/themes';
import { Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField/index';

const Wrapper = styled.div`
  margin: 0 auto;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.tiny')};
  box-shadow:
      0
      ${size('spacing.small')}
      ${size('spacing.large')}
      ${palette('slate', 'filler')}80;
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`;
const WrapperForm = styled.div`
  margin: 0 auto;
  width: ${size('mobileLayout.col4')};
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  text-align: center;
`;

const HeadingSection = styled(Block)`
  color: ${palette('grey', 'base')};
  margin-bottom: ${size('spacing.small')};
`;

const PriceSection = styled(Block)`
  margin-bottom: ${size('spacing.large')};
`;
const Price = styled(NumberFormat)`
  font-size: 36px;
  line-height: 48px;
`;
const PerMonthText = styled.span`
  font-size: 16px;
  line-height: 48px;
`;

const WhatToDoNextText = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityPricingWizardWhatToDoNextForm = ({
  handleSubmit, communityName, estimatedPrice, listOptions, onSubmit,
}) => {
  return (
    <Wrapper>
      <WrapperForm>
        <HeadingSection level="body" size="body">Your estimated pricing for {communityName}:</HeadingSection>
        <PriceSection weight="bold">
          <Price value={estimatedPrice} displayType="text" thousandSeparator prefix="$" />
          <PerMonthText>/mo</PerMonthText>
        </PriceSection>
        <WhatToDoNextText palette="grey">Here is what you can do next:</WhatToDoNextText>
        <Field
          name="interest"
          type="buttonlist"
          options={listOptions}
          orientation="vertical"
          buttonKind="jumbo"
          buttonPalette="primary"
          component={ReduxField}
          onChange={(e, value) => { onSubmit(value); handleSubmit(e, value); }}
        />
      </WrapperForm>
    </Wrapper>
  );
};

CommunityPricingWizardWhatToDoNextForm.propTypes = {
  communityName: string.isRequired,
  estimatedPrice: number.isRequired,
  listOptions: array.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
};

export default CommunityPricingWizardWhatToDoNextForm;
