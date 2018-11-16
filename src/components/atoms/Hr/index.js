import React from 'react';
import { string, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const HRStyled = styled.hr`
  border: 0;
  padding: 0;
  margin: 0;
  margin-bottom: ${size('spacing.xLarge')};
  border-top: 1px solid ${palette('slate', 'filler')};
  
  ${ifProp('fullWidth', css`
    // Hacky way to implement a Hr beyond the fixed width container
    width: 100vw;
    margin-left: calc(-50vw + 50%);
  `)};
`;

const Hr = props => <HRStyled {...props} />;

Hr.propTypes = {
  palette: string,
  fullWidth: bool,
};

Hr.defaultProps = {
  palette: 'slate',
};

export default Hr;
