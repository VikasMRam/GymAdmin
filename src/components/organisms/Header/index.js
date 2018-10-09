import React, { Fragment } from 'react';
import { bool, func, arrayOf, shape, string, number } from 'prop-types';
import styled from 'styled-components';
import { palette, key } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Icon, Hr, Link } from 'sly/components/atoms';
import Logo from 'sly/components/atoms/Logo';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

const HeaderWrapper = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: ${size('border.regular')} solid ${palette('grayscale', 2)};
  // To remove blue line caused by tabIndex
  outline: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
    align-items: center;
  }
`;

const SeniorlyLogoWrapper = styled.div`
  display: none;
  margin-right: ${size('spacing.large')};
  a {
    line-height: 0;
    display: block;
  }

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
  background: ${palette('white', 0)};
  z-index: ${key('zIndexes.header')};
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: 0;
    width: ${size('header.menu.width')};
    top: ${size('header.menu.position.top.laptopLarge')};
    right: ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.large')}
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
  margin: ${size('spacing.xLarge')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin: 0 ${size('spacing.large')};
  }
`;

export const HeaderItems = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    margin-left: auto; // For Float Right in Flex
    align-items: center;
    margin-right: ${size('spacing.regular')};
  }
`;

const HeaderItem = styled(Link)`
  display: none;
  padding: ${size('spacing.large')};
  font-size: ${size('text.caption')};
  &:first-child {
    padding-left: 0px;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const Header = ({
  menuOpen, onMenuIconClick, onLocationSearch, headerItems, menuItems, menuItemHrIndices, onMenuItemClick, onHeaderBlur,
}) => {
  const headerItemComponents = headerItems.map(item => item.onClick ? (
    <HeaderItem onClick={item.onClick} palette="slate" key={item.name}>
      {item.name}
    </HeaderItem>
  ) : (
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
  const headerMenuRef = React.createRef();
  const handleHeaderMenuBlur = (e) => {
    // trigger blur event handler only if focus is on an element outside dropdown, mind it
    if (menuOpen && headerMenuRef.current && !headerMenuRef.current.contains(e.relatedTarget)) {
      onHeaderBlur();
    }
  };

  return (
    // tabIndex necessary for onBlur to work
    <HeaderWrapper tabIndex="-1" onBlur={handleHeaderMenuBlur}>
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
      </HeaderItems>
      {menuItemsPresent && (
        <MenuIcon icon="menu" size="regular" onClick={onMenuIconClick} />
      )}
      {menuOpen && <HeaderMenu innerRef={headerMenuRef} onClick={onMenuItemClick}>{headerMenuItemComponents}</HeaderMenu>}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  menuOpen: bool,
  onMenuIconClick: func,
  onMenuItemClick: func,
  onLocationSearch: func,
  onHeaderBlur: func,
  headerItems: arrayOf(shape({
    name: string,
    url: string,
    onClick: func,
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
