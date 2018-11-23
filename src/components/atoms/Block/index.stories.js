import React from 'react';
import { storiesOf } from '@storybook/react';

import Block from 'sly/components/atoms/Block';

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
  ))
  .add('palette and variation', () => (
    <Block palette="primary" variation="filler">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ));
