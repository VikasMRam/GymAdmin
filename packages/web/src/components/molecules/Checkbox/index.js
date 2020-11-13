import React from 'react';
import { bool, string } from 'prop-types';

import { Icon } from 'sly/common/components/atoms';

const Checkbox = ({ checked, palette, ...props }) => (
  <Icon
    icon={checked ? 'checkbox' : 'checkbox-empty'}
    palette={palette}
    {...props}
  />
);

Checkbox.propTypes = {
  checked: bool.isRequired,
  palette: string,
};

Checkbox.defaultProps = {
  checked: false,
  palette: 'primary',
};

export default Checkbox;
