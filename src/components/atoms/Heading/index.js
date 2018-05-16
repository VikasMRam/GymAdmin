import React from 'react';
import { string, node, bool, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';

const fontSize = p => size('text', p.level);
const lineHeight = p => size('lineHeight', p.level);

const getLevel = size => {
  switch(size) {
    case 'hero': return 1;
    case 'title': return 2;
    case 'subtitle': return 3;
  }
};

const styles = css`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  // TODO: review this with @jared,
  // for now let's make margin-bottom relative to font-size
  margin: 0 0 calc(${fontSize} * 0.25) 0;
  color: ${palette(0)};
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
  palette: 'slate',
};

export default Heading;
