import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from 'sly/web/components/atoms/Link';

storiesOf('Atoms|Link', module)
  .add('default', () => <Link href="/">Hello</Link>)
  .add('secondary', () => <Link href="/" palette="secondary">Hello</Link>)
  .add('link', () => (
    <Link to="/community/rhoda">Hello</Link>
  ));
