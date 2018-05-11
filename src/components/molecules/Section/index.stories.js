
import React from 'react';
import { storiesOf } from '@storybook/react';

import Section from '.';

storiesOf('Molecules|Section', module)
  .add('default', () => (
    <Section title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </Section>
  ));
