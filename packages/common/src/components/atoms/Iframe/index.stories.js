import React from 'react';
import { storiesOf } from '@storybook/react';

import Iframe from '.';

storiesOf('Common|Atoms/Iframe', module)
  .add('default', () => <Iframe src="https://seniorly.com" />)
  .add('width', () => <Iframe src="https://seniorly.com" width="50%" />);
