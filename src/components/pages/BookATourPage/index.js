import React from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
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
import { DASHBOARD_PATH } from 'sly/constants/dashboardAppPaths';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityWizardAcknowledgementContainer from 'sly/containers/CommunityWizardAcknowledgementContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import BookingFormFooter from 'sly/components/molecules/BookingFormFooter';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';

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

const Body = makeBody('div');
const Controls = makeControls('div');

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
  community, user, userDetails, onComplete, showModal, hideModal,
}) => {
  const {
    id, mainImage, similarProperties,
  } = community;
  let formHeading = 'How can we contact you about this community tour?';
  if (user) {
    formHeading = 'Do you have any questions about this tour?';
  }
  const formSubheading = 'A local senior living advisor will help get you set up a tour with this community.';
  const openAdvisorHelp = () => {
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };
  const openConfirmationModal = () => {
    const heading = 'Tour Request Sent!';
    const subheading = 'Your Seniorly Partner Agent will check if this community is available at this time. They will get back to you shortly by phone or email.';
    const props = {
      similarCommunities: similarProperties,
      buttonTo: DASHBOARD_PATH,
      onTileClick: hideModal,
      heading,
      subheading,
      type: 'bat',
    };

    showModal(<CommunityWizardAcknowledgementContainer {...props} />);
  };
  const handleStepChange = ({ currentStep, doSubmit }) => {
    sendEvent('step-completed', id, currentStep);
    if (userDetails && userDetails.phone && userDetails.fullName) {
      return doSubmit();
    }
    return null;
  };

  return (
    <FullScreenWizard>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <Column backgroundImage={mainImage}>
        <StyledCommunityInfo inverted community={community} />
      </Column>
      <WizardController
        formName="BookATourWizardForm"
        onComplete={data => onComplete(data).then(openConfirmationModal)}
        onStepChange={handleStepChange}
      >
        {({
          data, onSubmit, isFinalStep, submitEnabled, ...props
        }) => (
          <>
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
                  onAdvisorHelpClick={openAdvisorHelp}
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
                isFinalStep={!!(userDetails && userDetails.phone && userDetails.fullName) || isFinalStep}
                isButtonDisabled={!submitEnabled}
              />
            </Controls>
          </>
        )}
      </WizardController>
    </FullScreenWizard>
  );
};

BookATourPage.propTypes = {
  community: communityPropType,
  user: object,
  userDetails: object,
  onComplete: func,
  onAdvisorHelpClick: func,
  showModal: func,
  hideModal: func,
};

export default BookATourPage;
