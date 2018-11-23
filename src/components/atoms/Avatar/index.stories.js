import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from '.';

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';

storiesOf('Atoms|Avatar', module)
  .add('default', () => <Avatar user={{ name, picture }} />)
  .add('with no picture', () => <Avatar user={{ name }} />);
