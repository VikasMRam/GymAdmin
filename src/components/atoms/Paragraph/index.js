import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';

const Paragraph = ({ ...props }) => {
  return <ParaWrapper {...props}>{props.children}</ParaWrapper>;
};
const ParaWrapper = styled.p`
  color: ${palette(0)};
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
