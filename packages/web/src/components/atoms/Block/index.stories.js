import React from 'react';
import { storiesOf } from '@storybook/react';

import Block from 'sly/web/components/atoms/Block';

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
  ))
  .add('sizes', () => (
    <>
      <Block size="micro">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="tiny">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="caption">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="body">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="body" weight="medium">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="subtitle">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="title">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="hero">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block size="superHero">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
    </>
  ));
