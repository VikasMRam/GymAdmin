import React from 'react';
import { storiesOf } from '@storybook/react';

import { Icons } from './index.stories.common';

import Icon from '.';

const getIcons = () => {
  const context = require.context('./icons/', false, /\.svg$/);
  return context
    .keys()
    .map((icon) => {
      const result = icon.match(/^\.\/(.+)-regular\.svg$/);
      return result?.[1];
    })
    .filter(x => x);
};

storiesOf('Common|Atoms/Icon', module)
  .add('default', () => <Icons icons={getIcons()} />)
  .add('flip', () => <Icons icons={getIcons()} flip />)
  .add('rotate', () => <Icons icons={getIcons()} rotate={0.5} />)
  .add('size', () => <Icons icons={getIcons()} size="hero" />)
  .add('palette', () => <Icons icons={getIcons()} palette="danger" />)
  .add('not existing', () => <Icon icon="nosdnfjsdfs" />);
