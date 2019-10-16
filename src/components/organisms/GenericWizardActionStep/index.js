import React from 'react';
import { string, func, object } from 'prop-types';
import { Field } from 'redux-form';
import styled, { css } from 'styled-components';

import { size, palette, assetPath } from 'sly/components/themes';
import { Heading, Block, Button, Image } from 'sly/components/atoms';

const ImageSection = styled(Block)`
  font-size: ${size('text.title')};
  text-align: center;
  margin-top: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};
`;

const HeadingSection = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
  width: 100%;
  text-align: center;
`;

const StyledDiv = styled.div`
  display: inline-block;
`;


const StyledButton = styled(Button)`
   display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  margin-right: ${size('spacing.regular')};
  margin-bottom: ${size('spacing.xLarge')};
  width: 100%;
  
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
  min-height: 400px;
`;
const AvatarIcon = styled(Image)`
  display: none;
  margin-left: -15px;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: inline-block;
  }
`;

const GenericWizardActionStep = ({ formData, error }) => {
  const {
    title, caption, buttons, imagePath, canStartOver, gotoStart
  } = formData;
  return (
    <StyledStepContainer>
      {imagePath && <ImageSection >
                      <AvatarIcon src={assetPath(`${imagePath}`)}/>
                    </ImageSection>}
      {title && <HeadingSection level="subtitle" size="subtitle" >{title} </HeadingSection>}
      {caption && <StyledBlock size="caption">
                    <StyledDiv >
                      {caption}
                    </StyledDiv>
                  </StyledBlock> }
      {buttons.map((b,i)=>{
        return (<StyledButton
          onClick={b.onClick}
          key={`${i}m`} to={b.to} target={b.target}
          ghost
        >{b.text}
        </StyledButton>);
      })}

      {error && <Block palette="danger">{error}</Block>}
      {canStartOver && <StyledButton ghost
        onClick={gotoStart}>Start Over
      </StyledButton>}
    </StyledStepContainer>
  );
};

GenericWizardActionStep.propTypes = {
  error: string,
  formData: object,
  userDetails: object,
};

export default GenericWizardActionStep;
