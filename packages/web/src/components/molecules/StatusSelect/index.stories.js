import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import StatusSelect from '.';

const Wrapper = styled.div`
  margin: 10px;
  width: 300px;
`;

const client = {
  status: 'On Pause',
};

storiesOf('Molecules|StatusSelect', module)
  .add('default', () => (
    <>
      <Wrapper>
        <StatusSelect client={client} />
      </Wrapper>
      <Wrapper>
        <StatusSelect client={client} menuIsOpen />
      </Wrapper>
    </>
  ));
