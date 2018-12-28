// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import Icon from 'sly/components/atoms/Icon';

const LogoIcon = styled(Icon)`
  width: auto;
  height: auto;
`;

const Logo = ({ variant }) => <LogoIcon icon={`seniorlyLogo${variant ? `-${variant}` : ''}`} size="xxLarge" />;

Logo.propTypes = {
  variant: string,
};

export default Logo;
