import React from 'react';

import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';
import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import { Table, THead, TBody, Th, Tr, Td } from 'sly/web/components/atoms/Table';
import theme from 'sly/common/components/themes/default';
import Section from 'sly/web/styleguide/Section';
import Example from 'sly/web/styleguide/Example';
import { Case, Cases } from 'sly/web/styleguide/Case';

const borderBlock = `const Component = () => (
  <Block
    border="l"
    borderColor="viridian.base"
    p="s"
  >
    My first Block
  </Block>
  <Block
    border="round"
    background="viridian.base"
    color="white"
    p="s"
  >
    My second Block
  </Block>
  <Block
    border="box"
    p="s"
  >
    My third Block
  </Block>
  );`;


const Border = props => (
  <Section
    title="Border"
    anchor="border"
    subtitle="These are values that can be used when adding border to elements"
    {...props}
  >
    <Paragraph pad="m">
      These are values that can be used when adding border to elements along with any standard css values. See <Link to="/styleguide/block">Block Page</Link> for all available props that these border tokens can be used with.
    </Paragraph>

    <Example
      title="Border Usage"
      text={borderBlock}
      pad="m"
    />

    <Cases>
      <Case name="Standard">
        <Block
          border="l"
          borderColor="viridian.base"
          p="s"
        >
          My first Block
        </Block>
      </Case>
      <Case name="Round Border">
        <Block
          border="round"
          background="viridian.base"
          color="white"
          p="s"
        >
          My second Block
        </Block>
      </Case>
      <Case name="Box Border">
        <Block
          border="box"
          p="s"
        >
          My third Block
        </Block>
      </Case>
    </Cases>


    <Heading
      font="title-s-azo"
      pad="s"
    >
      Border
    </Heading>


    <Table pad="m">
      <THead>
        <Tr>
          <Th>Token</Th>
          <Th>Value</Th>
        </Tr>
      </THead>
      <TBody>
        {Object.keys(theme.border).map(key => (
          <Tr>
            <Td>{key}</Td>
            <Td>{JSON.stringify(theme.border[key])}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>

  </Section>
);

export default Border;
