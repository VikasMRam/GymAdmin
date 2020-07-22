import React from 'react';
import { storiesOf } from '@storybook/react';

import ButtonLink from '.';

storiesOf('Common/Atoms/ButtonLink', module)
  .add('default', () => <ButtonLink>Hello</ButtonLink>)
  .add('with icon', () => <ButtonLink icon="add">Hello</ButtonLink>)
  .add('palette', () => <ButtonLink icon="add" palette="slate">Hello</ButtonLink>)
  .add('caption', () => <ButtonLink size="caption">Hello</ButtonLink>);
