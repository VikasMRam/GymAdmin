import React from 'react';
import { storiesOf } from '@storybook/react';

import { Block, Box } from 'sly/web/components/atoms';
import Field from 'sly/web/components/molecules/Field';

const labelRight = (
  <Block palette="primary" size="caption">
    Forgot password?
  </Block>
);

const optionsList = [{ value: 'sms', label: 'SMS' }, { value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }];

storiesOf('Molecules|Field', module)
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
  .add('type richtextarea', () => (
    <Field name="field" label="Label" type="richtextarea" />
  ))
  .add('type richtextarea disabled', () => (
    <Field name="field" label="Label" type="richtextarea" disabled />
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
  .add('type checkbox with options', () => (
    <Field name="field" label="Contact preference" type="checkbox" options={optionsList} />
  ))
  .add('type radio', () => <Field name="field" label="Label" type="radio" />)
  .add('type radio invalid with error message', () => (
    <Field name="field" label="Label" type="radio" message="Invalid" invalid />
  ))
  .add('type iconInput', () => (
    <Field name="field" label="Label" type="iconInput" />
  ))
  // Need to whitelist storybook domain in Google Console, else wont work
  .add('type locationSearch', () => (
    <Field name="field" label="Label" type="locationSearch" />
  ));
