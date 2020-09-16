import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBox from '.';

import suggestions from 'sly/storybook/sample-data/search-san.json';

storiesOf('Molecules|SearchBox', module)
  .add('default', () => (
    <SearchBox />
  ))
  .add('default and suggestions', () => (
    <SearchBox isTextboxInFocus suggestions={suggestions} />
  ))
  .add('homeHero layout', () => (
    <SearchBox layout="homeHero" />
  ))
  .add('homeHero layout and suggestions', () => (
    <SearchBox isTextboxInFocus layout="homeHero" suggestions={suggestions} />
  ))
  .add('placeholder', () => (
    <SearchBox placeholder="hello world" />
  ));
