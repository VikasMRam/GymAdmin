import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonLink from '.';

storiesOf('Common|Molecules/ButtonLink', module)
  .add('default', () => <ButtonLink>Hello</ButtonLink>)
  .add('icon', () => <ButtonLink icon="add">Hello</ButtonLink>)
  .add('palette', () => <ButtonLink icon="add" palette="slate">Hello</ButtonLink>)
  .add('caption', () => <ButtonLink size="caption">Hello</ButtonLink>);
