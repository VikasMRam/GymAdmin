import React from 'react';
import { bool, func, arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Input from 'sly/components/atoms/Input';
import Hr from 'sly/components/atoms/Hr';

const HeaderWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 60px;
  margin-bottom: ${size('spacing.large')};
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
    margin-bottom: ${size('spacing.xLarge')};
    height: 72px;
  }
`;

const SeniorlyFullIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    width: 87px;
    height: 52px;
    margin-right: ${size('spacing.large')};
  }
`;

const SeniorlyIconMenu = styled.div`
  display: flex;
  padding: 12px ${size('spacing.large')};
  border-right: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: none;
  }
`;

const SeniorlyIcon = styled(Icon)``;

const MenuArrowIcon = styled(Icon)`
  margin: 12px 0 0 ${size('spacing.regular')};
`;

const MenuIcon = styled(Icon)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    margin: ${size('spacing.large')};
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: 344px;
    height: 40px;
    margin-top: ${size('spacing.small')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  }
`;

const SearchTextBox = styled(Input)`
  height: 100%;
  border: none;
`;

const SearchButton = styled.div`
  height: 100%;
  padding: 18px ${size('spacing.large')};
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    padding: ${size('spacing.regular')} ${size('spacing.large')};
    background-color: ${palette('secondary', 0)};
  }
`;

export const HeaderMenu = styled.div`
  width: 100%;
  position: absolute;
  top: 70px;
  background: white;
  z-index: 101;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: 264px;
    top: 55px;
    right: ${size('border.large')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
      ${palette('grayscale', 2)};
  }
`;

export const HeaderMenuItem = styled.div`
  width: 100%;
  padding: ${size('spacing.large')};
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    :hover {
      background-color: ${palette('grayscale', 3)};
    }
  }
`;

const MarginnedHR = styled(Hr)`
  margin: ${size('border.xLarge')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    margin: 0px ${size('spacing.large')};
  }
`;

const HeaderItems = styled.div`
  display: flex;
  margin-left: auto; // For Float Right in Flex
`;

const HeaderItem = styled.a`
  display: none;
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    display: block;
    color: ${palette('slate', 0)};
    text-align: center;
    padding: ${size('spacing.large')} ${size('border.regular')};
    margin-left: ${size('spacing.large')};
    text-decoration: none;
    font-size: 14px;
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
        <SeniorlyFullIcon icon="logo" size="regular" />
        <SeniorlyIconMenu onClick={onMenuIconClick}>
          <SeniorlyIcon icon="seniorlyLogo" size="button" />
          {!menuOpen && <MenuArrowIcon icon="arrow-down" size="small" />}
          {menuOpen && <MenuArrowIcon icon="arrow-up" size="small" />}
        </SeniorlyIconMenu>
        <SearchBar>
          <SearchTextBox placeholder="Search by city or zip code" />
          <SearchButton>
            <Icon icon="search-white" size="regular" />
          </SearchButton>
        </SearchBar>
        <HeaderItems>
          {headerItemComponents}
          <MenuIcon icon="menu" size="medium" onClick={onMenuIconClick} />
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
