import React from 'react';
import { storiesOf } from '@storybook/react';

import { labelRight, optionsList, generateViews } from './index.stories.common';

storiesOf('Common|Molecules/Field', module)
  .add('default', () => generateViews({
    name: 'field',
    placeholder: 'Input some text',
  }))
  .add('label', () => generateViews({
    name: 'field',
    placeholder: 'All your data!',
    label: 'Label',
  }))
  .add('label and required', () => generateViews({
    name: 'field',
    placeholder: 'All your data!',
    label: 'Label',
    required: true,
  }))
  .add('invalid', () => generateViews({
    name: 'field',
    label: 'Label',
    invalid: true,
  }))
  .add('invalid and required', () => generateViews({
    name: 'field',
    label: 'Label',
    invalid: true,
    required: true,
  }))
  .add('invalid with error message', () =>
    generateViews({
      name: 'field',
      label: 'Label',
      defaultValue: 'My input',
      message: 'Invalid',
      invalid: true,
    }))
  .add('invalid and required with error message', () =>
    generateViews({
      name: 'field',
      label: 'Label',
      defaultValue: 'My input',
      message: 'Invalid',
      invalid: true,
      required: true,
    }))
  .add('warning', () => generateViews({
    name: 'field',
    label: 'Label',
    warning: true,
  }))
  .add('warning and error message', () => generateViews({
    name: 'field',
    label: 'Label',
    defaultValue: 'My input',
    message: 'Warning message',
    warning: true,
  }))
  .add('success', () => generateViews({
    name: 'field',
    label: 'Label',
    success: true,
  }))
  .add('type email', () => generateViews({
    name: 'field',
    label: 'Email',
    type: 'email',
  }))
  .add('type password', () => generateViews({
    name: 'field',
    label: 'Password',
    labelRight,
    type: 'password',
  }))
  .add('type password invalid', () => generateViews({
    name: 'field',
    label: 'Password',
    labelRight,
    type: 'password',
    invalid: true,
  }))
  .add('type password invalid and error message', () => generateViews({
    name: 'field',
    label: 'Password',
    labelRight,
    type: 'password',
    message: 'Invalid',
    invalid: true,
  }))
  .add('type textarea', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'textarea',
  }))
  .add('type textarea and showCharacterCount', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'textarea',
    maxLength: 100,
    showCharacterCount: true,
  }))
  .add('type richtextarea', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'richtextarea',
  }))
  .add('type richtextarea disabled', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'richtextarea',
    disabled: true,
  }))
  .add('type date', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'date',
  }))
  .add('type select', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'select',
    children: (
      <>
        <option value="name-1">Name 1</option>
        <option value="name-2">Name 2</option>
      </>
    ),
  }))
  .add('type select with selected', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'select',
    defaultValue: 'name-2',
    children: (
      <>
        <option value="name-1">Name 1</option>
        <option value="name-2">Name 2</option>
      </>
    ),
  }))
  .add('type checkbox', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'checkbox',
  }))
  .add('type checkbox and options', () => generateViews({
    name: 'field',
    label: 'Contact preference',
    type: 'checkbox',
    options: optionsList,
  }))
  .add('type radio', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'radio',
  }))
  .add('type radio invalid and error message', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'radio',
    message: 'Invalid',
    invalid: true,
  }))
  .add('type iconInput', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'iconInput',
  }))
  // Need to whitelist storybook domain in Google Console, else wont work
  .add('type locationSearch', () => generateViews({
    name: 'field',
    label: 'Label',
    type: 'locationSearch',
  }));
