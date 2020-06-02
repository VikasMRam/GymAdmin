import React from 'react';
import styled from 'styled-components';
import { bool, object, number, func, string, arrayOf } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, assetPath, palette, key } from 'sly/web/components/themes';
import { Button, Hr, Heading, Image, Logo } from 'sly/web/components/atoms';
import { getStepComponent } from 'sly/web/external/apps/wizards/careAssessment/steps';

const progressBarWidth = ({ current, limit }) => (current / limit) * 100;

const ProgressWrapper = styled.div`
  background-color: ${palette('primary', 'stroke')};
`;
const ProgressBar = styled.div`
  background-color: ${palette('primary', 'base')};
  height: ${size('spacing.regular')};
  width: ${progressBarWidth}%;
  transition: width ${key('transitions.slow.inOut')};
`;
const CurrentStep = styled.p`
  font-size: ${size('text.caption')};
  color: ${ifProp('limitReached', palette('primary', 'base'), 'initial')};
`;
const StyledForm = styled.form`
  // should be more than height of BottomWrapper
  margin-bottom: calc(2 * ${size('spacing.massive')} + ${size('spacing.xxLarge')});
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
  margin-top: 0;
`;
const BottomWrapper = styled.div`
  // parent elements will have transform; hence this will behave like fixed.
  // don't make it fixed, transform with fixed has wierd behaviour in ff.
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10183406/
  position: absolute;
  width: 100%;
  background-color: ${palette('white', 'base')};
  bottom: 0;
  right: 0;
  padding: ${size('spacing.xxLarge')};
  padding-top: 0;
`;
const StyledHeading = styled(Heading)`
  font-weight: normal;
`;
const SearchingWrapper = styled(Wrapper)`
  top: 50%;
  transform: translate(0%, -50%);
  position: absolute;
  text-align: center;
  width: 100%;
`;
SearchingWrapper.displayName = 'SearchingWrapper';
const ScrollWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const SeniorlyLogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${size('spacing.large')};
  a {
    line-height: 0;
  }
`;

const Component = ({
  currentStep, invalid, data, handleSubmit, onSeeMore, totalNumberofSteps, onBackButton, change, setStoreKey,
  searching, searchResultCount, href, flow,
}) => {
  const CurrentStepComponent = getStepComponent(flow[currentStep - 1]);
  return (
    <ScrollWrapper>
      {searching &&
        <SearchingWrapper>
          <StyledHeading level="subtitle">Please wait while we search for your options.</StyledHeading>
          <Image src={assetPath('vectors/Search.svg')} />
        </SearchingWrapper>
      }
      {!searching &&
        <>
          <ProgressWrapper>
            <ProgressBar current={currentStep} limit={totalNumberofSteps} />
          </ProgressWrapper>
          <Wrapper>
            <SeniorlyLogoWrapper>
              <CurrentStep limitReached={currentStep === totalNumberofSteps}>
                Step {currentStep} of {totalNumberofSteps}
              </CurrentStep>
              <Logo />
            </SeniorlyLogoWrapper>
            <StyledForm onSubmit={handleSubmit}>
              <CurrentStepComponent
                invalid={invalid}
                data={data}
                setFormKey={change}
                setStoreKey={setStoreKey}
                searchResultCount={searchResultCount}
              />
              <BottomWrapper>
                <StyledHr />
                <ButtonsWrapper>
                  {currentStep < totalNumberofSteps && (
                    <Button
                      type="button"
                      ghost
                      disabled={currentStep === 1}
                      onClick={onBackButton}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep !== totalNumberofSteps &&
                    <Button type="submit" disabled={invalid}>
                      Continue
                    </Button>
                  }
                  {currentStep === totalNumberofSteps &&
                    // it's important to make this a regular href than opens new tab since
                    // by default browsers block popups opened using window.open
                    <Button
                      href={href}
                      target="_blank"
                      disabled={invalid}
                      onClick={onSeeMore}
                    >
                      See my options
                    </Button>
                  }
                </ButtonsWrapper>
              </BottomWrapper>
            </StyledForm>
          </Wrapper>
        </>
      }
    </ScrollWrapper>
  );
};

Component.propTypes = {
  currentStep: number.isRequired,
  totalNumberofSteps: number.isRequired,
  invalid: bool,
  data: object,
  handleSubmit: func.isRequired,
  onBackButton: func.isRequired,
  onSeeMore: func.isRequired,
  change: func,
  setStoreKey: func,
  searching: bool,
  searchResultCount: number,
  href: string.isRequired,
  flow: arrayOf(string),
};

Component.defaultPropTypes = {
  invalid: false,
  data: {},
  searching: false,
};

export default Component;
