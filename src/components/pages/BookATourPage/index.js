import React, { Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import Helmet from 'react-helmet';

import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import CommunityBookATourDateFormContainer from 'sly/containers/CommunityBookATourDateFormContainer';
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
import SlyEvent from 'sly/services/helpers/events';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';
import Modal from 'sly/components/molecules/Modal';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';

const Header = makeHeader(HeaderContainer);

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
const Body = makeBody(styled.div``);
const Controls = makeControls(styled.div``);

const StyledCommunityInfo = styled(CommunityInfo)`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  padding: ${size('spacing.large')};
  padding-top: ${size('spacing.xxxLarge')};
`;

const eventCategory = 'BAT';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const BookATourPage = ({
  community, user, userDetails, onComplete,
}) => {
  const { id, mainImage } = community;
  let formHeading = 'How can we contact you about this community tour?';
  if (user) {
    formHeading = 'Do you have any questions about this tour?';
  }
  const formSubheading = 'A local senior living advisor will help get you set up a tour with this community.';
  return (
    <FullScreenWizard>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <Column backgroundImage={mainImage}>
        <StyledCommunityInfo palette="white" community={community} />
      </Column>
      <FullScreenWizardController>
        {({
          isAdvisorHelpVisible, toggleAdvisorHelp, toggleConfirmationModal,
        }) => (
          <Fragment>
            <Modal closeable isOpen={isAdvisorHelpVisible} onClose={toggleAdvisorHelp}>
              <AdvisorHelpPopup onButtonClick={toggleAdvisorHelp} />
            </Modal>
            <WizardController
              formName="BookATourWizardForm"
              onComplete={data => onComplete(data, toggleConfirmationModal)}
              onStepChange={step => sendEvent('step-completed', id, step - 1)}
            >
              {({
                data, onSubmit, isFinalStep, submitEnabled, ...props
              }) => (
                <Fragment>
                  <Body>
                    <WizardSteps {...props}>
                      <WizardStep
                        component={CommunityBookATourDateFormContainer}
                        name="Date"
                        userDetails={userDetails}
                        onDateChange={(e, newValue) => sendEvent('date-changed', id, newValue.toString())}
                        onTimeChange={(e, newValue) => sendEvent('time-changed', id, newValue.toString())}
                      />
                      <WizardStep
                        component={CommunityBookATourContactFormContainer}
                        name="Contact"
                        onContactByTextMsgChange={(e, value) => sendEvent('contactByTextMsg-changed', id, value)}
                        onAdvisorHelpClick={toggleAdvisorHelp}
                        user={user}
                        userDetails={userDetails}
                        heading={formHeading}
                        subheading={formSubheading}
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
                    />
                  </Controls>
                </Fragment>
              )}
            </WizardController>
          </Fragment>
        )}
      </FullScreenWizardController>
    </FullScreenWizard>
  );
};

BookATourPage.propTypes = {
  community: communityPropType,
  user: object,
  userDetails: object,
  onComplete: func,
  isAdvisorHelpVisible: bool,
  onAdvisorHelpClick: func,
};

export default BookATourPage;
