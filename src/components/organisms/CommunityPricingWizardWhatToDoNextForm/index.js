import React from 'react';
import { string, func, number, array, bool } from 'prop-types';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { Block, Box } from 'sly/components/atoms';
import shadow from 'sly/components/helpers/shadow';
import ReduxField from 'sly/components/organisms/ReduxField/index';

const Wrapper = shadow(styled(Box)`
  margin: 0 auto;
  padding: ${size('spacing.xxLarge')} ${size('spacing.xLarge')};
  width: ${size('mobileLayout.col4')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col6')};
  }
`);

const WrapperForm = styled.form`
  text-align: center;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('mobileLayout.col4')};
    margin: 0 auto;
  }
`;

const HeadingSection = styled(Block)`
  margin-bottom: ${size('spacing.small')};
`;

const PriceSection = styled(Block)`
  margin-bottom: ${size('spacing.large')};
`;

const Price = styled(NumberFormat)`
  font-size: ${size('text.hero')};
`;

const WhatToDoNextText = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityPricingWizardWhatToDoNextForm = ({
  handleSubmit, communityName, estimatedPrice, showEstimatePrice, listOptions, onInterestChange,
}) => (
  <Wrapper>
    <WrapperForm onSubmit={handleSubmit}>
      {showEstimatePrice &&
        <>
          <HeadingSection palette="grey" size="body">Your estimated pricing for {communityName}:</HeadingSection>
          <PriceSection weight="bold">
            <Price value={estimatedPrice} displayType="text" thousandSeparator prefix="$" />
            <span>/mo</span>
          </PriceSection>
        </>
      }
      <WhatToDoNextText palette="grey">Here is what you can do next:</WhatToDoNextText>
      <Field
        name="interest"
        type="buttonlist"
        options={listOptions}
        orientation="vertical"
        buttonKind="jumbo"
        buttonType="submit"
        buttonPalette="primary"
        component={ReduxField}
        onChange={onInterestChange}
      />
    </WrapperForm>
  </Wrapper>
);

CommunityPricingWizardWhatToDoNextForm.propTypes = {
  communityName: string.isRequired,
  estimatedPrice: number.isRequired,
  showEstimatePrice: bool,
  listOptions: array.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  onInterestChange: func,
};

export default CommunityPricingWizardWhatToDoNextForm;
