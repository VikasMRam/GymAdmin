import React, { forwardRef } from 'react';
import { node, bool, string, arrayOf, oneOfType } from 'prop-types';

import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';

export const Table = forwardRef(({ children, ...props }, ref) => {
  return (
    <Block
      ref={ref}
      as="table"
      _sx={{
        display: 'block',
        '@tablet': {
          display: 'table',
          border: 'box',
          borderColor: 'slate.lighter-90',
          width: '100%',
          borderCollapse: 'collapse',
          position: 'relative',
          'td, th': {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          },
        },
      }}
      {...props}
    >
      {children}
    </Block>
  );
});

Table.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  sticky: bool,
};

export const THead = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="thead"
    _sx={{
      display: 'none',
      '@tablet': { display: 'table-header-group' },
    }}
    {...props}
  />
));

THead.displayName = 'THead';

export const Th = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="th"
    _sx={{
      font: 'body-m',
      textAlign: 'left',
      background: 'slate.lighter-90',
      padding: 'xs m',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      borderRight: 's',
      borderColor: 'slate.lighter-80',
      ':last-child': { borderRight: 0 },
    }}
    {...props}
  />
));

export const TBody = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="tbody"
    _sx={{
      display: 'block',
      '@tablet': { display: 'table-row-group' },
    }}
    {...props}
  />
));

TBody.displayName = 'TBody';

export const Tr = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="tr"
    _sx={{
      display: 'block',
      borderBottom: 's',
      borderColor: 'slate.lighter-90',
      ':last-child': {
        borderBottom: 0,
      },
      '@tablet': { display: 'table-row' },
    }}
    {...props}
  />
));

Tr.displayName = 'Tr';

export const Td = forwardRef(({ disabled, ...props }, ref) => (
  <Block
    ref={ref}
    as="td"
    _sx={{
      display: 'block',
      '@tablet': {
        display: 'table-cell',
        padding: 'xs m',
        borderRight: 's',
        borderColor: 'slate.lighter-90',
        ':last-child': { borderRight: 0 },
        ...((disabled && {
          backgroundColor: 'slate.lighter-90',
          color: 'slate.lighter-40',
        }) || {}),
      },
    }}
    {...props}
  />
));

Td.displayName = 'Td';

Td.propTypes = {
  disabled: bool,
};

const TextBlock = forwardRef((props, ref) => (
  <Block
    ref={ref}
    _sx={{
      overflow: 'hidden',
      width: '100%',
      textOverflow: 'ellipsis',
      margin: 'xxxs',
    }}
    {...props}
  />
));

export const TextTd = forwardRef(({ children, ...props }, ref) => (
  <Td ref={ref} {...props}>
    <TextBlock>
      {children}
    </TextBlock>
  </Td>
));

TextTd.propTypes = {
  children: string,
};

export const DoubleLineTd = forwardRef(({
  firstLine, secondLine, ...props
}, ref) => (
  <Td ref={ref} {...props}>
    <TextBlock>
      {firstLine}
    </TextBlock>
    <TextBlock font="body-xs" palette="slate-lighter-40">
      {secondLine}
    </TextBlock>
  </Td>
));

DoubleLineTd.propTypes = {
  firstLine: string.isRequired,
  secondLine: string.isRequired,
};

export const LinkTd = forwardRef(({
  to, children, ...props
}, ref) => (
  <Td ref={ref} {...props}>
    <Link to={to} display="block">
      {children}
    </Link>
  </Td>
));

LinkTd.propTypes = {
  to: string.isRequired,
  children: string.isRequired,
};
