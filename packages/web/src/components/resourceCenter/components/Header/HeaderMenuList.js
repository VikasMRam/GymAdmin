import React from 'react';
import { array, instanceOf, oneOfType, shape, func } from 'prop-types';
import styled, { css } from 'styled-components';

import Block from 'sly/common/components/atoms/Block';
import { size, palette } from 'sly/common/components/themes';
import { upTo, withDisplay } from 'sly/common/components/helpers';
import Header from 'sly/web/components/resourceCenter/components/Header';

const Wrapper = styled(Block)(
  withDisplay,
  css`
    background: ${palette('white', 'base')};
    z-index: 4;
    
    & a {
      display: flex;
      font-size: ${size('text.body')};
      line-height: ${size('lineHeight.displayS')};
      padding: ${size('spacing.m')};
      
      &:hover {
        background: ${palette('viridian', 'lighter-90')};
      }
      
      &:active {
        background: ${palette('viridian', 'base')};
        color: ${palette('white', 'base')};
      }
    }
    
    & > a {
      ${upTo('laptop', { color: palette('slate', 'base') })}
    }
    
    @media screen and (max-width: ${size('breakpoint.laptop')}) {
      border-top: ${size('border.regular')} solid ${palette('slate', 'lighter-90')};
    }
    
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      box-shadow: 0 ${size('spacing.small')} ${size('spacing.large')} ${palette('slate', 'stroke')};
    }
  `,
);

const HeaderMenuList = ({ listItems, headerRef }) => {
  return (
    <Wrapper
      display="flex"
      flexDirection="column"
      ref={headerRef}
      upToTablet={{ top: '4.5rem' }}
      upToLaptop={{
        width: '100%',
        position: 'fixed',
        top: '5rem',
        left: 0,
        bottom: 0,
      }}
      startingWithLaptop={{
        width: '17rem',
        height: 'auto',
        position: 'absolute',
        top: '5.375rem',
        right: '12.875rem',
        borderRadius: size('border.xxLarge'),
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
