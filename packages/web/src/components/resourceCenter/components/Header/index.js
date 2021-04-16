import React, { useState, useRef, useMemo, forwardRef } from 'react';
import { bool, node } from 'prop-types';
import styled from 'styled-components';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Link from 'sly/common/system/Link';
import { Logo, Menu, Chevron, ArrowDrop, Close } from 'sly/common/icons/index';
import Block from 'sly/common/system/Block';
import SearchContainer from 'sly/web/components/resourceCenter/components/ArticlesSearchContainer';
import HeaderMenuList from 'sly/web/components/resourceCenter/components/Header/HeaderMenuList';
import { sx, color, space, sx$laptop } from 'sly/common/system';

const backToSeniorlyItem = {
  label: 'Back to Seniorly.com',
  iconBack: true,
  to: '/',
  hideInBigScreen: true,
};

const Wrapper = forwardRef(({ children, menuIsOpen, ...props }, ref) => (
  <Block
    ref={ref}
    p="m"
    background="white.base"
    sx={{
    outline: 'none',
    ...((menuIsOpen && {
      position: 'fixed',
      top: 0,
      borderRadius: 0,
      width: '100%',
      zIndex: 3,
    }) || {}),
    '@tablet': { px: 'l' },
    '@laptop': {
      height: sx`${space('xxxl')}`,
      py: 0,
      ...((menuIsOpen && {
        top: 'initial',
        position: 'initial',
        borderRadius: 'initial',
        width: 'initial',
        zIndex: 'initial',
      }) || {}),
    },
  }}
    {...props}
  >
    {children}
  </Block>),
);

Wrapper.propTypes = {
  children: node,
  menuIsOpen: bool,
};

const StyledLink = styled(Link)`
  &:not(:last-child) {
    color: ${color('slate.base')};
    ${sx$laptop({ color: color('viridian.base') })}
  }
`;

const getMenuItem = (item, setMenuIsOpen) => (
  <StyledLink
    key={item.value}
    to={item.to}
    {...(setMenuIsOpen && { onClick: () => setMenuIsOpen(false) })}
  >
    {item.label}
    {item.iconBack && <Chevron rotation="90" />}
  </StyledLink>
);

const getMenuItems = (menuItems, setMenuIsOpen) => menuItems?.map(item => getMenuItem(item, setMenuIsOpen));
const getRouteToRedirect = slug => `${RESOURCE_CENTER_PATH}/${slug}`;

const Header = () => {
  const { requestInfo: { result } } = usePrefetch('getTopic');

  const headerMenuItems = useMemo(() =>
    [
      ...(result?.map(({ slug, name }) => ({ label: name, value: name, to: getRouteToRedirect(slug) })) || []),
      backToSeniorlyItem,
    ],
  [result],
  );

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const headerMenuRef = useRef(null);

  const toggleDropdown = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleHeaderMenuBlur = (e) => {
    // trigger blur event handler only if focus is on an element outside dropdown, mind it
    if (
      menuIsOpen &&
      headerMenuRef.current &&
      !headerMenuRef.current.contains(e.relatedTarget)
    ) {
      toggleDropdown();
    }
  };

  return (
    <Wrapper
      tabIndex="-1"
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      align-items="center"
      borderBottom="1px solid"
      borderColor="slate.lighter-90"
      menuIsOpen={menuIsOpen}
      onBlur={handleHeaderMenuBlur}
    >
      <Block
        mb="m"
        sx$tablet={{
          '& svg': {
            height: 'm',
            width: 'm',
          },
        }}
        sx$laptop={{
          margin: 'auto 0',
          '& svg': {
            height: '40px',
            width: '40px',
          },
        }}
      >
        <Link
          display="flex"
          alignItems="center"
          to={RESOURCE_CENTER_PATH}
        >
          <Logo size="xl" />
          <Block
            whiteSpace="nowrap"
            ml="xxs"
            fontSize="body-m"
            sx$tablet={{
              fontSize: '20px',
            }}
          >
            <b>seniorly</b> resource center
          </Block>
        </Link>
      </Block>

      <Block
        height="m"
        display="none"
        sx$laptop={{
          display: 'flex',
          flexGrow: 1,
        }}
        margin="auto 8.5% auto 6%"
      >
        <SearchContainer />
      </Block>

      <Block
        pt="xs"
        sx$tablet={{ pt: 0 }}
        sx$laptop={{
          display: 'none',
        }}
      >
        <Block
          display="flex"
          alignItems="center"
          sx$tablet={{
            height: 'm',
          }}
        >
          {
            menuIsOpen ?
              <Close
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                cursor="pointer"
                data-testid="MenuIcon"
              /> :
              <Menu
                cursor="pointer"
                onClick={() => setMenuIsOpen(!menuIsOpen)}
                data-testid="MenuIcon"
              />
          }
        </Block>
      </Block>

      <Block
        display="none"
        sx={{
          '& *': {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          },
          '& > div, & > a': {
            padding: 'm 0',
            lineHeight: 'title-l',
            '&:hover': {
              borderBottom: '4px solid',
              borderColor: 'viridian.base',
              paddingBottom: '12px',
            },
          },
        }}
        sx$laptop={{
          display: 'flex',
        }}
      >
        <Block mr="m" onClick={toggleDropdown}>
          Topics
          <ArrowDrop color="viridian.base" rotation={menuIsOpen ? null : '180'} />
        </Block>
        {getMenuItem(backToSeniorlyItem)}
      </Block>

      <Block
        display="flex"
        sx$laptop={{
          display: 'none',
        }}
        width="100%"
        height="m"
      >
        <SearchContainer />
      </Block>

      {menuIsOpen && (
        <HeaderMenuList
          listItems={getMenuItems(headerMenuItems, setMenuIsOpen)}
          ref={headerMenuRef}
          menuIsOpen={menuIsOpen}
        />
      )}

    </Wrapper>
  );
};

export default Header;
