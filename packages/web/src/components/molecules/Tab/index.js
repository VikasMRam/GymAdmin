import React from 'react';
import { string, func, bool, oneOf, any } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Span from 'sly/components/atoms/Span';
import Link from 'sly/components/atoms/Link';

const Wrapper = styled.li`
  cursor: pointer;
  display: inline-block;
  list-style: none;
  padding-bottom: calc(${size('spacing.large')} - ${size('border.xxLarge')});
  margin-right: ${size('spacing.xLarge')};
  background-color: ${palette('white', 'base')};

  ${p => p.active && css`
    border-bottom: ${size('border', 'xxLarge')} solid ${palette('slate', 'base')};
  `}
`;

const Tab = ({
  onClick,
  to,
  target,
  active,
  children,
  className,
}) => {
  let spanPalette = 'slate';
  let spanVariation = 'filler';
  if (active) {
    spanPalette = 'slate';
    spanVariation = 'base';
  }
  const content = (
    <Span weight="bold" size="tiny" palette={spanPalette} variation={spanVariation}>
      {children}
    </Span>
  );

  return (
    <Wrapper
      onClick={onClick}
      active={active}
      className={className}
    >
      {to && <Link target={target} to={to}>{content}</Link>}
      {!to && content}
    </Wrapper>
  );
};

Tab.propTypes = {
  to: string,
  type: oneOf(['tab', 'menu']),
  target: string,
  active: bool.isRequired,
  children: any.isRequired,
  onClick: func.isRequired,
  className: string,
};

Tab.defaultProps = {
  type: 'tab',
  active: false,
};

export default Tab;
