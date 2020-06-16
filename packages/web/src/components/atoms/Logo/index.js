// https://github.com/diegohaz/arc/wiki/Example-components#icon
import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import Icon from 'sly/web/components/atoms/Icon';

const LogoIcon = styled(Icon)`
  width: auto;
  height: auto;
`;

const Logo = ({ palette, variation }) => <LogoIcon icon="seniorlyLogo" palette={palette} variation={variation} size="xxLarge" />;

Logo.propTypes = {
  palette: string,
  variation: string,
};

Logo.defaultProps = {
  palette: 'primary',
  variation: 'base',
};

export default Logo;
