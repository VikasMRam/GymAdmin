import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBox from '.';

storiesOf('Molecules|SearchBox', module)
  .add('default', () => (
    <SearchBox />
  ))
  .add('with homeHero layout', () => (
    <SearchBox layout="homeHero" />
  ));
