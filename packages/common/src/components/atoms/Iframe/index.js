import styled from 'styled-components';

import Root from './Root';

import {
  withDisplay,
  withText,
  withColor,
  withSpacing,
  withBorder,
  withWidth,
  withHeight,
} from 'sly/common/components/helpers';

export default styled(Root)`
  ${withSpacing}
  ${withText}
  ${withColor}
  ${withBorder}
  ${withWidth}
  ${withHeight}
  ${withDisplay}
`;
// put withDisplay last to make sure that this display styles are always first priority
