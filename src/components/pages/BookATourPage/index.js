import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { required, usPhone } from 'sly/services/validation';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';

import {
  FullScreenWizard,
  makeBody,
  makeColumn,
  makeControls,
  makeHeader,
} from 'sly/components/templates/FullScreenWizard';

import BookATourPageController from 'sly/controllers/BookATourPageController';
import HeaderController from 'sly/controllers/HeaderController';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';
import Modal from 'sly/components/molecules/Modal';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunitySATContactForm from 'sly/components/organisms/CommunitySATContactForm';
import CommunitySATDateForm from 'sly/components/organisms/CommunitySATDateForm';

const Header = makeHeader(HeaderController);

const columnBackground = ({ backgroundImage }) => `url(${backgroundImage})`;
const Column = makeColumn(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-image: ${columnBackground};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
`);

const StyledCommunityInfo = styled(CommunityInfo)`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  padding: ${size('spacing.large')};
  padding-top: ${size('spacing.xxxLarge')};
  width: 100%;
`;

const Body = makeBody(styled.div`
  > * {
    margin-left: ${size('spacing.xLarge')};
    margin-right: ${size('spacing.xLarge')};
    margin-top: ${size('spacing.xxLarge')};

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      width: ${size('layout.col6')};
      margin-left: auto;
      margin-right: auto;
    }
  }
`);
const Controls = makeControls(styled.div``);

const BookATourPage = ({
  community, onDateChange, onTimeChange, onStepChange, onComplete, onContactByTextMsgChange,
}) => {
  const { mainImage } = community;

  return (
    <FullScreenWizard>
      <Header>
        <HeaderController />
      </Header>
      <Column backgroundImage={mainImage}>
        <StyledCommunityInfo palette="white" community={community} />
      </Column>
      <BookATourPageController>
        {({
          isAdvisorHelpVisible, toggleAdvisorHelp,
        }) => (
          <Fragment>
            <Modal closeable isOpen={isAdvisorHelpVisible} onClose={toggleAdvisorHelp}>
              <AdvisorHelpPopup onButtonClick={toggleAdvisorHelp} />
            </Modal>
            <WizardController onComplete={onComplete} onStepChange={onStepChange}>
              {({
                data, onSubmit, isFinalStep, submitEnabled, ...props
              }) => (
                <Fragment>
                  <Body>
                    <WizardSteps {...props}>
                      <WizardStep
                        component={CommunitySATDateForm}
                        name="Date"
                        validations={{ date: [required], time: [required], medicaid: [required] }}
                        onDateChange={onDateChange}
                        onTimeChange={onTimeChange}
                      />
                      <WizardStep
                        component={CommunitySATContactForm}
                        name="Contact"
                        validations={{ name: [required], phone: [required, usPhone] }}
                        onContactByTextMsgChange={onContactByTextMsgChange}
                        onAdvisorHelpClick={toggleAdvisorHelp}
                      />
                    </WizardSteps>
                  </Body>
                  <Controls>
                    <BookingFormFooter
                      date={data.date}
                      time={data.time}
                      onProgressClick={onSubmit}
                      isFinalStep={isFinalStep}
                      isButtonDisabled={!submitEnabled}
                      palette="primary"
                    />
                  </Controls>
                </Fragment>
              )}
            </WizardController>
          </Fragment>
        )}
      </BookATourPageController>
    </FullScreenWizard>
  );
};

BookATourPage.propTypes = {
  community: communityPropType,
  user: object,
  onDateChange: func,
  onTimeChange: func,
  onStepChange: func,
  onComplete: func,
  onContactByTextMsgChange: func,
  isAdvisorHelpVisible: bool,
  onAdvisorHelpClick: func,
};

export default BookATourPage;
