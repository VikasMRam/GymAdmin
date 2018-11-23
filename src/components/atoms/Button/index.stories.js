import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'sly/components/atoms/Button';

storiesOf('Atoms|Button', module)
  .add('default', () => <Button>Hello</Button>)
  .add('disabled', () => <Button disabled>Hello</Button>)
  .add('ghost', () => <Button ghost>Hello</Button>)
  .add('transparent', () => <Button transparent>Hello</Button>)
  .add('disabled ghost', () => (
    <Button disabled ghost>
      Hello
    </Button>
  ))
  .add('jumbo', () => <Button type="jumbo">Hello</Button>)
  .add('another palette', () => <Button palette="danger">Hello</Button>)
  .add('label', () => <Button type="label">Hello</Button>)
  .add('label another palette', () => (
    <Button palette="slate" type="label">
      Hello
    </Button>
  ))
  .add('link', () => (
    <Button href="https://github.com/diegohaz/arc">ARc repository</Button>
  ));
