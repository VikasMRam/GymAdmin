import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { bool, object, number, func } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button, Hr } from 'sly/components/atoms';

import { Step1, Step2, Step3, Step4, Step5 } from './steps';

const progressBarWidth = ({ current, limit }) => (current / limit) * 100;

const ProgressWrapper = styled.div`
  background-color: ${palette('primary', 3)};
`;
const ProgressBar = styled.div`
  background-color: ${palette('secondary', 0)};
  height: ${size('spacing.regular')};
  width: ${progressBarWidth}%;
`;
const CurrentStep = styled.p`
  font-size: ${size('text.caption')};
  color: ${ifProp('limitReached', palette('secondary', 0), 'initial')};
`;
const StyledForm = styled.form`
  margin-bottom: calc(${size('spacing.huge')} + ${size('spacing.xxxLarge')});
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
const BottomWrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${palette('white', 0)};
  padding-bottom: ${size('spacing.xLarge')};
  bottom: 0;
  right: ${size('spacing.xxLarge')};
`;

const Component = ({
  currentStep, invalid, data, handleSubmit, totalNumberofSteps, onBackButton, change,
}) => {
  let currentStepComponent = null;
  switch (currentStep) {
    case 1:
      currentStepComponent = <Step1 invalid={invalid} data={data} />;
      break;
    case 2:
      currentStepComponent = <Step2 invalid={invalid} data={data} />;
      break;
    case 3:
      currentStepComponent = <Step3 invalid={invalid} data={data} />;
      break;
    case 4:
      currentStepComponent = <Step4 invalid={invalid} data={data} />;
      break;
    case 5:
      currentStepComponent = <Step5 invalid={invalid} data={data} setData={change} />;
      break;
    default:
      currentStepComponent = <Step1 invalid={invalid} data={data} />;
  }

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <ProgressWrapper>
        <ProgressBar current={currentStep} limit={totalNumberofSteps} />
      </ProgressWrapper>
      <Wrapper>
        <CurrentStep limitReached={currentStep === totalNumberofSteps}>
          Step {currentStep} of {totalNumberofSteps}
        </CurrentStep>
        <StyledForm onSubmit={handleSubmit}>
          {currentStepComponent}
          <BottomWrapper>
            <StyledHr />
            {currentStep <= totalNumberofSteps && (
              <ButtonsWrapper>
                <Button
                  type="button"
                  palette="grayscale"
                  disabled={currentStep === 1}
                  onClick={onBackButton}
                >
                  Back
                </Button>
                <Button type="submit" disabled={invalid}>
                  Continue
                </Button>
              </ButtonsWrapper>
            )}
          </BottomWrapper>
        </StyledForm>
      </Wrapper>
    </Fragment>
  );
};

Component.propTypes = {
  currentStep: number,
  totalNumberofSteps: number,
  invalid: bool,
  data: object,
  handleSubmit: func.isRequired,
  onBackButton: func.isRequired,
  change: func,
};

export default Component;
