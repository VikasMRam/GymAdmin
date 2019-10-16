import React from 'react';
import { string, func, object } from 'prop-types';
import { Field } from 'redux-form';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Heading, Block, Button } from 'sly/components/atoms';

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
  display: flex;
`;

const StyledButton = styled(Button)`
   display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  margin-right: ${size('spacing.regular')};
  margin-bottom: ${size('spacing.xLarge')};
  width: 100%;
  padding: ${size('spacing.large')};
  background: white;
  color: black;
  border: 1px solid grey;
  border-radius: 2px;
  
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.small')}
    ${palette('slate', 'stroke')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(auto-fit, calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2));
  }

  > * {
    height: ${size('element.large')};
    font-size: ${size('text.caption')};
  }
`;

const StyledStepContainer = styled.div`
  padding: ${size('spacing.xLarge')};
`;

const GenericWizardStep = ({
     formData, userDetails, error,
  }) => {
  const { title, caption, buttons } = formData;
  return (
    <StyledStepContainer>
      <HeadingSection level="subtitle" size="subtitle">{title}</HeadingSection>
      <StyledBlock size="caption">
        {caption}
      </StyledBlock>
      {buttons.map((b,i)=>{
        return (<StyledButton
                  onClick={b.onClick} key={i}> {b.text}
                </StyledButton>);
      })}

      {error && <Block palette="danger">{error}</Block>}
    </StyledStepContainer>
  );
};

GenericWizardStep.propTypes = {
  error: string,
  formData: object,
  userDetails: object,
};

export default GenericWizardStep;
