import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ToastNotification from '.';

storiesOf('Molecules|ToastNotification', module)
  .add('default', () => (
    <ToastNotification onClose={action('closed')} isOpen>
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </ToastNotification>
  ))
  .add('error status', () => (
    <ToastNotification onClose={action('closed')} isOpen status="error">
      Ullamco et reprehenderit magna cillum ullamco consectetur et enim aliqua.
    </ToastNotification>
  ));
