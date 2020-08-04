import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Field from '.';

import { Block, Box } from 'sly/common/components/atoms';

const labelRight = (
  <Block palette="primary" size="caption">
    Forgot password?
  </Block>
);

storiesOf('Common|Molecules/Field', module)
  .add('default', () => <Field name="field" placeholder="Input some text" />)
  .add('with label', () => (
    <Field name="field" placeholder="All your data!" label="Label" />
  ))
  .add('invalid', () => <Field name="field" label="Label" invalid />)
  .add('invalid with error message', () => (
    <>
      <Box>
        <Field
          name="field"
          label="Label"
          value="My input"
          message="Invalid"
          invalid
        />
      </Box>
      <Block>Horizontal</Block>
      <Box>
        <Field
          name="field"
          label="Label"
          value="My input"
          message="Invalid"
          invalid
          wideWidth
        />
      </Box>
    </>
  ))
  .add('warning', () => <Field name="field" label="Label" warning />)
  .add('warning with error message', () => (
    <Field
      name="field"
      label="Label"
      value="My input"
      message="Warning message"
      warning
    />
  ))
  .add('warning with error message horizontal', () => (
    <Field
      name="field"
      label="Label"
      value="My input"
      message="Warning message Warning message Warning message Warning message"
      warning
      wideWidth
    />
  ))
  .add('success', () => <Field name="field" label="Label" success />)
  .add('type email', () => <Field name="field" label="Email" type="email" />)
  .add('type password', () => <Field name="field" label="Password" labelRight={labelRight} type="password" />)
  .add('type password invalid', () => <Field name="field" label="Password" labelRight={labelRight} type="password" invalid />)
  .add('type password invalid with error message', () => <Field name="field" label="Password" labelRight={labelRight} type="password" message="Invalid" invalid />)
  .add('type textarea', () => (
    <Field name="field" label="Label" type="textarea" />
  ))
  .add('type textarea with showCharacterCount', () => (
    <Field showCharacterCount name="field" label="Label" type="textarea" />
  ))
  // Need to whitelist storybook domain in Google Console, else wont work
  .add('type locationSearch', () => (
    <Field name="field" label="Label" type="locationSearch" />
  ));
