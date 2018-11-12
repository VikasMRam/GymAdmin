import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import Modal from 'sly/components/molecules/Modal';

storiesOf('Molecules|AdvisorHelpPopup', module)
  .add('default', () => <AdvisorHelpPopup />)
  .add('Within Modal', () => (
    <Modal
      onClose={action('closed')}
      isOpen
      closeable
    >
      <AdvisorHelpPopup />
    </Modal>
  ));
