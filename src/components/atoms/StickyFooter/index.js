import React from 'react';
import styled from 'styled-components';
import { node, bool, string } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette, key } from 'sly/components/themes';

const getSize = type => p => size(type, p.paddingSize);

const FullWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${palette('white', 'base')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  z-index: ${key('zIndexes.stickySections')};
  padding: ${getSize('spacing')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: ${ifProp('showInBigScreen', 'block', 'none')};
  }
`;

const StickyFooter = ({ children, ...props }) => <FullWrapper {...props}>{children}</FullWrapper>;

StickyFooter.propTypes = {
  children: node.isRequired,
  showInBigScreen: bool,
  paddingSize: string,
};

StickyFooter.defaultProps = {
  showInBigScreen: false,
  paddingSize: 'large',
};

export default StickyFooter;
