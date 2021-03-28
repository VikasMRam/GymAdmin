import React from 'react';

import Table from 'sly/common/system/Table';

import { ComponentHeading, VariantHeading, VariantParagraph } from 'sly/web/styleguide/Component';
import { Cases, Case } from 'sly/web/styleguide/Case';
import Example from 'sly/web/styleguide/Example';
import Section from 'sly/web/styleguide/Section';
import Props from 'sly/web/styleguide/Props';

const tableExample = `const Component = () => (
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
          <Td>{props[key][0]}</Td>
          <Td>{props[key][1]}</Td>
        </Tr>
      ))}
    </TBody>
  </Table>
);`

const TablePage = () => (
  <Section
    title="Table"
    anchor="table"
    subtitle="A table shows formatted table of data."
  >
    <ComponentHeading>
      Table
    </ComponentHeading>

    <VariantHeading>
      {'<Table />'}
    </VariantHeading>

    <VariantParagraph>
      Use default table to display styled headers and rows of data.
    </VariantParagraph>

    <Props props={{
      sticky: ['allows the first column to be sticky when there is an horizontal scroll'],
    }} />

    <Example title="Example of usage of Table" text={tableExample} />
  </Section>
);

export default TablePage;
