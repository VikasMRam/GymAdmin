import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import { Button, Hr } from 'sly/components/atoms';

import { Step1 } from './steps';

const ProgressWrapper = styled.div`
  background-color: ${palette('grayscale', 2)};
`;
const ProgressBar = styled.div`
  background-color: ${palette('secondary', 0)};
  height: ${size('spacing.regular')};
  width: 16%;
`;
const CurrentStep = styled.p`
  font-size: ${size('text.tiny')};
`;
const StyledForm = styled.form`
  margin-bottom: ${size('spacing.xLarge')};
`;
const Wrapper = styled.div`
  padding: ${size('spacing.large')} ${size('spacing.xxLarge')} 0 ${size('spacing.xxLarge')};
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  > button {
    margin-left: ${size('spacing.large')};
  }
`;
const StyledHr = styled(Hr)`
  margin-left: -${size('spacing.xxLarge')};
  margin-right: -${size('spacing.xxLarge')};
`;

const Component = ({ currentStep, invalid }) => {
  let currentStepComponent = null;
  switch (currentStep) {
    case 'STEP1':
      currentStepComponent = <Step1 invalid={invalid} />;
      break;
    default:
      currentStepComponent = <Step1 invalid={invalid} />;
  }

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <ProgressWrapper>
        <ProgressBar />
      </ProgressWrapper>
      <Wrapper>
        <CurrentStep>Step 1 of 6</CurrentStep>
        <StyledForm>
          {currentStepComponent}
          <StyledHr />
          <ButtonsWrapper>
            <Button type="button" disabled>
              Back
            </Button>
            <Button type="submit" disabled={invalid}>
              Continue
            </Button>
          </ButtonsWrapper>
        </StyledForm>
      </Wrapper>
    </Fragment>
  );
};

Component.propTypes = {
  currentStep: string,
};

export default Component;
