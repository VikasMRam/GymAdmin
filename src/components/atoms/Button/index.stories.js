import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from 'sly/components/atoms/Button';

storiesOf('Atoms|Button', module)
  .add('default', () => <Button>Hello</Button>)
  .add('disabled', () => <Button disabled>Hello</Button>)
  .add('secondary', () => <Button secondary>Hello</Button>)
  .add('ghost', () => <Button ghost>Hello</Button>)
  .add('ghost with palette', () => <Button ghost palette="slate">Hello</Button>)
  .add('secondary ghost', () => <Button secondary ghost>Hello</Button>)
  .add('transparent', () => <Button transparent>Hello</Button>)
  .add('disabled ghost', () => (
    <Button disabled ghost>
      Hello
    </Button>
  ))
  .add('jumbo', () => <Button kind="jumbo">Hello</Button>)
  .add('another palette', () => <Button palette="danger">Hello</Button>)
  .add('link', () => (
    <Button href="https://github.com/diegohaz/arc">ARc repository</Button>
  ))
  .add('link and target', () => (
    <Button href="https://github.com/diegohaz/arc" target="_blank">ARc repository</Button>
  ));
