import React from 'react';

import Heading from 'sly/common/system/Heading';

import { Table, THead, TBody, Th, Tr, Td, TextTd } from 'sly/common/system/Table';

const Props = ({ props, ...rest }) => (
  <>
    <Heading as="h4" pad="xs">
      Props
    </Heading>

    <Table sticky pad="l" {...rest}>
      <THead>
        <Tr>
          <Th>Prop</Th>
          <Th>Values</Th>
          <Th>Default</Th>
        </Tr>
      </THead>
      <TBody>
        {Object.keys(props).map((key) => (
          <Tr key={key}>
            <Td>{key}</Td>
            <TextTd>{props[key][0]}</TextTd>
            <Td>{props[key][1]}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  </>
);

export default Props;
