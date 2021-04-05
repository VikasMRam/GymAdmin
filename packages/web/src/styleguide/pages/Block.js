import React from 'react';

import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import { Table, THead, TBody, Th, Tr, Td } from 'sly/web/components/atoms/Table';
import Section from 'sly/web/styleguide/Section';
import Example from 'sly/web/styleguide/Example';

const blockCode = `const Footer = () => (
  <Block
    display="flex"
    flexDirection="column"
    paddingBottom="s"
    sx$tablet={{
      flexDirection: 'row',
      flexWrap: 'wrap'
    }}
    sx$laptop={{
      flexDirection: 'column'
    }}
    sx={{
      '> a': {
        display: 'block',
        marginBottom: 's',
        paddingRight: 'm',
        '@tablet': {
          width: 'calc(100%/3)'
        },
        '@laptop': {
          width: '100%'
        },
        '&:hover': {
          color: 'viridian.base',
          textDecoration: 'underline'
        }
      }
    }}
    >
      {children}
    </Block>

  
);`;

const blockProps = [
  { prop: 'margin', alias: 'm', usage: 'spacing' },
  { prop: 'marginTop', alias: 'mt', usage: 'spacing' },
  { prop: 'marginRight', alias: 'mr', usage: 'spacing' },
  { prop: 'marginBottom', alias: 'mb | pad', usage: 'spacing' },
  { prop: 'marginLeft', alias: 'ml', usage: 'spacing' },
  { prop: 'marginX', alias: 'mx', usage: 'spacing' },
  { prop: 'marginY', alias: 'my', usage: 'spacing' },
  { prop: 'padding', alias: 'p', usage: 'spacing' },
  { prop: 'paddingTop', alias: 'pt', usage: 'spacing' },
  { prop: 'paddingRight', alias: 'pr', usage: 'spacing' },
  { prop: 'paddingBottom', alias: 'pb', usage: 'spacing' },
  { prop: 'paddingLeft', alias: 'pl', usage: 'spacing' },
  { prop: 'paddingX', alias: 'px', usage: 'spacing' },
  { prop: 'paddingY', alias: 'py', usage: 'spacing' },
  { prop: 'overflow', usage: '' },
  { prop: 'overflowX', usage: '' },
  { prop: 'overflowY', usage: '' },
  { prop: 'display', usage: '' },
  { prop: 'verticalAlign', usage: '' },
  { prop: 'visibility', usage: '' },
  { prop: 'alignItems', usage: '' },
  { prop: 'alignContent', usage: '' },
  { prop: 'justifyItems', usage: '' },
  { prop: 'justifyContent', usage: '' },
  { prop: 'flexWrap', usage: '' },
  { prop: 'flexDirection', usage: '' },
  { prop: 'flex', usage: '' },
  { prop: 'flexGrow', usage: '' },
  { prop: 'flexShrink', usage: '' },
  { prop: 'flexBasis', usage: '' },
  { prop: 'alignSelf', usage: '' },
  { prop: 'order', usage: '' },
  { prop: 'position', usage: '' },
  { prop: 'width', usage: 'element' },
  { prop: 'minWidth', usage: 'element' },
  { prop: 'maxWidth', usage: 'element' },
  { prop: 'height', usage: 'element' },
  { prop: 'minHeight', usage: 'element' },
  { prop: 'maxHeight', usage: 'element' },
  { prop: 'size', usage: 'element' },
  { prop: 'iconSize', usage: '' },
  { prop: 'gridGap', usage: 'spacing' },
  { prop: 'gridColumnGap', usage: 'spacing' },
  { prop: 'gridRowGap', usage: 'spacing' },
  { prop: 'gridColumn', usage: '' },
  { prop: 'gridRow', usage: '' },
  { prop: 'gridAutoFlow', usage: '' },
  { prop: 'gridAutoColumns', usage: '' },
  { prop: 'gridAutoRows', usage: '' },
  { prop: 'gridTemplateColumns', usage: 'layout' },
  { prop: 'gridTemplateRows', usage: 'layout' },
  { prop: 'gridTemplateAreas', usage: '' },
  { prop: 'gridArea', usage: '' },
  { prop: 'snap', usage: 'top, bottom, left, right, all' },
  { prop: 'font', usage: 'typography' },
  { prop: 'fontFamily', usage: '' },
  { prop: 'fontSize', usage: '' },
  { prop: 'fontWeight', usage: '' },
  { prop: 'fontStyle', usage: '' },
  { prop: 'lineHeight', usage: '' },
  { prop: 'letterSpacing', usage: '' },
  { prop: 'textAlign', usage: '' },
  { prop: 'textTransform', usage: '' },
  { prop: 'textDecordation', usage: '' },
  { prop: 'whiteSpace', usage: '' },
  { prop: 'textOverflow', usage: '' },
  { prop: 'border', usage: 'border' },
  { prop: 'borderTop', usage: 'border' },
  { prop: 'borderRight', usage: 'border' },
  { prop: 'borderBottom', usage: 'border' },
  { prop: 'borderX', usage: 'border' },
  { prop: 'borderY', usage: 'border' },
  { prop: 'borderRadius', usage: 'spacing' },
  { prop: 'borderTopLeftRadius', usage: 'spacing' },
  { prop: 'borderTopRightRadius', usage: 'spacing' },
  { prop: 'borderBottomLeftRadius', usage: 'spacing' },
  { prop: 'borderBottomRightRadius', usage: 'spacing' },
  { prop: 'borderBottomWidth', usage: 'spacing' },
  { prop: 'borderLeftWidth', usage: 'spacing' },
  { prop: 'borderRightWidth', usage: 'spacing' },
  { prop: 'borderTopWidth', usage: 'spacing' },
  { prop: 'borderStyle', usage: '' },
  { prop: 'borderTopStyle', usage: '' },
  { prop: 'borderLeftStyle', usage: '' },
  { prop: 'borderRightStyle', usage: '' },
  { prop: 'outline', usage: '' },
  { prop: 'color', usage: 'colors' },
  { prop: 'fill', usage: 'colors' },
  { prop: 'background', usage: 'colors' },
  { prop: 'borderColor', usage: 'colors' },
  { prop: 'borderTopColor', usage: 'colors' },
  { prop: 'borderBottomColor', usage: 'colors' },
  { prop: 'borderLeftColor', usage: 'colors' },
  { prop: 'borderRightColor', usage: 'colors' },
];


const BlockPage = props => (
  <Section
    title="Block"
    anchor="block"
    subtitle="This is the building block of our design system and accepts many built in props"
    {...props}
  >
    <Paragraph pad="m">
      This is the build block of our design system and accepts many built in props. By default these props are styled across all media queries. If you want to target certain devices use sx.
    </Paragraph>

    <Example
      title="Block properties usage"
      text={blockCode}
      pad="m"
    />

    <Heading
      font="title-s-azo"
      pad="m"
    >
      sx | sx$laptop | sx$tablet
    </Heading>

    <Paragraph pad="m">
      In the example above we used sx to add styles that did not come standard in our default props for block. We can also use sx to include selectors or any other css.
    </Paragraph>
    <Paragraph pad="m">
      sx$laptop and sx$tablet are our media queries styles. You can use these to adjust styling for specific tablet and laptop breakpoints. By default all props and sx styles are included in all sizes so if you need to reset certain properties that are not being overidden you can use &apos;intial&apos;. Using the sx$laptop prop and a &apos;@laptop&apos;:&#123;...&#125; in sx are equivilent. See code example
    </Paragraph>


    <Heading
      font="title-s-azo"
      pad="m"
    >
      Default CSS Props
    </Heading>

    <Paragraph pad="m">
      These are all the built-in props that block accepts. If you need to apply styling that is not one of these default props please refer to sx.
      ALL OF THESE PROPERTIES TAKE STANDARD CSS SYNTAX and the usage column denotes any props that can be used with our default spacing, element, layout, color, and typography values.
    </Paragraph>

    <Table pad="m">
      <THead>
        <Tr>
          <Th>Prop</Th>
          <Th>Alias</Th>
          <Th>Usage</Th>
        </Tr>
      </THead>
      <TBody>
        {blockProps.map(key => (
          <Tr>
            <Td>{key.prop}</Td>
            <Td>{key?.alias}</Td>
            <Td>{key.usage}</Td>
          </Tr>
        ))}
      </TBody>
    </Table>


  </Section>
);

export default BlockPage;
