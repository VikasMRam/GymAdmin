/* eslint react/prop-types: 0 */
import React, { forwardRef } from 'react';
import styled from 'styled-components';

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
  withShadowOnHover,
  withMedia,
} from 'sly/common/components/helpers';

const Block = styled(forwardRef(({ showIf, ...props }, ref) => {
  if (!showIf) {
    return null;
  }
  return <Root ref={ref} {...props} />;
}))`
  ${withMedia}
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
  ${withShadowOnHover}
  ${withWidth}
  ${withHeight}
  // put withDisplay after other styles for applied display styles to have more priority
  ${withDisplay}
  // put withMedia first for media query styles to have first priority
`;

Block.propTypesList = [
  // spacing
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
  'variation',
  'backgroundVariation',

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
  // shadow
  'shadowHOffset',
  'shadowVOffset',
  'shadowBlur',
  'shadowSpread',
  'shadowPalette',
  // shadowOnHover
  'shadowOnHoverHOffset',
  'shadowOnHoverVOffset',
  'shadowOnHoverBlur',
  'shadowOnHoverSpread',
  'shadowOnHoverPalette',
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
  // misc
  '_css',
  'className',
  'clamped',
  'cursor',

  /** *********
   *
   * whitelist
   *
   *********** */

  // color
  'palette',
  'background',
  // spacing
  'pad', // marginBottom shorthand
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

  // text
  'font',

  // media
  'upTo',
  'upToMobile',
  'upToTablet',
  'upToLapTop',
  'startingWith',
  'startingWithMobile',
  'startingWithTablet',
  'startingWithLapTop',

  // misc
  'overflow',
  'width',
  'height',
];

Block.defaultProps = {
  showIf: true,
  display: 'block',
};

Block.filterBlockProps = (props) => {
  const blockProps = {};
  const rest = {};
  const propNames = Object.keys(props);
  for (let i = 0; i <= propNames.length; i++) {
    const propName = propNames[i];
    if (!propName) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (Block.propTypesList.includes(propName)) {
      blockProps[propName] = props[propName];
    } else {
      rest[propName] = props[propName];
    }
  }
  return [blockProps, rest];
};

export default Block;
