import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySATConfirmationPopup from 'sly/components/organisms/CommunitySATConfirmationPopup';
import Modal from 'sly/components/molecules/Modal/index';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

const defaultProps = {
  similarCommunities: similarProperties,
  similarCommunititesHref: 'www.teamseniorly.com',
  heading: 'Tour Request Sent!',
  subheading: 'Your advisor will check if this community is available at this time. They will get back to you shortly by phone or email.',
};

storiesOf('Organisms|CommunitySATConfirmationPopup', module)
  .add('default', () => <CommunitySATConfirmationPopup {...defaultProps} />)
  .add('Within Modal', () => (
    <Modal
      onClose={action('closed')}
      isOpen
      closeable
      layout="double"
    >
      <CommunitySATConfirmationPopup {...defaultProps} />
    </Modal>
  ));
