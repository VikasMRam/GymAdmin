import React from 'react';
import { bool, func } from 'prop-types';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'sly/common/components/themes/default';
import Box from 'sly/common/components/atoms/Box';
import Block from 'sly/common/components/atoms/Block';
import Checkbox from 'sly/web/components/molecules/Checkbox';

const SearchOnMoveControl = ({ onClick, active, ...props }) => (
  <Box {...props}>
    <Block display="flex" onClick={onClick} cursor="pointer">
      <Checkbox checked={active} marginRight="medium" palette={active ? 'primary' : 'grey'} />
      <Block size="caption">Search as map moves</Block>
    </Block>
  </Box>
);

SearchOnMoveControl.propTypes = {
  onClick: func,
  active: bool,
};

SearchOnMoveControl.defaultProps = {
  background: 'white',
  padding: 'medium',
  margin: ['large', 'xLarge'],
  shadowBlur: 'regular',
  shadowVOffset: 'small',
  shadowPalette: 'black.base',
  shadowPaletteOpacity: 20,
};

export default SearchOnMoveControl;
