import React from 'react';
import { storiesOf } from '@storybook/react';

import Rating from 'sly/web/components/molecules/Rating';

storiesOf('Molecules|Rating', module)
  .add('default', () => <Rating value={3.5} />)
  .add('regular palette', () => <Rating value={3.5} palette="primary" />)
  .add('small', () => <Rating value={3.5} size="body" />)
  .add('small 3.1', () => <Rating value={3.1} size="body" />)
  .add('small 3.9', () => <Rating value={3.9} size="body" />)
  .add('small 3.99', () => <Rating value={3.99} size="body" />)
  .add('small 0.2', () => <Rating value={0.01} size="body" />);
