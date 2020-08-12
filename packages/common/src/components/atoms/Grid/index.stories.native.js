import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Grid from '.';

import Button from 'sly/common/components/atoms/Button';
import Heading from 'sly/common/components/atoms/Heading';

storiesOf('Common|Atoms/Grid', module)
  .add('default', () => (
    <Grid>
      <Button>Hello</Button>
      <Button>Hello</Button>
      <Button>Hello</Button>
    </Grid>
  ))
  .add('flow', () => (
    <Grid flow="row">
      <Button>Hello</Button>
      <Button>Hello</Button>
      <Button>Hello</Button>
    </Grid>
  ))
  .add('flow and gap', () => (
    <>
      <Grid gap="large">
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </Grid>
      <Heading>Row</Heading>
      <Grid flow="row" gap="large">
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </Grid>
    </>
  ))
  .add('flow, gap and dimensions', () => (
    <Grid flow="column" gap="regular" dimensions={['50%', '25%', '25%']}>
      <Button>Hello</Button>
      <Button>Hello</Button>
      <Button>Hello</Button>
    </Grid>
  ));
