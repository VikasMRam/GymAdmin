import React from 'react';
import { storiesOf } from '@storybook/react';

import InputMessage from 'sly/web/components/molecules/InputMessage';

const name = 'blah';

storiesOf('Molecules|InputMessage', module)
  .add('default', () => <InputMessage name={`${name}Warning`} icon="warning" palette="warning" message="Warning" />)
  .add('error', () => <InputMessage name={`${name}Error`} icon="close" palette="danger" message="Error" />);
