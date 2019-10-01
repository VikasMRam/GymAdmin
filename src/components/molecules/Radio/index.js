import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

export const StyledIcon = styled(Icon)`
  svg {
    #circle {
      display: ${ifProp('checked', 'block', 'none')};
      fill: ${p => palette(p.palette, 'base')};
    }
    #box {
      stroke: ${palette('slate', 'stroke')};
    }
  }
`;

const Radio = props => <StyledIcon icon="radio" {...props} />;

Radio.propTypes = {
  checked: bool.isRequired,
  palette: string,
};

Radio.defaultProps = {
  checked: false,
  palette: 'primary',
};

export default Radio;

