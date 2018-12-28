import React from 'react';
import { bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { palette as palettePropType } from 'sly/propTypes/palette';

const getColor = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const HRStyled = styled.hr`
  border: 0;
  padding: 0;
  margin: ${size('spacing.xLarge')} 0;
  border-top: 1px solid ${getColor};

  ${ifProp('fullWidth', css`
    // Hacky way to implement a Hr beyond the fixed width container
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  `)};
`;

const Hr = props => <HRStyled {...props} />;

Hr.propTypes = {
  palette: palettePropType,
  fullWidth: bool,
  variation: variationPropType,
};

Hr.defaultProps = {
  palette: 'slate',
  variation: 'stroke',
};

export default Hr;
