
import React from 'react';
import { storiesOf } from '@storybook/react';

import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

storiesOf('Molecules|CollapsibleBlock', module)
  .add('default', () => (
    <CollapsibleBlock>
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleBlock>
  ))
  .add('small', () => (
    <CollapsibleBlock minHeight="small">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleBlock>
  ))
  .add('large', () => (
    <CollapsibleBlock minHeight="large">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleBlock>
  ))
  .add('zero', () => (
    <CollapsibleBlock expandTo="bottom" moreLabelOn="center" chevronOnLeft minHeight={0} notCollapsedLabel="Hide additional content" collapsedLabel="Show additional content">
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleBlock>
  ))
  .add('splicit minHeight', () => (
    <CollapsibleBlock minHeight={200}>
      { 'Officia aliqua reprehenderit fugiat occaecat quis non eiusmod. '.repeat(25) }
    </CollapsibleBlock>
  ));
