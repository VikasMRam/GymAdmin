import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { bool, string, node, object } from 'prop-types';

import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import { Block, sx$tablet, Heading } from 'sly/common/system';
import { Chevron } from 'sly/common/icons';

const Header = styled(Block)`
    transition: padding-bottom 0.2s ease-out;
  `;

Header.defaultProps = {
  display: 'flex',
};

const Content = styled(Block)`
    box-sizing: border-box;
    overflow: hidden;
    transition: height 0.2s ease-out;
    ${sx$tablet({
    width: 'auto',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
  })}
  `;

const Collapsible = forwardRef(({
  children,
  title,
  borderBottom,
  borderColor,
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
      borderColor={borderColor}
    >
      <Header
        onClick={(!disabled && toggle) || null}
        paddingTop="l"
        paddingBottom={collapsed ? 'l' : 's'}
      >
        <Heading
          font="title-xs-azo"
          overflow="hidden"
          textOverflow="ellipsis"
          maxWidth="100%"
          pad={0}
        >
          {title}
        </Heading>
        {!disabled && <Chevron
          marginLeft="auto"
          color="slate"
          rotation={collapsed ? 180 : null}
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
  borderBottom: 's',
  borderColor: 'slate.lighter-90',
  disabled: false,
};

export default Collapsible;
