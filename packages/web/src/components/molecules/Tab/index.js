import React from 'react';
import { string, func, bool, oneOf, any } from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import Span from 'sly/web/components/atoms/Span';
import Link from 'sly/web/components/atoms/Link';

const Wrapper = styled.li`
  cursor: pointer;
  display: inline-block;
  list-style: none;
  padding-bottom: calc(${size('spacing.large')} - ${size('border.xxLarge')});
  margin-right: ${size('spacing.xLarge')};
  background-color: ${palette('white', 'base')};

  ${p => p.active && css`
    border-bottom: ${size('border', 'xxLarge')} solid ${palette('primary', 'base')};
  `}
`;

const MaybeLink = ({ to, target, children }) => {
  if (to) {
    return <Link to={to} target={target}>{children}</Link>;
  }
  return children;
};

const Tab = ({
  onClick,
  to,
  target,
  active,
  children,
  className,
}) => {
  const palette = active
    ? 'primary'
    : 'slate.lighter-30';

  return (
    <Wrapper
      onClick={onClick}
      active={active}
      className={className}
    >
      <MaybeLink to={to} target={target}>
        <Span weight="bold" size="tiny" palette={palette}>
          {children}
        </Span>
      </MaybeLink>
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

export const MobileTab = styled(Tab)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

