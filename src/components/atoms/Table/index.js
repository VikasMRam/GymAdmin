import React from 'react';
import styled, { css } from 'styled-components';
import { node, bool, string } from 'prop-types';
import { switchProp, ifProp, ifNotProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import Block from 'sly/components/atoms/Block';
import Icon from 'sly/components/atoms/Icon';

export const Table = styled.table`
  display: block;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table;
    
    border-collapse: collapse;
    width: 100%;
    position: relative;
    margin-bottom: ${size('spacing.large')};
    
    td, th {
      white-space: nowrap;
    }

    th:first-child, td:first-child {
      left: 0;
      position: sticky;
      top: auto;
    }
  }
`;

export const THead = styled.thead`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-header-group;
  }
`;

export const TBody = 'tbody';

export const Tr = styled.tr`
  display: block;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-row; 
  }
`;

const disabledWrapperStyles = css`
  background-color: ${palette('white', 'base')};
  ${ifProp('disabled', css`
  background-color: ${palette('grey', 'background')};
  `)}
`;

const textIconStyles = css`
  ${switchProp('kind', {
    textIcon: css`
      display: flex;
      align-items: center;
      max-width: unset;`,
  })};
`;

export const Td = styled.td`
  display: block;
  
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    max-width: ${size('layout.col3')};
    ${ifNotProp('borderless', css`
      padding: ${size('spacing.regular')} ${size('spacing.large')};
      border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    `)}

    ${disabledWrapperStyles}
    ${textIconStyles}
  }
`;

Td.propTypes = {
  children: node,
  kind: string,
  disabled: bool,
  borderless: bool,
};

const disabledStyles = css`
  ${ifProp('disabled', css`
    color: ${palette('slate', 'filler')};
  `)}
`;

const textStyles = css`
  padding: ${size('spacing.regular')} 0;
`;

const TextChildrenBlock = styled(Block)`
  ${textStyles}
  ${disabledStyles}
`;

const linkStyles = css`
  display: block;
  font-size: ${size('text.caption')};
  line-height: ${size('lineHeight.caption')};
`;

const LinkChildrenSpan = styled(Link)`
  ${textStyles}
  ${linkStyles}
`;

const TextIconChildrenSpan = styled(Link)`
  ${textStyles}
  ${linkStyles}
  margin-right: ${size('spacing.regular')};
`;

const DoubleLineBlock = styled(Block)`
  ${disabledStyles}
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const TextTd = ({
  children, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <TextChildrenBlock size="caption" disabled={disabled} {...props}>
      {children}
    </TextChildrenBlock>
  </Td>
);

TextTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
  borderless: bool,
};

export const DoubleLineTd = ({
  firstLine, secondLine, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <DoubleLineBlock size="caption" disabled={disabled} {...props}>
      {firstLine}
    </DoubleLineBlock>
    <DoubleLineBlock size="tiny" palette="grey" disabled={disabled} {...props}>
      {secondLine}
    </DoubleLineBlock>
  </Td>
);

DoubleLineTd.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
  disabled: bool,
  borderless: bool,
};

export const LinkTd = ({
  children, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless}>
    <LinkChildrenSpan size="caption" disabled={disabled} {...props}>
      {children}
    </LinkChildrenSpan>
  </Td>
);

LinkTd.propTypes = {
  children: string.isRequired,
  disabled: bool,
  borderless: bool,
};

export const TextIconTd = ({
  children, icon, iconPalette, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} kind="textIcon" borderless={borderless}>
    <TextIconChildrenSpan size="caption" disabled={disabled} {...props}>
      {children}
    </TextIconChildrenSpan>
    <Icon icon={icon} palette={iconPalette} />
  </Td>
);

TextIconTd.propTypes = {
  children: string.isRequired,
  icon: string.isRequired,
  iconPalette: string,
  disabled: bool,
  borderless: bool,
};

