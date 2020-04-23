import React from 'react';
import { string, node } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { text as textPropType } from 'sly/propTypes/text';

const Paragraph = ({ children, ...props }) => {
  return <ParaWrapper {...props}>{children}</ParaWrapper>;
};

const ParaWrapper = styled.p`
  color: ${palette('base')};
  font-size: ${p => size('text', p.size)};
  line-height: 1.5;
  margin: 0 0 ${p => size('spacing', p.marginBottom)} 0;
`;

Paragraph.propTypes = {
  palette: string,
  children: node,
  size: textPropType,
};

Paragraph.defaultProps = {
  palette: 'slate',
  size: 'body',
  marginBottom: 'xLarge',
};

export default Paragraph;
