// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import styled from 'styled-components';

import Icon from 'sly/components/atoms/Icon';

const LogoIcon = styled(Icon)`
  width: auto;
  height: auto;
`;

const Logo = () => <LogoIcon icon="seniorlyLogo" size="xxLarge" />;

export default Logo;
