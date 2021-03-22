import React, { useState, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import {
  withBorder,
  startingWith,
  withDisplay,
  upTo,
} from 'sly/common/components/helpers';
import { getKey, palette, size } from 'sly/common/components/themes';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import Icon from 'sly/common/components/atoms/Icon';
import Link from 'sly/common/components/atoms/Link';
import Block from 'sly/common/components/atoms/Block';
import SearchContainer from 'sly/web/components/resourceCenter/components/ArticlesSearchContainer';
import HeaderMenuList from 'sly/web/components/resourceCenter/components/Header/HeaderMenuList';

const backToSeniorlyItem = {
  label: 'Back to Seniorly.com',
  iconBack: true,
  palette: 'primary',
  to: '/',
  hideInBigScreen: true,
};

const Wrapper = styled(Block)(
  withDisplay,
  withBorder,
  css`
    padding: ${size('spacing.m')};
    outline: none;
    background: ${palette('white', 'base')};
    
    ${upTo('laptop', css`
      ${ifProp('menuIsOpen', `
        position: fixed;
        top: 0;
        border-radius: 0;
        width: 100%;
        z-index: 3;
      `)}
    `)}
    
    ${startingWith('laptop', css`
      padding: 0 ${size('spacing.m')};
    `)}
  `,
);

const LogoWrapper = styled(Block)(
  withBorder,
  css`
    & svg {
      height: ${size('element.regular')};
      min-width: ${size('element.regular')};
    }

    ${startingWith(
    'tablet',
    css`
        & svg {
          height: ${size('element.large')};
        }
      `,
  )}
    ${startingWith(
    'laptop',
    css`
        & svg {
          height: ${size('element.regular')};
        }
      `,
  )}
  `,
);

const MenuItemWrapper = styled(Block)(withDisplay);

const Text = styled(Block)(
  css`
    white-space: nowrap;
  `,
);

const RightMenuWrapper = styled(Block)`
    & * {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    & > div {
      padding: ${size('spacing.m')} 0;
      line-height: ${size('element.button')};
      
      &:hover {
        border-bottom: ${size('border.xxLarge')} solid ${palette('primary', 'base')};
        padding-bottom: calc(${size('spacing.m')} - ${size('border.xxLarge')});
      }
    }
  `;

const getMenuItem = (item, setMenuIsOpen) => item.hideInBigScreen
  ? (
    <Block onClick={() => setMenuIsOpen(false)} key={item.value} startingWithLaptop={{ display: 'none' }}>
      <Link to={item.to}>
        {item.label}
        {item.iconBack && <Icon icon="chevron" />}
      </Link>
    </Block>
  )
  : (
    <Link onClick={() => setMenuIsOpen(false)} key={item.value} to={item.to}>
      {item.label}
      {item.iconBack && <Icon icon="chevron" />}
    </Link>
  );

const getMenuItems = (menuItems, setMenuIsOpen) => menuItems.map(item => getMenuItem(item, setMenuIsOpen));

const Header = () => {
  const { requestInfo: { result } } = usePrefetch('getTopic');

  const headerMenuItems = useMemo(() =>
    [
      ...(result?.map(({ slug, name }) => ({ label: name, value: name, to: `${RESOURCE_CENTER_PATH}/${slug}` }))),
      backToSeniorlyItem
    ],
    [result]
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
      borderBottom="regular"
      borderRadius="small"
      borderPalette="slate"
      borderVariation="lighter-90"
      menuIsOpen={menuIsOpen}
      onBlur={handleHeaderMenuBlur}
    >
      <LogoWrapper
        upToLaptop={{ marginBottom: 'm' }}
        startingWithLaptop={{ margin: 'auto 0' }}
      >
        <Link
          css={{ display: 'flex', alignItems: 'center' }}
          palette="primary"
          variation="base"
          to={RESOURCE_CENTER_PATH}
        >
          <Icon icon="logo" fontSize={14} />
          <Text
            marginLeft="xxs"
            palette="primary"
            upToTablet={{ fontSize: size('text.body') }}
            startingWithTablet={{ fontSize: size('text.subtitle') }}
          >
            <b>seniorly</b> resource center
          </Text>
        </Link>
      </LogoWrapper>

      <Block
        height={size('element.button')}
        upToLaptop={{ display: 'none' }}
        startingWithLaptop={{ display: 'flex', flexGrow: 1 }}
        margin="auto 8.5% auto 6%"
      >
        <SearchContainer />
      </Block>

      <Block
        upToTablet={{ paddingTop: getKey('sizes.spacing.xs') }}
        startingWithLaptop={{ display: 'none' }}
      >
        <MenuItemWrapper
          display="flex"
          alignItems="center"
          startingWithTablet={{ height: size('element.large') }}
        >
          <Icon
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            cursor="pointer"
            palette="primary"
            variation="base"
            data-testid="MenuIcon"
            icon={!menuIsOpen ? 'menu' : 'close'}
          />
        </MenuItemWrapper>
      </Block>

      <RightMenuWrapper
        upToLaptop={{ display: 'none' }}
        startingWithLaptop={{ display: 'flex' }}
      >
        <Block marginRight="m" onClick={toggleDropdown}>
          Topics
          <Icon icon="arrow-drop-down" flip={menuIsOpen} />
        </Block>
        {getMenuItem(backToSeniorlyItem)}
      </RightMenuWrapper>

      <Block
        upToLaptop={{ display: 'flex' }}
        startingWithLaptop={{ display: 'none' }}
        width="100%"
        height={size('element.large')}
      >
        <SearchContainer />
      </Block>

      {menuIsOpen && (
        <HeaderMenuList
          listItems={getMenuItems(headerMenuItems, setMenuIsOpen)}
          headerRef={headerMenuRef}
          menuIsOpen={menuIsOpen}
        />
      )}
    </Wrapper>
  );
};

export default Header;
