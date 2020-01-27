import React from 'react';
import { string, func, array } from 'prop-types';
import styled from 'styled-components';
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

const WhatToDoNextText = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityPricingWizardWhatToDoNextForm = ({
  handleSubmit, listOptions, onInterestChange, type,
}) => (
  <Wrapper>
    <WrapperForm onSubmit={handleSubmit}>
      <HeadingSection palette="grey" size="body">Your {type} is on the way.</HeadingSection>
      <WhatToDoNextText palette="grey">Is there anything else we can help you with?</WhatToDoNextText>
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
  listOptions: array.isRequired,
  handleSubmit: func.isRequired,
  onSubmit: func.isRequired,
  onInterestChange: func,
  type: string,
};

CommunityPricingWizardWhatToDoNextForm.defaultProps = {
  type: 'pricing',
};

export default CommunityPricingWizardWhatToDoNextForm;
