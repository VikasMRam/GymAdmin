import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

export const StyledIcon = styled(Icon)`
  svg {
    #check {
      display: ${ifProp('checked', 'block', 'none')};
      fill: ${palette('white', 'base')};
    }
    #box {
      stroke: ${palette('slate', 'stroke')};
    }
    color: ${ifProp('checked', palette('secondary', 0), palette('white', 'base'))};
  }
`;

const Checkbox = props => <StyledIcon icon="checkbox" {...props} />;

Checkbox.propTypes = {
  checked: bool.isRequired,
};

Checkbox.defaultProps = {
  checked: false,
};

export default Checkbox;
