
import React from 'react';
import { storiesOf } from '@storybook/react';

import Section from 'sly/components/molecules/Section';

storiesOf('Molecules|Section', module)
  .add('default', () => (
    <Section title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </Section>
  ))
  .add('centered title', () => (
    <Section centerTitle title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </Section>
  ))
  .add('with headingMargin', () => (
    <Section centerTitle title="Section title" headingMargin="xxLarge">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </Section>
  ));
