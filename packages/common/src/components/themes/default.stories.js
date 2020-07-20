/* eslint-disable key-spacing,no-multi-spaces */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { key } from 'sly/common/components/themes';
import theme from 'sly/common/components/themes/default';
// todo: common heading after the atom is refactored
import { Heading } from 'sly/web/components/atoms';

const oldPalette = {
  slate    : ['#384c57'],
  white    : ['#fff'],
  black    : ['#000000'],
  secondary: ['#2f8fcb', '#2483be', '#63abd8', '#e1eaef'],
  primary  : ['#7ccdcc', '#65c0bf', '#b0e1e0', '#f4ffff'],
  grayscale: ['#8f9ca4', '#9ca8af', '#c5d0d5', '#f2f6f7', '#68747a'],
  danger   : ['#cc5663'],
  facebook : ['#4568b2'],
};

const Wrapper = styled.div`
  margin: 1rem;
`;

const Colors = styled(({ colors, className }) => (
  <div className={className}>
    {Object.entries(colors).map(([i, color]) => (
      <Color color={color}>
        <div>
          {i}
          <br />
          {color}
        </div>
      </Color>
    ))}
  </div>
))`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const Color = styled.div`
  background: ${prop('color')};
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    font-size: 0.65rem;
    font-family: ${key('fonts.pre')};
    color: white;
    text-shadow: 1px 1px 2px black;
  }
`;

const types = ['darker-30', 'darker-15', 'base', 'lighter-30', 'lighter-60', 'lighter-90', 'lighter-95'];

const pickColors = colors => types.reduce((cumul, type) => {
  // eslint-disable-next-line no-param-reassign
  cumul[type] = colors[type];
  return cumul;
}, {});

storiesOf('Theme', module)
  .add('palette', () => (
    <Wrapper>
      <Heading level="title">New Palete</Heading>
      {Object.entries(theme.palette)
        .map(([key, colors]) => (
          <>
            <Heading level="subtitle">{key}</Heading>
            <Colors colors={pickColors(colors)} />
          </>
        ))
      }
      <div>
        <pre>
          grayscale 0, 1 = grayscale filler{'\n'}
          grayscale 2 = grayscale stroke{'\n'}
          grayscale 3 = grayscale background{'\n'}
        </pre>
      </div>
      <Heading level="title">Old Palete</Heading>
      {Object.entries(oldPalette)
        .map(([key, colors]) => (
          <>
            <Heading level="subtitle">{key}</Heading>
            {/* eslint-disable-next-line no-return-assign, no-sequences */}
            <Colors colors={colors.reduce((c, v, i) => (c[i] = v, c), {})} />
          </>
        ))
      }
    </Wrapper>
  ));
