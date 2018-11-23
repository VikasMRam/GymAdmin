import React from 'react';
import { string, node } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';

const Paragraph = ({ children, ...props }) => {
  return <ParaWrapper {...props}>{children}</ParaWrapper>;
};

const ParaWrapper = styled.p`
  color: ${palette('base')};
  font-size: ${size('text.body')};
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;

Paragraph.propTypes = {
  palette: string,
  children: node,
};

Paragraph.defaultProps = {
  palette: 'slate',
};

export default Paragraph;
