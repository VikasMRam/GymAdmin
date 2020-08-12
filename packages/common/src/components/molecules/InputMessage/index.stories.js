import React from 'react';
import { storiesOf } from '@storybook/react';

import InputMessage from '.';

const name = 'blah';

storiesOf('Common|Molecules/InputMessage', module)
  .add('default', () => <InputMessage name={`${name}Warning`} icon="warning" palette="warning" message="Warning" />)
  .add('error', () => <InputMessage name={`${name}Error`} icon="close" palette="danger" message="Error" />);
