import React from 'react';
import { storiesOf } from '@storybook/react';

import AutocompleteContainer from 'sly';

storiesOf('Atoms|Autocomplete', module)
  .add('default', () => (
    <Autocomplete />
  ))
  .add('with palette', () => (
    <Autocomplete
  ));
