import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { bool, string, node, object } from 'prop-types';

import { getKey, key, size } from 'sly/common/components/themes';
import { Icon, Heading } from 'sly/common/components/atoms';
import Block from 'sly/common/components/atoms/Block';
import {
  withDimensions,
  withDisplay,
  withSpacing,
} from 'sly/common/components/helpers';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';

const Header = styled.div(
  withSpacing,
  withDisplay,
  css`
    transition: padding-bottom ${key('transitions.default')};
  `,
);

Header.defaultProps = {
  display: 'flex',
};

const Content = styled.div(
  withDimensions,
  css`
    box-sizing: border-box;
    overflow: hidden;
    transition: height ${key('transitions.default')};
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      width: auto;
      display: grid;
      grid-template-columns: 50% 50%;
    }
  `,
);

const Collapsible = forwardRef(({
  children,
  title,
  borderBottom,
  disabled,
  showIf,
  ...props
}, ref) => {
  const [userCollapsed, setCollapsed] = useState(null);
  const breakpoint = useBreakpoint();
  const collapsed = useMemo(() => {
    if (userCollapsed === null) {
      return !breakpoint?.atLeastTablet();
    }
    return userCollapsed;
  }, [userCollapsed, breakpoint]);
  const [height, setHeight] = useState(null);
  const contentRef = useCallback((element) => {
    if (element?.scrollHeight) {
      setHeight(element.scrollHeight);
    }
  }, []);
  const toggle = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  if (!showIf) {
    return null;
  }

  return (
    <Block
      ref={ref}
      borderBottom={!disabled && borderBottom}
    >
      <Header
        onClick={(!disabled && toggle) || null}
        paddingTop="xLarge"
        paddingBottom={collapsed ? 'xLarge' : 'medium'}
      >
        <Heading
          weight="medium"
          size="body"
          clamped
          pad={0}
        >
          {title}
        </Heading>
        {!disabled && <Icon
          marginLeft="auto"
          icon="chevron"
          palette="slate"
          rotate={1}
          flip={!collapsed}
        />}
      </Header>
      <Content
        ref={contentRef}
        height={collapsed ? '0px' : height}
        {...props}
      >
        {children}
      </Content>
    </Block>
  );
});

Collapsible.displayName = 'Collapsible';

Collapsible.propTypes = {
  children: node,
  title: string.isRequired,
  innerRef: object,
  showIf: bool,
  disabled: bool,
  borderBottom: string,
};

Collapsible.defaultProps = {
  showIf: true,
  borderBottom: 'regular',
  disabled: false,
};

export default Collapsible;
