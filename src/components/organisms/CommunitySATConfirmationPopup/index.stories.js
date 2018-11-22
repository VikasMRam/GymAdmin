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
