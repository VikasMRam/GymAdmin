import React, { forwardRef } from 'react';

import { get } from 'sly/common/system';
import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import Heading from 'sly/common/system/Heading';
import Paragraph from 'sly/common/system/Paragraph';
import theme from 'sly/common/components/themes/default';

import Section from 'sly/web/styleguide/Section';

const colors = {
  primary: [
    'slate',
    'harvest',
    'viridian',
  ],
  secondary: [
    'yellow',
    'red',
    'green',
    'blue',
  ],
};

const variants = [
  'darker-40',
  'darker-20',
  'base',
  'lighter-20',
  'lighter-40',
  'lighter-60',
  'lighter-80',
  'lighter-90',
  'lighter-95',
];

const ColorCard = forwardRef(({
  color,
  variant,
  ...props
}, ref) => {
  const background = `${color}.${variant}`;
  return (
    <Block ref={ref} {...props}
      border="round"
      borderColor="transparent"
      overflow="hidden"
    >
      <Block
        height={['50px', 'col1']}
        background={background}
      >
      </Block>
      <Block
        sx={{
          background: 'slate.lighter-95',
          color: 'slate.lighter-40',
          p: 'm',
          font: 'body-xs',
          pre: {
            color: 'slate',
            fontSize: '16px',
          }
        }}
      >
        <Paragraph>Name</Paragraph>
        <pre>{background}</pre>
        <Paragraph pt="xs">HEX</Paragraph>
        <pre>{get(theme.palette, background)}</pre>
      </Block>
    </Block>
  );
});

ColorCard.displayName = 'ColorCard';

const Palette = ({ colors, ignore }) => (
  <Grid
    gridTemplateColumns={[
      'repeat(2, 1fr)',
      'repeat(3, 1fr)',
    ]}
    gridTemplateRows="masonry"
    gridGap="gutter"
    pad="xxl"
  >
    {colors.reduce((acc, color) => {
      acc.push(...variants.map((variant, index) => {
        if (ignore(color, variant, index)) {
          return null;
        }

        return (
          <ColorCard
            key={`${color}.${variant}`}
            color={color}
            variant={variant}
          />
        );
      }));

      return acc;
    }, [])}
  </Grid>
);

const ignorePrimary = (color, variant, index) => (
  (variant === 'lighter-95' && color !== 'slate')
            || (color === 'slate' && index <= 1)
);

const ignoreSecondary = (color, variant) => variant === 'lighter-95';

const Colors = () => (
  <Section
    title="Colors"
    anchor="colors"
    subtitle="Color distinguishes our brand and helps us create consistent experiences across products."
  >
    <Heading
      font="title-s-azo"
      mb="xs"
    >
      Primary palette
    </Heading>
    <Paragraph
      font="body-s"
      mb="l"
    >
      Our primary palette is comprised of neutrals, white, and green.
      It is used in in thoughtful ways throughout the product to guide the eye and highlight important information.
    </Paragraph>
    <Palette colors={colors.primary} ignore={ignorePrimary} />

    <Heading
      font="title-s-azo"
      mb="xs"
    >
      Secondary palette
    </Heading>
    <Paragraph
      font="body-s"
      mb="l"
    >
      Our secondary palette contains functional colors to help highlight certain interactions in the user’s journey to be more informative and helpful.
    </Paragraph>
    <Palette colors={colors.secondary} ignore={ignoreSecondary} />
  </Section>
);

export default Colors;
