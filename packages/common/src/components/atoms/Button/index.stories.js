import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ButtonComponent from '.';

const defaultProps = {
  onClick: action('Button pressed'),
};

const Button = props => <ButtonComponent {...defaultProps} {...props} />;

storiesOf('Common/Atoms/Button', module)
  .add('default', () => <Button>Hello</Button>)
  .add('disabled', () => <Button disabled>Hello</Button>)
  .add('secondary', () => <Button secondary>Hello</Button>)
  .add('secondary selected', () => <Button secondary selected>Hello</Button>)
  .add('ghost', () => <Button ghost>Hello</Button>)
  .add('ghost and palette', () => <Button ghost palette="warning">Hello</Button>)
  .add('ghost, palette and variation', () =>
    <Button ghost palette="slate" variation="filler">Hello</Button>)
  .add('ghost and selected', () => <Button ghost selected>Hello</Button>)
  .add('ghost, palette and selected', () => <Button ghost selected palette="warning">Hello</Button>)
  .add('secondary ghost', () => <Button secondary ghost>Hello</Button>)
  .add('transparent', () => <Button transparent>Hello</Button>)
  .add('transparent and palette', () => <Button transparent palette="warning">Hello</Button>)
  .add('disabled ghost', () => (
    <Button disabled ghost>
      Hello
    </Button>
  ))
  .add('jumbo', () => <Button kind="jumbo">Hello</Button>)
  .add('another background', () => <Button background="danger">Hello</Button>)
  .add('another background and disabled', () => <Button disabled background="danger">Hello</Button>)
  .add('another palette', () => <Button palette="danger">Hello</Button>)
  .add('another palette and disabled', () => <Button disabled palette="danger">Hello</Button>)
  .add('to', () => (
    <Button to="/diegohaz/arc">App link</Button>
  ))
  .add('to ghost', () => (
    <Button ghost to="/diegohaz/arc">App link</Button>
  ))
  .add('link', () => (
    <Button href="https://github.com/diegohaz/arc">ARc repository</Button>
  ))
  .add('link and target', () => (
    <Button href="https://github.com/diegohaz/arc" target="_blank">ARc repository</Button>
  ));
