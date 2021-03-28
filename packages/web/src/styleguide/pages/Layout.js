import React from 'react'

import Block from 'sly/common/system/Block';
import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import { Table, THead, TBody, Th, Tr, Td } from 'sly/web/components/atoms/Table';

import theme from 'sly/common/components/themes/default';

import Section from 'sly/web/styleguide/Section';
import Example from 'sly/web/styleguide/Example';

const spacingCode = `const Component = () => (
  <Block
    m="s l"
    width="col2"
  >
    My first Block
  </Block>
);`;

const layout = [
  'gutter',
  'col1',
  'col2',
  'col3',
  'col4',
  'col5',
  'col6',
  'col7',
  'col8',
  'col9',
  'col10',
  'col11',
  'col12',
];

const layoutValues = (key) => {
  const value = theme.layout[key];
  if (Array.isArray(value)) {
    return value.map(v => v || 'null').join(' / ');
  }
  return value;
};

const spacing = [
  'xxs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  'xxl',
  'xxxl',
];

const Layout = (props) => (
  <Section
    title="Layout"
    anchor="layout"
    subtitle="This values are available everywhere you need to define a spacing."
    {...props}
  >
    <Paragraph pad="m">
      This values are available everywhere you need to define a spacing.
    </Paragraph>

    <Example
      title="Layout properties usage"
      text={spacingCode}
      pad="m"
    />

    <Heading
      font="title-s-azo"
      pad="m"
    >
      Layout
    </Heading>

    <Paragraph pad="m">
      This are the layout values for the grid system of the pages. It is fluid up to Tablet and then the column values are fixed.
    </Paragraph>

    <Table pad="m">
      <THead>
        <Tr>
          <Th>Token</Th>
          <Th>Mobile / Tablet and above</Th>
        </Tr>
      </THead>
      <TBody>
        {layout.map((key) => (
          <Tr>
            <Td>{key}</Td>
            <Td>{layoutValues(key)}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>

    <Heading
      font="title-s-azo"
      pad="m"
    >
      Spacing
    </Heading>

    <Table pad="m">
      <THead>
        <Tr>
          <Th>Token</Th>
          <Th>Value</Th>
          <Th>px</Th>
          <Th>Example</Th>
        </Tr>
      </THead>
      <TBody>
        {spacing.map((key, i) => (
          <Tr>
            <Td>{key}</Td>
            <Td>{theme.layout[key]}</Td>
            <Td>{parseFloat(theme.layout[key]) * 16}px</Td>
            <Td><Block height="s" width={key} background="viridian"></Block></Td>
          </Tr>
        ))}
      </TBody>
    </Table>


  </Section>
);

export default Layout;
