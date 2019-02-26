import React from 'react';
import { storiesOf } from '@storybook/react';

import { Block } from 'sly/components/atoms';
import Field from 'sly/components/molecules/Field';

const labelRight = (
  <Block palette="primary" size="caption">
    Forgot password?
  </Block>
);

storiesOf('Molecules|Field', module)
  .add('default', () => <Field name="field" placeholder="Input some text" />)
  .add('with label', () => (
    <Field name="field" placeholder="All your data!" label="Label" />
  ))
  .add('invalid', () => <Field name="field" label="Label" invalid />)
  .add('invalid with error message', () => (
    <Field
      name="field"
      label="Label"
      value="My input"
      error="Invalid"
      invalid
    />
  ))
  .add('warning', () => <Field name="field" label="Label" warning />)
  .add('warning with error message', () => (
    <Field
      name="field"
      label="Label"
      value="My input"
      error="Warning message"
      warning
    />
  ))
  .add('success', () => <Field name="field" label="Label" success />)
  .add('type email', () => <Field name="field" label="Email" type="email" />)
  .add('type password', () => <Field name="field" label="Password" labelRight={labelRight} type="password" />)
  .add('type password invalid', () => <Field name="field" label="Password" labelRight={labelRight} type="password" invalid />)
  .add('type password invalid with error message', () => <Field name="field" label="Password" labelRight={labelRight} type="password" error="Invalid" invalid />)
  .add('type textarea', () => (
    <Field name="field" label="Label" type="textarea" />
  ))
  .add('type select', () => (
    <Field name="field" label="Label" type="select" >
      <option>Name 1</option>
      <option>Name 2</option>
    </Field>))
  .add('type select with selected', () => (
    <Field name="field" label="Label" type="select" >
      <option >Name 1</option>
      <option selected>Name 2</option>
    </Field>))
  .add('type checkbox', () => (
    <Field name="field" label="Label" type="checkbox" />
  ))
  .add('type radio', () => <Field name="field" label="Label" type="radio" />)
  .add('type radio invalid with error message', () => (
    <Field name="field" label="Label" type="radio" error="Invalid" invalid />
  ));
