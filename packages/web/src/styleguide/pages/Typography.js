import React from 'react';

import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import theme from 'sly/common/components/themes/default';

import { Table, THead, TBody, Th, Tr, Td } from 'sly/common/system/Table';
import Section from 'sly/web/styleguide/Section';

const getFontValue = (key) => {
  const values = theme.fonts[key];
  if (Array.isArray(values)) {
    return values.map(v => {
      const [chunk] = v.split(',');
      return <Td key={v}>{chunk}</Td>
    });
  } 
  const v = typeof values === 'object'
    ? values.font
    : values;
  const [chunk] = v.split(',');
  return <Td colSpan="2">{chunk}</Td>
}

const Typography = () => (
  <Section
    title="Typography"
    anchor="typography"
    subtitle="Typography is our system of fonts. Each font conveys the appropriate sentiment to assist our users through each stage of their journey."
  >
    <Heading
      font="title-xxl"
      pad="m"
    >
      Tiempos Headline 
    </Heading>
    <Paragraph 
      font="title-s"
      letterSpacing="10px"
      pad="xxl"
    >
      abndefghijklmnopqrstuvwxyz
    </Paragraph>

    <Heading
      font="body-l"
      fontSize={[36, 48]}
      lineHeight={['44px', '60px']}
      pad="m"
    >
      Azo Sans 
    </Heading>
    <Paragraph 
      font="body-l"
      letterSpacing="10px"
      pad="m"
    >
      abndefghijklmnopqrstuvwxyz
    </Paragraph>

    <Table pad="m" sticky>
      <THead>
        <Tr>
          <Th>Style</Th>
          <Th>Value</Th>
          <Th>Responsive</Th>
        </Tr>
      </THead>
      <TBody>
        {Object.keys(theme.fonts).map((key) => (
          <Tr>
            <Td font={key}>{key}</Td>
            {getFontValue(key)}
          </Tr>
        ))}
      </TBody>
    </Table>
  </Section>
);

export default Typography;
