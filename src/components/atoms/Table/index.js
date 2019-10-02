import React from 'react';
import styled, { css } from 'styled-components';
import { node, bool, string, arrayOf, oneOfType } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import Block from 'sly/components/atoms/Block';

const TableWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-top: none;
    border-bottom: none;
    overflow-x: auto;
  }
`;

const StyledTable = styled.table`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table;

    border: none;

    font-size: ${size('text.caption')};

    border-collapse: collapse;
    width: 100%;
    position: relative;

    td, th {
      white-space: nowrap;
      border-right: none;
    }
    th:first-child, td:first-child {
      left: 0;
      position: sticky;
      top: auto;
      border-left: none;
      box-shadow: 4px 0px 0px 0px ${palette('slate.base')}19;
    }
  }
`;

export const Table = ({ children, className, ...props }) => (
  <TableWrapper className={className}>
    <StyledTable {...props}>
      {children}
    </StyledTable>
  </TableWrapper>
);

Table.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  className: string,
};

export const THead = styled.thead`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-header-group;
  }
`;

export const TBody = styled.tbody`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-row-group;
  }
`;

export const Tr = styled.tr`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-row;
  }
`;

export const Td = styled.td`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: table-cell;
    max-width: ${size('layout.col3')};
    line-height: ${size('lineHeight.caption')};

    padding: ${size('spacing.regular')} ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};

    background-color: ${palette('white', 'base')};

    ${ifProp('disabled', css`
      background-color: ${palette('grey', 'background')};
      color: ${palette('slate', 'filler')};
    `)}
  }
`;

Td.propTypes = {
  children: node,
  disabled: bool,
  borderless: bool,
};

const TextBlock = styled(Block)`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  margin: ${size('spacing.tiny')};
`;

TextBlock.propTypes = {
  size: string,
};

const LinkBlock = styled(Link)`
  display: block;
`;

export const TextTd = ({
  children, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless} {...props}>
    <TextBlock disabled={disabled}>
      {children}
    </TextBlock>
  </Td>
);

TextTd.propTypes = {
  children: string,
  disabled: bool,
  borderless: bool,
};

export const DoubleLineTd = ({
  firstLine, secondLine, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless} {...props}>
    <TextBlock>
      {firstLine}
    </TextBlock>
    <TextBlock size="tiny" palette="grey">
      {secondLine}
    </TextBlock>
  </Td>
);

DoubleLineTd.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
  disabled: bool,
  borderless: bool,
};

export const LinkTd = ({
  to, children, disabled, borderless, ...props
}) => (
  <Td disabled={disabled} borderless={borderless} {...props}>
    <LinkBlock to={to} disabled={disabled}>
      {children}
    </LinkBlock>
  </Td>
);

LinkTd.propTypes = {
  to: string.isRequired,
  children: string.isRequired,
  disabled: bool,
  borderless: bool,
};
