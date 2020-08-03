import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

import { palette } from 'sly/common/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import {
  withDisplay,
  withText,
} from 'sly/common/components/helpers';

// style inheritance from parent won't work as in web.
// Hence apply styles like color directly
const StyledSvg = styled(Image)`
  ${withText}
  tintColor: ${palette('base')};
  ${withDisplay}
`;

const Logo = props => (
  <StyledSvg
    {...props}
    source={require('./svg/seniorlyLogo-regular.svg')}
  />
);

Logo.propTypes = {
  palette: palettePropType,
};

Logo.defaultProps = {
  palette: 'primary',
};

export default Logo;
