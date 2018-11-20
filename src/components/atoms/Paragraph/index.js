import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const Paragraph = ({ ...props }) => {
  return <ParaWrapper {...props}>{props.children}</ParaWrapper>;
};

const ParaWrapper = styled.p`
  color: ${palette('base')};
  font-size: ${size('text.body')};
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;

Paragraph.propTypes = {
  palette: PropTypes.string,
};

Paragraph.defaultProps = {
  palette: 'slate',
};

export default Paragraph;
