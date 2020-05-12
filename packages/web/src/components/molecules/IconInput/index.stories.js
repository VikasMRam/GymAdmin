import React from 'react';
import { storiesOf } from '@storybook/react';

import IconInput from 'sly/web/components/molecules/IconInput';

storiesOf('Molecules|IconInput', module)
  .add('default', () => <IconInput />)
  .add('warning', () => <IconInput warning />)
  .add('invalid', () => <IconInput invalid />)
  .add('disabled', () => <IconInput disabled />);

