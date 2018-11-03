import React from 'react';
import { storiesOf } from '@storybook/react';
import Block from '.';

storiesOf('Atoms|Block', module)
  .add('default', () => (
    <Block>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('palette', () => (
    <Block palette="primary">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ));
