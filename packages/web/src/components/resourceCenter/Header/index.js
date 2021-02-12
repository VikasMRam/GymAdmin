import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import Block from 'sly/common/components/atoms/Block';
import {
  withBorder,
  startingWith,
  withDisplay, upTo,
} from 'sly/common/components/helpers';
import { Icon, Link } from 'sly/common/components/atoms';
import { getKey, palette, size } from 'sly/common/components/themes';
import SearchContainer from 'sly/web/components/resourceCenter/Search';
import HeaderMenuList from 'sly/web/components/resourceCenter/Header/HeaderMenuList';

const backToSeniorlyItem = {
  name: 'Back to Seniorly.com',
  iconBack: true,
  palette: 'primary',
  to: '/',
  hideInBigScreen: true,
};

const headerMenuItems = [
  { name: 'Senior Living Guides', to: '/resources/topic/senior-living-guides' },
  { name: 'Health and Lifestyle', to: '/resources/topic/health-and-lifestyle' },
  { name: 'Voices', to: '/resources/topic/voices' },
  { name: 'Caregivers', to: '/resources/topic/caregivers' },
  backToSeniorlyItem,
];

const Wrapper = styled(Block)(
  withDisplay,
  withBorder,
  css`
    padding: ${size('spacing.m')};
    outline: none;
    
    ${upTo('laptop', css`
      ${ifProp('isMenuOpen', `
        position: fixed;
        height: 100%;
        overflow: auto;
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

const getMenuItem = item => item.hideInBigScreen
  ? (
    <Block key={item.name} startingWithLaptop={{ display: 'none' }}>
      <Link to={item.to}>
        {item.name}
        {item.iconBack && <Icon icon="chevron" />}
      </Link>
    </Block>
  )
  : (
    <Link key={item.name} to={item.to}>
      {item.name}
      {item.iconBack && <Icon icon="chevron" />}
    </Link>
  );

const getMenuItems = menuItems => menuItems.map(item => getMenuItem(item));

const Header = () => {
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
          to="/resources"
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
        upToTablet={{ paddingTop: getKey('sizes.spacing.xs') }} // for some reason size('spacing.xs') || size('spacing.regular') does not work
        startingWithLaptop={{ display: 'none' }}
      >
        <MenuItemWrapper
          display="flex"
          alignItems="center"
          // height={size('element.regular')}
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
          listItems={getMenuItems(headerMenuItems)}
          headerRef={headerMenuRef}
        />
      )}
    </Wrapper>
  );
};

export default Header;
