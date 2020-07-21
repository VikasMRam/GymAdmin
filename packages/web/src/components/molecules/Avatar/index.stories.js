import React from 'react';
import { storiesOf } from '@storybook/react';

import Avatar from 'sly/web/components/molecules/Avatar';

const name = 'Fonz';
const picture = {
  src: 'https://avatars.githubusercontent.com/u/113003',
};
const picturePath = {
  path: '3a2008ef77a20485e5924b0fcc34c123/Buena_Vista_logo-22.jpg',
};

storiesOf('Molecules|Avatar', module)
  .add('default', () => <Avatar user={{ name, picture }} />)
  .add('with picturePath', () => <Avatar user={{ name, picture: picturePath }} />)
  .add('with no picture', () => <Avatar user={{ name }} />)
  .add('with no picture and palette', () => <Avatar user={{ name }} palette="slate" />)
  .add('with no picture and size', () => <Avatar user={{ name }} size="body" />);
