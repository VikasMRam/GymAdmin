import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Heading from '.';

storiesOf('Common/Atoms/Heading', module)
  .add('default', () => (
    <Heading>Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
  .add('palette', () => (
    <Heading palette="primary">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('level hero', () => (
    <Heading level="hero">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('level title', () => (
    <Heading level="title">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('level subtitle', () => (
    <Heading level="subtitle">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('align center', () => (
    <Heading align="center">
      Officia aliqua reprehenderit.
    </Heading>
  ));
