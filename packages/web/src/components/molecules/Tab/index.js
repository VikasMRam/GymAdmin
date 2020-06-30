import React from 'react';
import { string, func, bool, oneOf, any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import Span from 'sly/web/components/atoms/Span';
import Link from 'sly/web/components/atoms/Link';

const MaybeLink = ({ to, target, children, ...props }) => {
  if (to) {
    return <Link to={to} target={target} {...props}>{children}</Link>;
  }
  return <Span {...props}>{children}</Span>;
};

MaybeLink.propTypes = {
  to: string,
  target: string,
  children: any,
};

const Tab = styled(({
  onClick,
  to,
  target,
  active,
  children,
  ...props
}) => {
  const palette = active
    ? 'primary'
    : 'slate.lighter-30';

  const borderBottom = active
    ? 'xxLarge'
    : 0;

  const paddingBottom = active
    ? '11px'
    : '15px';

  return (
    <MaybeLink
      to={to}
      target={target}
      onClick={onClick}
      active={active}
      palette={palette}
      borderBottom={borderBottom}
      paddingBottom={paddingBottom}
      {...props}
    >
      {children}
    </MaybeLink>
  );
})`
  cursor: pointer;
  display: block;
  list-style: none;
  letter-spacing: 1px;
`;

Tab.propTypes = {
  to: string,
  type: oneOf(['tab', 'menu']),
  target: string,
  active: bool.isRequired,
  children: any.isRequired,
  onClick: func.isRequired,
};

Tab.defaultProps = {
  type: 'tab',
  active: false,
  paddingTop: 'large',
  marginRight: 'xLarge',
  lineHeight: '16px',
  weight: 'bold',
  size: 'tiny',
  borderPalette: 'primary',
};

export const MobileTab = styled(Tab)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

export default Tab;

