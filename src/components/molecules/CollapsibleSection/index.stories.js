
import React from 'react';
import { storiesOf } from '@storybook/react';
import CollapsibleSection from '.';

storiesOf('Molecules|CollapsibleSection', module)
  .add('default', () => (
    <CollapsibleSection>
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('small', () => (
    <CollapsibleSection minHeight="small">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('large', () => (
    <CollapsibleSection minHeight="large">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('splicit minHeight', () => (
    <CollapsibleSection minHeight={200}>
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ));
