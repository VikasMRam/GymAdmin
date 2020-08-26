import React from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '.';

storiesOf('Common|Atoms/Heading', module)
  .add('default', () => (
    <Heading>Id tempor duis non esse commodo fugiat excepteur nostrud.</Heading>
  ))
  .add('palette', () => (
    <Heading palette="primary">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('size hero', () => (
    <Heading size="hero">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('size title', () => (
    <Heading size="title">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('size subtitle', () => (
    <Heading size="subtitle">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('size subtitle', () => (
    <Heading size="subtitle">
      Id tempor duis non esse commodo fugiat excepteur nostrud.
    </Heading>
  ))
  .add('align center', () => (
    <Heading align="center">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Heading>
  ));
