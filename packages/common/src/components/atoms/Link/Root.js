import styled from 'styled-components';

import {
  withColor,
  withText,
  withSpacing,
  withDisplay,
  withBorder,
  withZIndex,
  withClamping,
  withCursor,
} from 'sly/common/components/helpers';

const Root = styled.a`
  ${withDisplay}
  ${withSpacing}
  ${withText}
  ${withBorder}
  ${withZIndex}
  ${withClamping}
  ${withCursor}

  &, &:active {
    ${withColor}
  }

  &:focus {
    outline: none;
  }
`;

export default Root;
