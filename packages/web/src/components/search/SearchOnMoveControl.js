import React from 'react';
import { bool, func } from 'prop-types';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'sly/common/components/themes/default';
import Box from 'sly/common/components/atoms/Box';
import Block from 'sly/common/components/atoms/Block';
import Checkbox from 'sly/web/components/molecules/Checkbox';

const SearchOnMoveControl = ({ onClick, active }) => (
  <Box
    background="white"
    padding="medium"
    margin={['large', 'xLarge']}
    shadowBlur="small"
    shadowSpread="tiny"
    shadowVOffset="small"
  >
    <Block display="flex" onClick={onClick} cursor="pointer">
      <Checkbox checked={active} marginRight="medium" /><Block size="caption">Search as map moves</Block>
    </Block>
  </Box>
);

SearchOnMoveControl.propTypes = {
  onClick: func,
  active: bool,
};

export default SearchOnMoveControl;
