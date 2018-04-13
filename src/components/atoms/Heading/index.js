import React from 'react';
import { string, node, bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';

const fontSize = p => size('text', p.size);
const lineHeight = p => size('lineHeight', p.size);

const getLevel = size => {
  switch(size) {
    case 'hero': return 1;
    case 'title': return 2;
    case 'subtitle': return 3;
  }
};

const styles = css`
  font-weight: 700;
  font-size: ${fontSize};
  line-height: ${lineHeight};
  margin: 0;
  color: ${palette({ grayscale: 0 }, 1)};
`;

const Heading = styled(({
  level, children, reverse, palette, theme, ...props
}) =>
  React.createElement(`h${getLevel(level)}`, props, children))`
  ${styles};
`;

Heading.propTypes = {
  level: oneOf(['hero', 'title', 'subtitle']),
  children: node,
  palette: string,
  reverse: bool,
};

Heading.defaultProps = {
  level: 'title',
  palette: 'grayscale',
};

export default Heading;
