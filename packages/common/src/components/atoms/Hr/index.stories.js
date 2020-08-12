import React from 'react';
import { storiesOf } from '@storybook/react';

import Hr from '.';

storiesOf('Common|Atoms/Hr', module)
  .add('default', () => <Hr />)
  .add('palette', () => <Hr palette="danger" />)
  .add('margin', () => <Hr margin={['huge', 0]} />)
  .add('fullWidth', () => <Hr fullWidth />);
