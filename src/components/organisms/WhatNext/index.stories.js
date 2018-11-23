import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import WhatNext from 'sly/components/organisms/WhatNext';
import Modal from 'sly/components/molecules/Modal';
import community from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const root = document.querySelector('#root');
const onClose = action('onClose');

storiesOf('Organisms|WhatNext', module)
  .add('default', () => (
    <WhatNext reasons="howItWorks" onClose={action('onClose')} community={community} />
  ))
  .add('modal', () => (
    <Modal isOpen appElement={root} onClose={onClose} closeable>
      <WhatNext reasons="whatNext" onClose={onClose} community={community} />
    </Modal>
  ));
