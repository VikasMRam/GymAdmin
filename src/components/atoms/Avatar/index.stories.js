import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from 'sly/components/atoms/Avatar';

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';

storiesOf('Atoms|Avatar', module)
  .add('default', () => <Avatar user={{ name, picture }} />)
  .add('with no picture', () => <Avatar user={{ name }} />)
  .add('with no picture and palette', () => <Avatar user={{ name }} palette="slate" />)
  .add('with no picture and size', () => <Avatar user={{ name }} size="small" />);
