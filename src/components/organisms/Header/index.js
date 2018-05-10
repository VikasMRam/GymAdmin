import React from 'react';
import { bool, func, arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Input from 'sly/components/atoms/Input';
import Hr from 'sly/components/atoms/Hr';
import Logo from 'sly/components/atoms/Logo';
import Button from 'sly/components/atoms/Button';

const HeaderWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  margin-bottom: ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    padding: ${size('spacing.regular')} 0;
    margin-bottom: ${size('spacing.xLarge')};
    align-items: center;
  }
`;

const SeniorlyLogoWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: block;
    margin-right: ${size('spacing.large')};
    margin-left: ${size('spacing.xLarge')};
  }
`;

export const SeniorlyIconMenu = styled.div`
  display: flex;
  padding: calc( ${size('spacing.small')} + ${size('spacing.regular')} ) ${size('spacing.large')};
  border-right: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: none;
  }
`;

const MenuArrowIcon = styled(Icon)`
  margin: calc( ${size('spacing.small')} + ${size('spacing.regular')} ) 0 0 ${size('spacing.regular')};
`;

const MenuIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: block;
    margin: ${size('spacing.large')};
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('header.searchBar.width')};
  }
`;

const SearchTextBox = styled(Input)`
    height: 100%;
    border: none;

    @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
      height: initial;
      border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    }
`;

const SearchButtonLargeLaptop = styled(Button)`
    display: none;

    @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
      display: block;
      background-color: ${palette('secondary', 0)};
      margin-left: -${size('spacing.tiny')};
    }
`;

const SearchButton = styled(Button)`
  height: 100%;
  border: none;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: none;
  }
`;

export const HeaderMenu = styled.div`
  width: 100%;
  position: absolute;
  top: ${size('header.menu.position.top.mobile')};
  background: white;
  z-index: 101;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('header.menu.width')};
    top: ${size('header.menu.position.top.laptopSideColumn')};
    right: ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
      ${palette('grayscale', 2)};
  }
`;

export const HeaderMenuItem = styled.div`
  width: 100%;
  padding: ${size('spacing.large')};
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    :hover {
      background-color: ${palette('grayscale', 3)};
    }
  }
`;

const MarginnedHR = styled(Hr)`
  margin: ${size('border.xLarge')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    margin: 0px ${size('spacing.large')};
  }
`;

const HeaderItems = styled.div`
  display: flex;
  margin-left: auto; // For Float Right in Flex
  align-items: center;
`;

const HeaderItem = styled.a`
  display: none;
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: block;
    color: ${palette('slate', 0)};
    text-align: center;
    padding: 0 ${size('spacing.regular')};
    text-decoration: none;
    font-size: ${size('text.caption')};
  }
`;

const Header = ({
  menuOpen, onMenuIconClick, headerItems, menuItems,
}) => {
  const headerItemComponents = headerItems.map(item => (
    <HeaderItem href={item.url} key={item.name}>
      {item.name}
    </HeaderItem>
  ));
  const hrIndices = [4, 8];
  let menuItemPosition = 0;
  const headerMenuItemComponents = menuItems.map((item) => {
    menuItemPosition += 1;
    if (hrIndices.indexOf(menuItemPosition) !== -1) {
      return (
        <div key={item.name}>
          <MarginnedHR />
          <HeaderMenuItem href={item.url}>{item.name}</HeaderMenuItem>
        </div>
      );
    }
    return (
      <HeaderMenuItem href={item.url} key={item.name}>
        {item.name}
      </HeaderMenuItem>
    );
  });
  return (
    <div>
      <HeaderWrapper>
        <SeniorlyLogoWrapper>
          <Logo />
        </SeniorlyLogoWrapper>
        <SeniorlyIconMenu onClick={onMenuIconClick}>
          <Icon icon="logo" size="large" />
          {!menuOpen && <MenuArrowIcon icon="arrow-down" size="tiny" />}
          {menuOpen && <MenuArrowIcon icon="arrow-up" size="tiny" />}
        </SeniorlyIconMenu>
        <SearchBar>
          <SearchTextBox placeholder="Search by city or zip code" />
          <SearchButtonLargeLaptop>
            <Icon icon="search" size="regular" palette="white" />
          </SearchButtonLargeLaptop>
          <SearchButton transparent ghost>
            <Icon icon="search" size="regular" palette="secondary" />
          </SearchButton>
        </SearchBar>
        <HeaderItems>
          {headerItemComponents}
          <MenuIcon icon="menu" size="regular" onClick={onMenuIconClick} />
        </HeaderItems>
      </HeaderWrapper>
      {menuOpen && <HeaderMenu>{headerMenuItemComponents}</HeaderMenu>}
    </div>
  );
};

Header.propTypes = {
  menuOpen: bool,
  onMenuIconClick: func,
  headerItems: arrayOf(shape({
    name: string,
    url: string,
  })).isRequired,
  menuItems: arrayOf(shape({
    name: string,
    url: string,
  })).isRequired,
};

export default Header;
