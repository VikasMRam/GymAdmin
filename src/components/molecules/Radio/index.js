import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';

import { Icon } from 'sly/components/atoms';

export const StyledIcon = styled(Icon)`
  svg {
    #circle {
      display: ${ifProp('checked', 'block', 'none')};
      fill: ${palette('secondary', 0)};
    }
    #box {
      stroke: ${palette('grayscale', 2)};
    }
  }
`;

const Checkbox = props => <StyledIcon icon="radio" {...props} />;

Checkbox.propTypes = {
  checked: bool.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;

