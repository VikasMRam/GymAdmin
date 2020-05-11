import React from 'react';
import { storiesOf } from '@storybook/react';
import { node } from 'prop-types';

import Th from 'sly/components/molecules/Th';

const ThWrapper = ({ children }) => (
  <table>
    <thead>
      <tr>
        {children}
      </tr>
    </thead>
  </table>
);

ThWrapper.propTypes = {
  children: node,
};

storiesOf('Molecules|Th', module)
  .add('default', () => (
    <ThWrapper><Th>Stage</Th></ThWrapper>
  ))
  .add('sort asc', () => (
    <ThWrapper><Th sort="asc">Stage</Th></ThWrapper>
  ))
  .add('sort desc', () => (
    <ThWrapper><Th sort="desc">Stage</Th></ThWrapper>
  ));
