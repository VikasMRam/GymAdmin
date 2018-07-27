import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';
import { bool, object, number, func, shape, string, oneOf } from 'prop-types';
import { ifProp } from 'styled-tools';

import { host } from 'sly/config'
import { size, assetPath } from 'sly/components/themes';
import { Button, Hr, Heading, Image } from 'sly/components/atoms';

import { stepOrders } from './helpers';
import { getStepComponent } from './steps';

const progressBarWidth = ({ current, limit }) => (current / limit) * 100;

const ProgressWrapper = styled.div`
  background-color: ${palette('primary', 3)};
`;
const ProgressBar = styled.div`
  background-color: ${palette('secondary', 0)};
  height: ${size('spacing.regular')};
  width: ${progressBarWidth}%;
  transition: width ${key('transitions.slow.inOut')};
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
const StyledHeading = styled(Heading)`
  font-weight: normal;
`;
const SearchingWrapper = Wrapper.extend`
  top: 50%;
  transform: translate3d(0%, -50%, 0);
  position: absolute;
  text-align: center;
  width: 100%;
`;

const Component = ({
  currentStep, invalid, data, handleSubmit, onSeeMore, totalNumberofSteps, onBackButton, change, setStoreKey,
  searching, searchResultCount, locationSearchParams, flow,
}) => {
  const CurrentStepComponent = getStepComponent(stepOrders[flow][currentStep - 1]);
  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      {searching &&
        <SearchingWrapper>
          <StyledHeading level="subtitle">Please wait while we search for your options.</StyledHeading>
          <Image src={assetPath('vectors/Search.svg')} />
        </SearchingWrapper>
      }
      {!searching &&
        <Fragment>
          <ProgressWrapper>
            <ProgressBar current={currentStep} limit={totalNumberofSteps} />
          </ProgressWrapper>
          <Wrapper>
            <CurrentStep limitReached={currentStep === totalNumberofSteps}>
              Step {currentStep} of {totalNumberofSteps}
            </CurrentStep>
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
                      palette="grayscale"
                      disabled={currentStep === 1}
                      onClick={onBackButton}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep !== totalNumberofSteps &&
                    <Button type="button" disabled={invalid} onClick={handleSubmit}>
                      Continue
                    </Button>
                  }
                  {currentStep === totalNumberofSteps &&
                    // it's important to make this a regular href than opens new tab since
                    // by default browsers block popups opened using window.open
                    <Button
                      href={`${host}/assisted-living/${locationSearchParams.state}/${locationSearchParams.city}?modal=thankyou`}
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
        </Fragment>
      }
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
  onSeeMore: func.isRequired,
  change: func,
  setStoreKey: func,
  searching: bool,
  searchResultCount: number,
  locationSearchParams: shape({
    state: string.isRequired,
    city: string.isRequired,
  }),
  flow: oneOf(Object.keys(stepOrders)),
};

export default Component;
