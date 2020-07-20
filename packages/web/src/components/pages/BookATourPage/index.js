import React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import Helmet from 'react-helmet';
import { Route } from 'react-router';

import CommunityBookATourContactFormContainer from 'sly/web/containers/CommunityBookATourContactFormContainer';
import CommunityBookATourDateFormContainer from 'sly/web/containers/CommunityBookATourDateFormContainer';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { size } from 'sly/web/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import {
  FullScreenWizard,
  makeBody,
  makeColumn,
  makeControls,
  makeHeader,
} from 'sly/web/components/templates/FullScreenWizard';
import SlyEvent from 'sly/web/services/helpers/events';
import { DASHBOARD_PATH } from 'sly/web/constants/dashboardAppPaths';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import CommunityWizardAcknowledgementContainer from 'sly/web/containers/CommunityWizardAcknowledgementContainer';
import CommunityInfo from 'sly/web/components/molecules/CommunityInfo';
import BookingFormFooter from 'sly/web/components/molecules/BookingFormFooter';
import AdvisorHelpPopup from 'sly/web/components/molecules/AdvisorHelpPopup';
import Modal from 'sly/web/components/molecules/Modal';

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
  community, user, medicaidCoverage, onComplete, redirectTo, match,
}) => {
  const {
    id, mainImage,
  } = community;
  const formHeading = user
    ? 'Do you have any questions about this tour?'
    : 'How can we contact you about this community tour?';

  const formSubheading = 'A local senior living advisor will help get you set up a tour with this community.';
  const handleStepChange = ({ currentStep, doSubmit }) => {
    sendEvent('step-completed', id, currentStep);
    if (user && user.phoneNumber && user.name) {
      return doSubmit();
    }
    return null;
  };
  const handleHelpHover = (type) => {
    sendEvent('help-tooltip-hover', type);
  };

  return (
    <FullScreenWizard>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <Column backgroundImage={mainImage}>
        <StyledCommunityInfo inverted community={community} headerIsLink />
      </Column>
      <WizardController
        formName="BookATourWizardForm"
        onComplete={data => onComplete(data).then(() => redirectTo(`${match.url}/thank-you`))}
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
                  medicaidCoverage={medicaidCoverage}
                  onDateChange={(e, newValue) => sendEvent('date-changed', id, newValue.toString())}
                  onTimeChange={(e, newValue) => sendEvent('time-changed', id, newValue.toString())}
                  onHelpHover={handleHelpHover}
                />
                <WizardStep
                  component={CommunityBookATourContactFormContainer}
                  name="Contact"
                  onContactByTextMsgChange={(e, value) => sendEvent('contactByTextMsg-changed', id, value)}
                  onAdvisorHelpClick={() => redirectTo(`${match.url}/help`)}
                  user={user}
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
                isFinalStep={!!(user && user.phoneNumber && user.name) || isFinalStep}
                isButtonDisabled={!submitEnabled}
              />
            </Controls>
          </>
        )}
      </WizardController>
      <Route path={`${match.url}/thank-you`}>
        {({ match }) => (
          <Modal isOpen={!!match} onClose={() => redirectTo(community.url)} closeable>
            <CommunityWizardAcknowledgementContainer
              similarCommunities={community.similarProperties}
              buttonTo={DASHBOARD_PATH}
              heading="Tour Request Sent!"
              subheading="Your Seniorly Partner Agent will check if this community is available at this time. They will get back to you shortly by phone or email."
              type="bat"
            />
          </Modal>
        )}
      </Route>
      <Route path={`${match.url}/help`}>
        {routeProps => (
          <Modal isOpen={!!routeProps.match} onClose={() => redirectTo(match.url)} closeable>
            <AdvisorHelpPopup onButtonClick={() => redirectTo(match.url)} />
          </Modal>
        )}
      </Route>

    </FullScreenWizard>
  );
};

BookATourPage.propTypes = {
  community: communityPropType,
  user: object,
  onComplete: func,
  medicaidCoverage: bool,
  redirectTo: func.isRequired,
  match: object.isRequired,
};

export default BookATourPage;
