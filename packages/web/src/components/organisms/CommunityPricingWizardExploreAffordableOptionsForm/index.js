import React from 'react';
import { func, array } from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

import { size } from 'sly/web/components/themes';
import { Block, Box } from 'sly/web/components/atoms';
import shadow from 'sly/web/components/helpers/shadow';
import ReduxField from 'sly/web/components/organisms/ReduxField/index';

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
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityPricingWizardExploreAffordableOptionsForm = ({
  handleSubmit, listOptions, onBudgetChange,
}) => (
  <Wrapper>
    <WrapperForm onSubmit={handleSubmit}>
      <HeadingSection palette="grey" size="body">What is your monthly budget?</HeadingSection>
      <Field
        name="budget"
        type="buttonlist"
        options={listOptions}
        orientation="vertical"
        buttonKind="jumbo"
        buttonType="submit"
        buttonPalette="primary"
        component={ReduxField}
        onChange={onBudgetChange}
      />
    </WrapperForm>
  </Wrapper>
);

CommunityPricingWizardExploreAffordableOptionsForm.propTypes = {
  listOptions: array.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  onBudgetChange: func,
};

export default CommunityPricingWizardExploreAffordableOptionsForm;
