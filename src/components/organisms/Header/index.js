import React, { Fragment } from 'react';
import { bool, func, arrayOf, shape, string, number } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Icon, Hr, Link } from 'sly/components/atoms';
import Logo from 'sly/components/atoms/Logo';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const HeaderWrapper = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.regular')} 0;
    align-items: center;
  }
`;

const SeniorlyLogoWrapper = styled.div`
  display: none;
  margin-right: ${size('spacing.large')};
  margin-left: ${size('spacing.xLarge')};
  max-width: ${size('icon.xxLarge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

export const SeniorlyIconMenu = styled.div`
  display: flex;
  padding: calc(${size('spacing.small')} + ${size('spacing.regular')})
    ${size('spacing.large')};
  border-right: ${size('border.regular')} solid ${palette('grayscale', 2)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const MenuArrowIcon = styled(Icon)`
  margin: calc(${size('spacing.small')} + ${size('spacing.regular')}) 0 0
    ${size('spacing.regular')};
`;

const MenuIcon = styled(Icon)`
  display: none;
  cursor: pointer;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

export const HeaderMenu = styled.div`
  width: 100%;
  position: absolute;
  top: ${size('header.menu.position.top.mobile')};
  background: white;
  z-index: 101;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('header.menu.width')};
    top: ${size('header.menu.position.top.laptopLarge')};
    right: ${size('spacing.xLarge')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
      ${palette('grayscale', 2)};
  }
`;

export const HeaderMenuItem = styled(Link)`
  display: block;
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    :hover {
      background-color: ${palette('grayscale', 3)};
    }
  }
`;

const MarginnedHR = styled(Hr)`
  margin: ${size('border.xLarge')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin: 0px ${size('spacing.large')};
  }
`;

const HeaderItems = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    margin-left: auto; // For Float Right in Flex
    align-items: center;
    margin-right: ${size('spacing.large')};
  }
`;

const HeaderItem = styled(Link)`
  display: none;
  padding: ${size('spacing.large')};
  font-size: ${size('text.caption')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const Header = ({
  menuOpen, onMenuIconClick, onLocationSearch, headerItems, menuItems, menuItemHrIndices,
}) => {
  const headerItemComponents = headerItems.map(item => (
    <HeaderItem to={item.url} palette="slate" key={item.name}>
      {item.name}
    </HeaderItem>
  ));
  let menuItemPosition = 0;
  const menuItemsPresent = menuItems.length > 0;
  const headerMenuItems = menuItemsPresent ? menuItems : headerItems;
  const headerMenuItemComponents = headerMenuItems.map((item) => {
    menuItemPosition += 1;
    if (menuItemHrIndices.indexOf(menuItemPosition) !== -1) {
      return (
        <div key={item.name}>
          <MarginnedHR />
          <HeaderMenuItem to={item.url} palette="slate">
            {item.name}
          </HeaderMenuItem>
        </div>
      );
    }
    return (
      <HeaderMenuItem to={item.url} palette="slate" key={item.name}>
        {item.name}
      </HeaderMenuItem>
    );
  });
  return (
    <HeaderWrapper>
      <SeniorlyLogoWrapper>
        <Link href="/">
          <Logo />
        </Link>
      </SeniorlyLogoWrapper>
      <SeniorlyIconMenu onClick={onMenuIconClick}>
        <Icon icon="logo" size="large" />
        {headerMenuItemComponents.length > 0 && (
          <Fragment>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            {!menuOpen && <MenuArrowIcon icon="arrow-down" size="tiny" />}
            {menuOpen && <MenuArrowIcon icon="arrow-up" size="tiny" />}
          </Fragment>
        )}
      </SeniorlyIconMenu>
      <SearchBoxContainer layout="header" onLocationSearch={onLocationSearch} />
      <HeaderItems>
        {headerItemComponents}
        {menuItemsPresent && (
          <MenuIcon icon="menu" size="regular" onClick={onMenuIconClick} />
        )}
      </HeaderItems>
      {menuOpen && <HeaderMenu>{headerMenuItemComponents}</HeaderMenu>}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  menuOpen: bool,
  onMenuIconClick: func,
  onLocationSearch: func,
  headerItems: arrayOf(shape({
    name: string,
    url: string,
  })).isRequired,
  menuItems: arrayOf(shape({
    name: string,
    url: string,
  })),
  menuItemHrIndices: arrayOf(number),
};

Header.defaultProps = {
  menuItems: [],
  menuItemHrIndices: [],
};

export default Header;
