import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from 'sly/web/components/atoms/Input';

storiesOf('Atoms|Input', module)
  .add('default', () => <Input placeholder="Input some text" />)
  .add('disabled', () => <Input value="hello world" disabled />)
  .add('invalid', () => <Input invalid />)
  .add('invalid placeholder', () => <Input invalid placeholder="Input some text" />)
  .add('warning', () => <Input warning />)
  .add('warning placeholder', () => <Input warning placeholder="Input some text" />)
  .add('type textarea', () => <Input type="textarea" />)
  .add('type search', () => <Input type="search" placeholder="Type to filter by name" />)
  .add('type select', () => (
    <Input type="select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Input>
  ));
