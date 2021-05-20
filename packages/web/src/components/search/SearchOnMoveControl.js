import React from 'react';
import { bool, func } from 'prop-types';

import Box from 'sly/common/components/atoms/Box';
import Block from 'sly/common/components/atoms/Block';
import Checkbox from 'sly/web/components/molecules/Checkbox';
import { CheckboxButton } from 'sly/common/system';


const SearchOnMoveControl = ({ onClick, active, ...props }) => (
  <CheckboxButton onClick={onClick} value={active} {...props} >
    Search as map moves
  </CheckboxButton>
);

SearchOnMoveControl.propTypes = {
  onClick: func,
  active: bool,
};

SearchOnMoveControl.defaultProps = {
  background: 'white',
  padding: 's',
  margin: 'm l',
  shadowBlur: 'regular',
  shadowVOffset: 'small',
  shadowPalette: 'black.base',
  shadowPaletteOpacity: 20,
};

export default SearchOnMoveControl;
