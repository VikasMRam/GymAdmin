
import React from 'react';
import { storiesOf } from '@storybook/react';

import CollapsibleSection from 'sly/web/components/molecules/CollapsibleSection';

storiesOf('Molecules|CollapsibleSection', module)
  .add('default', () => (
    <CollapsibleSection title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('small', () => (
    <CollapsibleSection size="small" title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('large', () => (
    <CollapsibleSection size="large" title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('splicit minHeight', () => (
    <CollapsibleSection title="Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ))
  .add('clampTitle', () => (
    <CollapsibleSection clampTitle title="Section title Section title Section title Section title Section title Section title Section title Section title Section title Section title">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleSection>
  ));
