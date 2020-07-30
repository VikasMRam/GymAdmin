import React from 'react';
import { storiesOf } from '@storybook/react';

import Block from '.';

storiesOf('Common|Atoms/Block', module)
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
  ))
  .add('pad', () => (
    <>
      <Block pad="large">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <div>content below</div>
    </>
  ))
  .add('aligns', () => (
    <>
      <Block align="right">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
      <Block align="center">
        Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
      </Block>
    </>
  ))
  .add('cursor', () => (
    <Block cursor="pointer">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('width as value', () => (
    <Block width="50%">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('width as theme layout', () => (
    <Block width="col2">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ));
