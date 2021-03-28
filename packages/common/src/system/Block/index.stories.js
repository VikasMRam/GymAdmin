import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'sly/common/components/themes/default';
import Block from '.';

storiesOf('Common|Atoms/Block', module)
  .add('default', () => (
    <Block
      margin="s xs" 
      padding="xs xxs"
      background="harvest.base"
      startingWithTablet={{
        margin: 'l xl',
        padding: 'xl xxl',
      }}
    >
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('background', () => (
    <Block margin="l" background="harvest">Ello</Block>
  ))
  .add('facepaint', () => (
    <Block
      margin={['s', 'l']}
      padding={['s', 'l']}
      width='col1'
      startingWithTablet={{
        margin: [, ,'xl', 'xxl'],
        padding: [, , 'xl', 'xxl'],
        width: 'col2',
      }}
      background="harvest.base"
    >
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('just width', () => (
    <Block
      startingWith={{
        width: 'col1',
      }}
      startingWithTablet={{
        width: 'col2',
      }}
    >
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Block>
  ))
  .add('snap', () => (
    <>
      {[
        'top',
        'right',
        'bottom',
        'left',
        'all'
      ].map(dir => <Block key={dir} snap={dir}>{dir}</Block>)}
    </>
  ))
  .add('text', () => (
    <Block p='xl'>
      {Object.keys(theme.font)
        .map(key => (
          <React.Fragment key={key}>
            <Block>{key}</Block>
            <Block as='h2' font={key} mb='l'>
              This is a sentence with a responsive font
            </Block>
          </React.Fragment>
        ))}
    </Block>
  ))
  .add('xxlarge', () => (
    <Block m='xxl'>
      <Block>title-xxlarge</Block>
      <Block as='h2' font={['body-medium', 'title-xxlarge']} mb='l'>
        This is a sentence with a responsive font
      </Block>
    </Block>
  ))
  .add('width', () => (
    <Block
      background="harvest.base" 
      margin="l"
      padding="l"
      width="col2"
      snap="left"
      startingWithLaptop={{
        width: 'col3'
      }}
    >
      Responsive width
    </Block>
  ));
