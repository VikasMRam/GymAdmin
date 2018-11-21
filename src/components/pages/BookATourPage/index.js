import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';

import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
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
import CommunitySATDateFormContainer from 'sly/containers/CommunitySATDateFormContainer';
import CommunitySATContactFormContainer from 'sly/containers/CommunitySATContactFormContainer';

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
  community, user, onDateChange, onTimeChange, onStepChange, onComplete, onContactByTextMsgChange,
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
                        component={CommunitySATDateFormContainer}
                        name="Date"
                        onDateChange={onDateChange}
                        onTimeChange={onTimeChange}
                      />
                      <WizardStep
                        component={CommunitySATContactFormContainer}
                        name="Contact"
                        onContactByTextMsgChange={onContactByTextMsgChange}
                        onAdvisorHelpClick={toggleAdvisorHelp}
                        user={user}
                      />
                    </WizardSteps>
                  </Body>
                  <Controls>
                    <BookingFormFooter
                      date={data.scheduledDate}
                      time={data.scheduledTime}
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
