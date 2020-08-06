import React from 'react';
import { node } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import {
  withDisplay,
  withText,
  withColor,
  withSpacing,
  withBorder,
  withAlign,
  withSnap,
  withClamping,
  withCursor,
  withWidth,
} from 'sly/common/components/helpers';

const Hr = styled.hr`
  ${withColor}
  ${withBorder}
  ${withAlign}
  ${withSnap}
  ${withClamping}
  ${withSpacing}
  ${withWidth}
  ${withDisplay}
  ${withCursor}
  ${withText}

  border-bottom: 0;
  border-left: 0;
  border-right: 0;

  ${ifProp('fullWidth', css`
    // Hacky way to implement a Hr beyond the fixed width container
    width: 98.5vw;
    margin-left: calc(-50vw + 50%);
  `)};
`;

// hr tag in HTML is void tag, hence don't pass children prop
const Root = ({ children, ...props }) => <Hr {...props} />;

Root.propTypes = {
  children: node,
};

export default Root;
