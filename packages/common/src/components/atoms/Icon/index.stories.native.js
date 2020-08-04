import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { Icons } from './index.stories.common';
import iconPaths from './iconPaths';

import Icon from '.';

const getIcons = () => Object.keys(iconPaths);

storiesOf('Common|Atoms/Icon', module)
  .add('default', () => <Icons icons={getIcons()} />)
  .add('flip', () => <Icons icons={getIcons()} flip />)
  .add('rotate', () => <Icons icons={getIcons()} rotate={45} />)
  .add('size', () => <Icons icons={getIcons()} size="hero" />)
  .add('palette', () => <Icons icons={getIcons()} palette="danger" />)
  .add('not existing', () => <Icon icon="nosdnfjsdfs" />);
