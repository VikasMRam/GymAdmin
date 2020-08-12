import React from 'react';
import { oneOf, node, arrayOf, oneOfType, string, number } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import Block from 'sly/common/components/atoms/Block';

const generateItemDimensions = ({ children, dimensions = [] }) => {
  // equally divide if no dimensions given
  if (children.length && !dimensions.length) {
    const ew = (100 / children.length).toFixed(2);
    dimensions = Array(children.length).fill(`${ew}%`);
  }

  return dimensions.join(' ');
};

const getGap = ({ gap }) => size('spacing', gap);

const StyledBlock = styled(Block)`
  ${ifProp({ flow: 'column' }, css`
    grid-template-columns: ${generateItemDimensions};
  `)}
  ${ifProp('gap', css`
    grid-gap: ${getGap};
  `)}
`;

const Grid = props => <StyledBlock {...props} />;

Grid.propTypes = {
  flow: oneOf(['row', 'column']).isRequired,
  children: node.isRequired,
  dimensions: arrayOf(oneOfType([string, number])).isRequired,
};

Grid.defaultProps = {
  display: 'grid',
  flow: 'column',
  dimensions: [],
};

export default Grid;
