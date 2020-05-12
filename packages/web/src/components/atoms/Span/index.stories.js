import React from 'react';
import { storiesOf } from '@storybook/react';

import Span from 'sly/web/components/atoms/Span';

storiesOf('Atoms|Span', module)
  .add('default', () => (
    <Span>
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Span>
  ))
  .add('palette', () => (
    <Span palette="primary">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Span>
  ))
  .add('palette and variation', () => (
    <Span palette="primary" variation="filler">
      Officia aliqua reprehenderit fugiat occaecat quis non eiusmod.
    </Span>
  ));
