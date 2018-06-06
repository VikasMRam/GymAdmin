import React from 'react';
import { storiesOf } from '@storybook/react';

import ChatBox from '.';

storiesOf('Organisms|ChatBox', module)
  .add('default', () => <ChatBox />);
