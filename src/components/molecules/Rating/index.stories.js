import React from 'react';
import { storiesOf } from '@storybook/react';

import Rating from '.';

storiesOf('Rating', module)
  .add('default', () => <Rating value={3.5} />)
  .add('small', () => <Rating value={3.5} size="small" />)
  .add('regular palette', () => <Rating value={3.5} palette="primary" />)
  .add('large', () => <Rating value={3.5} size="large" />)
  .add('large 3.1', () => <Rating value={3.1} size="large" />)
  .add('large 3.9', () => <Rating value={3.8} size="large" />)
  .add('large 3.99', () => <Rating value={3.9} size="large" />)
  .add('large 0.2', () => <Rating value={0.2} size="large" />);
