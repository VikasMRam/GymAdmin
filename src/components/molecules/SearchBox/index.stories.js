import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBox from 'sly/components/molecules/SearchBox';

storiesOf('Molecules|SearchBox', module)
  .add('default', () => (
    <SearchBox />
  ))
  .add('with homeHero layout', () => (
    <SearchBox layout="homeHero" />
  ))
  .add('with placeholder', () => (
    <SearchBox placeholder="hello world" />
  ));
