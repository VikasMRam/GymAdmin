import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityWizardAcknowledgement from 'sly/components/organisms/CommunityWizardAcknowledgement';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

const defaultProps = {
  similarCommunities: similarProperties,
  buttonTo: 'www.teamseniorly.com',
  buttonText: 'Take me to my dashboard',
  heading: 'Tour Request Sent!',
  subheading: 'Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.',
};

storiesOf('Organisms|CommunityWizardAcknowledgement', module)
  .add('default', () => <CommunityWizardAcknowledgement {...defaultProps} />);
