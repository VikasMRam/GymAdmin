import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Notification from 'sly/components/molecules/Notification';

storiesOf('Molecules|Notification', module)
  .add('default', () => (
    <Notification onClose={action('closed')} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Notification>
  ))
  .add('error status', () => (
    <Notification onClose={action('closed')} isOpen status="error">
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </Notification>
  ));
