import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityWizardAcknowledgement from 'sly/web/components/organisms/CommunityWizardAcknowledgement';
import Modal from 'sly/web/components/molecules/Modal';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarCommunities } = RhodaGoldmanPlaza;

const defaultProps = {
  similarCommunities: similarCommunities.similar,
  buttonTo: 'www.teamseniorly.com',
  buttonText: 'Take me to my dashboard',
  heading: 'Tour Request Sent!',
  subheading: 'Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.',
};

storiesOf('Organisms|CommunityWizardAcknowledgement', module)
  .add('default', () => <CommunityWizardAcknowledgement {...defaultProps} />)
  .add('within modal', () => (
    <Modal
      onClose={action('closed')}
      isOpen
      closeable
    >
      <CommunityWizardAcknowledgement {...defaultProps} />
    </Modal>
  ));
