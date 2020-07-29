import React from 'react';
import styled from 'styled-components';

import Svg from './svg/seniorlyLogo-regular.svg';

import {
  withDisplay,
  withText,
  withColor,
} from 'sly/common/components/helpers';

// style inheritance from parent won't work as in web.
// Hence apply styles like color directly
const StyledSvg = styled(Svg)`
  ${withText}
  ${withColor}
  ${withDisplay}
`;

const Logo = props => <StyledSvg {...props} />;

export default Logo;
