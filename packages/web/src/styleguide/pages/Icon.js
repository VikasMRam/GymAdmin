import React from 'react';
import { arrayOf, string } from 'prop-types';

import Block from 'sly/common/system/Block';
import Grid from 'sly/common/system/Grid';
import { ICONS } from 'sly/common/icons/constants';
import Chevron from 'sly/common/icons/Chevron';
import Toggle from 'sly/common/icons/Toggle';
import ArrowDrop from 'sly/common/icons/ArrowDrop';
import Radio from 'sly/common/icons/Radio';
import CircleStroke from 'sly/common/icons/CircleStroke';
import Favorite from 'sly/common/icons/Favorite';
import Star from 'sly/common/icons/Star';
import { ComponentHeading, VariantHeading, VariantParagraph } from 'sly/web/styleguide/Component';
import { Cases, Case } from 'sly/web/styleguide/Case';
import Section from 'sly/web/styleguide/Section';
import Props from 'sly/web/styleguide/Props';
import Example from 'sly/web/styleguide/Example';
import Checkbox from 'sly/common/icons/Checkbox';


const generalIconUsage = `const Component = () => (
  <>
    <Chevron color="viridian.base" />
    <Star color="viridian.base" size="l" />
    <Toggle color="viridian.base" size="xl" />
  </>
);`;

const iconRotationExample = `const Component = () => (
  <>
    <Chevron size="l" color="viridian.base" />
    <Chevron size="l" rotation="90" color="viridian.base" />
    <Chevron size="l" rotation="180" color="viridian.base" />
    <Chevron size="l" rotation="270" color="viridian.base" />
    <Toggle size="l" color="viridian.base" />
    <Toggle size="l" rotation="180" color="viridian.base" />
    <ArrowDrop size="l" />
    <ArrowDrop size="l" rotation="180" color="viridian.base" />
  </>
);`;

const radioCheckboxIconExample = `const Component = () => (
  <>
    <Radio
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
    />
    <Checkbox
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
    />
    />
    <Radio
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
    />
    <Checkbox
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
    />
    <Radio
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
      active
    />
    <Checkbox
      size="l"
      hoverColor="viridian.lighter-90"
      color="viridian.base"
      active
    />
  </>
);`;

const activeIconsExample = `const Component = () => (
  <>
    <CircleStroke size="l" color="viridian.base" />
    <CircleStroke size="l" color="viridian.base" active />
    <Star size="l" color="viridian.base" />
    <Star size="l" color="viridian.base" active />
    <Favorite size="l" color="viridian.base" />
    <Favorite size="l" color="viridian.base" active />
  </>
);`;


const Icons = ({ icons, ...props }) => (
  <Grid
    gridTemplateColumns={[
      'repeat(2, 1fr)',
      'repeat(3, 1fr)',
      'repeat(6, 1fr)',
    ]}
    gridGap="gutter"
    {...props}
  >
    {icons.map(([iconName]) => {
      const Icon = require(`../../../../common/src/icons/${iconName}`).default;
      // const Icon = Ac.default;
      return (
        <Block
          title={iconName}
        >
          <Block
            key={iconName}
            sx={{
              position: 'relative',
              paddingTop: '100%',
              height: 0,
              width: '100%',
            }}
          >
            <Block
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'viridian.base',
                background: 'slate.lighter-95',
                '--hover-color': 'viridian.lighter-90',
                '--active-color': 'viridian.base',
              }}
            >
              <Icon size="l" />
              <Block
                sx={{
                  font: 'body-s',
                  mt: 'm',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '90%',
                }}
              >
                {iconName}
              </Block>
            </Block>
          </Block>
        </Block>
      );
  })}
  </Grid>
);

Icons.propTypes = {
  icons: arrayOf(arrayOf(string)),
};

Icons.defaultProps = {
  icons: [],
};

const IconPage = () => {
  return (
    <Section
      title="Icon"
      anchor="icon"
      subtitle="Renders an SVG icon."
    >

      <ComponentHeading>
        Icon
      </ComponentHeading>

      <VariantHeading>
        {'<Icon />'}
      </VariantHeading>

      <VariantParagraph>
        Use Icons to give context to a text, will help users to remember where things are. Not all of the following props can be used on all Icons.
      </VariantParagraph>


      <Cases>
        <Case  name="Chevron">
          <Chevron color="viridian.base" />
        </Case>
        <Case  name="Star">
          <Star color="viridian.base" size="l" />
        </Case>
        <Case  name="Toggle">
          <Toggle color="viridian.base" size="xl" />
        </Case>
      </Cases>
      <Props props={{
        size: [
          's: 20px, m:24px, l: 32px,  xl:  40px, xxl:  48px', 'm'],
        color: ['a color from our palette', 'currentColor'],
      }}
      />
      <Example title="General Icon Usage" text={generalIconUsage} />


      <ComponentHeading>
        Icons with Rotation
      </ComponentHeading>
      <Cases>
        <Case  name="Chevron">
          <Chevron size="l" color="viridian.base" />
        </Case>
        <Case name="Rotate">
          <Chevron size="l" color="viridian.base" rotation="90" />
          <Chevron size="l" color="viridian.base" rotation="180" />
          <Chevron size="l" color="viridian.base" rotation="270" />
        </Case>
        <Case name="Toggle">
          <Toggle size="l" color="viridian.base" />
        </Case>
        <Case name="Rotate">
          <Toggle size="l" color="viridian.base" rotation="180" />
        </Case>
        <Case name="ArrowDrop">
          <ArrowDrop size="l" color="viridian.base" />
        </Case>
        <Case name="Rotate">
          <ArrowDrop size="l" color="viridian.base" rotation="180" />
        </Case>
      </Cases>

      <Props props={{
        rotation: ['in degrees for Arrow, Chevron and Toggle'],
      }}
      />
      <Example title="Example of usage of Icon with rotation" text={iconRotationExample} />


      <ComponentHeading>
        Radio & Checkbox Icon
      </ComponentHeading>
      <Cases>
        <Case name="default">
          <Radio
            size="l"
            hoverColor="viridian.lighter-90"
            color="viridian.base"
          />
          <Checkbox
            size="l"
            hoverColor="viridian.lighter-90"
            color="viridian.base"
          />
        </Case>
        <Case name="hover">
          <Radio
            size="l"
            sx={{
              '--hover-color': 'viridian.lighter-90',
            }}
            color="viridian.base"
          />
          <Checkbox
            size="l"
            sx={{
              '--hover-color': 'viridian.lighter-90',
            }}
            color="viridian.base"
          />
        </Case>
        <Case name="selected">
          <Radio
            size="l"
            hoverColor="viridian.lighter-90"
            color="viridian.base"
            active
          />
          <Checkbox
            size="l"
            hoverColor="viridian.lighter-90"
            color="viridian.base"
            active
          />
        </Case>
      </Cases>
      <Props props={{
        hoverColor: ['a color from our palette'],
        active: ['boolean, true of false', false],
      }}
      />
      <Example title="Example of usage of Icon radio and checkbox buttons" text={radioCheckboxIconExample} />

      <Cases>
        <Case name="CircleStroke">
          <CircleStroke size="l" color="viridian.base" />
          <CircleStroke
            size="l"
            color="viridian.base"
            active
          />
        </Case>
        <Case name="Star">
          <Star size="l" color="viridian.base" />
          <Star size="l" color="viridian.base" active />
        </Case>
        <Case name="Favorite">
          <Favorite size="l" color="viridian.base" />
          <Favorite size="l" color="viridian.base" active />
        </Case>
      </Cases>
      <Props props={{
        active: ['boolean, true of false', false],
      }}
      />
      <Example title="Example of usage of Icon radio buttons" text={activeIconsExample} />


      <Icons id="icons" icons={ICONS} />

    </Section>
  );
};

export default IconPage;
