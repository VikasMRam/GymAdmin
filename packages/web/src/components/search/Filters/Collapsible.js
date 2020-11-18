import React, { forwardRef, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { bool, string, node, object } from 'prop-types';

import { getKey, key } from 'sly/common/components/themes';
import { Icon, Heading } from 'sly/common/components/atoms';
import Block from 'sly/common/components/atoms/Block';
import {
  withDimensions,
  withDisplay,
  withSpacing,
} from 'sly/common/components/helpers';

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
  `,
);

const Collapsible = forwardRef(({
  children,
  title,
  collapsedDefault,
  borderBottom,
  disabled,
  showIf,
  ...props
}, ref) => {
  const [collapsed, setCollapsed] = useState(collapsedDefault);
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
        onClick={!disabled && toggle}
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
  collapsedDefault: bool.isRequired,
  innerRef: object,
  showIf: bool,
  disabled: bool,
  borderBottom: string,
};

Collapsible.defaultProps = {
  collapsedDefault: false,
  showIf: true,
  borderBottom: 'regular',
  disabled: false,
};

export default Collapsible;
