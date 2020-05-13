import React from 'react';
import { storiesOf } from '@storybook/react';

import Radio from 'sly/web/components/molecules/Radio';

storiesOf('Molecules|Radio', module)
  .add('checked', () => <Radio checked />)
  .add('default (unchecked)', () => <Radio />);
