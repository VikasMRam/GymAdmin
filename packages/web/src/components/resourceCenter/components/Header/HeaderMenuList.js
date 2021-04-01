import React, { forwardRef } from 'react';
import { array, instanceOf, oneOfType, shape, func } from 'prop-types';

import Block from 'sly/common/system/Block';
import Header from 'sly/web/components/resourceCenter/components/Header';

const Wrapper = forwardRef(({ children, ...props }, ref) =>
  (<Block
    ref={ref}
    background="white.base"
    zIndex="4"
    sx={{
      bottom: '0',
      left: '0',
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
      borderTop: '1px solid',
      borderColor: 'slate.lighter-90',
      '@laptop': {
        '--box-shadow-color': 'slate.lighter-90',
        border: 'none',
        boxShadow: '0 4px 16px var(--box-shadow-color)',
        '& a:last-of-type': {
          display: 'none',
        },
      },
    }}
    {...props}
  >
    {children}
  </Block>),
);


const HeaderMenuList = ({ listItems, headerRef }) => {
  return (
    <Wrapper
      display="flex"
      flexDirection="column"
      ref={headerRef}
      width="100%"
      position="fixed"
      sx$laptop={{
        width: '17rem',
        height: 'auto',
        posiiton: 'absolute',
        top: '5.375rem',
        right: '12.875rem',
        borderRadius: '4px',
        left: 'initial',
        bottom: 'initial',
      }}
      overflow="hidden"
    >
      {listItems}
    </Wrapper>
  );
};

HeaderMenuList.propTypes = {
  listItems: array,
  headerRef: oneOfType([
    func,
    shape({ current: instanceOf(Header) }),
  ]),
};

export default HeaderMenuList;
