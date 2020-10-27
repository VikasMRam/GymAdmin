import React from 'react';
import styled from 'styled-components';
import { bool, oneOfType } from 'prop-types';

import Root from './Root';

import {
  withDisplay,
  withText,
  withElementSize,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
  withOverflow,
  withCursor,
  withWidth,
  withHeight,
  withShadow,
  withCss,
  withMedia,
} from 'sly/common/components/helpers';

const Block = styled(({ showIf, ...props }) => {
  if (!showIf) {
    return null;
  }
  return <Root {...props} />;
})`
  ${withSpacing}
  ${withText}
  ${withElementSize}
  ${withColor}
  ${withBorder}
  ${withSnap}
  ${withAlign}
  ${withClamping}
  ${withCursor}
  ${withOverflow}
  ${withShadow}
  ${withWidth}
  ${withHeight}
  // put withDisplay after other styles for applied display styles to have more priority
  ${withDisplay}
  ${withCss}
  // put withMedia first for media query styles to have first priority
  ${withMedia}
`;

Block.propTypesList = [
  // spacing
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'pad',
  'horizontalGutter',
  'verticalGutter',
  // text
  'size',
  'weight',
  'lineHeight',
  'textDecoration',
  'textTransform',
  // element
  'elementSize',
  // color
  'palette',
  'variation',
  'background',
  'backgroundVariation',
  'border',
  'borderPalette',
  'borderVariation',
  // border
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'borderPalette',
  'borderVariation',
  'borderRadius',
  // snap
  'snap',
  // skipping align because it will dissapear in favour of display
  // misc
  'clamped',
  'cursor',
  'overflow',
  'width',
  'height',
  // shadow
  'shadowHOffset',
  'shadowVOffset',
  'shadowBlur',
  'shadowSpread',
  'shadowPalette',
  'css',
  // display
  'display',
  'block',
  'flex',
  'justifyContent',
  'alignItems',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'flexWrap',
  'order',
  'visibility',
  // media
  'upTo',
  'upToMobile',
  'upToTablet',
  'upToLapTop',
  'startingWith',
  'startingWithMobile',
  'startingWithTablet',
  'startingWithLapTop',
];

Block.defaultProps = {
  showIf: true,
  display: 'block',
};

Block.filterBlockProps = (props) => {
  const blockProps = {};
  const rest = {};
  const propNames = Object.keys(props);
  for (let i = 0; i <= Block.propTypesList.length; i++) {
    const propName = Block.propTypesList[i];
    if (propNames.includes(propName)) {
      blockProps[propName] = props[propName];
    } else {
      rest[propName] = props[propName];
    }
  }
  return [blockProps, rest];
};

export default Block;
