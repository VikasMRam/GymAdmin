import React, { forwardRef } from 'react';
import { node } from 'prop-types';

import Block from 'sly/common/system/Block';

const HeaderMenuList = forwardRef(({ listItems }, ref) => (
  <Block
    ref={ref}
    display="flex"
    flexDirection="column"
    width="100%"
    position="fixed"
    background="white.base"
    overflow="hidden"
    borderTop="1px solid"
    sx={{
      bottom: '0',
      left: '0',
      zIndex: 4,
      top: '4.5rem',
      '& a': {
        display: 'flex',
        fontSize: 'body-m',
        padding: 'm',
        '&:hover': {
          background: 'viridian.lighter-90',
        },
        '&:active': {
          background: 'viridian.base',
          color: 'white.base',
        },
      },
      borderColor: 'slate.lighter-90',
    }}
    sx$laptop={{
      width: '17rem',
      height: 'auto',
      position: 'absolute',
      top: '5.375rem',
      right: '12.875rem',
      borderRadius: 'xxs',
      left: 'initial',
      bottom: 'initial',
      '--box-shadow-color': 'slate.lighter-90',
      border: 'none',
      boxShadow: '0 4px 16px var(--box-shadow-color)',
      '& a:last-of-type': {
        display: 'none',
      },
    }}
  >
    {listItems}
  </Block>
));

HeaderMenuList.propTypes = {
  listItems: node,
};

export default HeaderMenuList;
