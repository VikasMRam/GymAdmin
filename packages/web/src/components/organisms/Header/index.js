import React, { Fragment } from 'react';
import { bool, func, arrayOf, shape, string, oneOf } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, key } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import cursor from 'sly/web/components/helpers/cursor';
import { Icon, Hr, Link, Button } from 'sly/web/components/atoms';
import Logo from 'sly/web/components/atoms/Logo';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const HeaderWrapper = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  // To remove blue line caused by tabIndex
  outline: none;
  align-items: center;
  padding: ${size('spacing.regular')} ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: 0 ${size('spacing.xLarge')};
  }
`;

const SeniorlyLogoWrapper = styled.div`
  display: none;
  margin-right: ${size('spacing.xxLarge')};
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
  align-items: center;
  margin-right: ${size('spacing.large')};
  color: ${palette('secondary', 'dark35')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const MenuIcon = cursor(styled(Icon)`
  margin-right: ${size('spacing.regular')};
`);
MenuIcon.displayName = 'MenuIcon';

export const HeaderMenu = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${size('header.menu.position.top.mobile')};
  left: 0;
  background: ${palette('white', 'base')};
  z-index: ${key('zIndexes.header')};
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    top: ${size('header.menu.position.top.tablet')};
    padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    height: inherit;
    padding: ${size('spacing.large')} 0;
    width: ${size('header.menu.width')};
    left: auto;
    top: ${size('header.menu.position.top.laptop')};
    right: ${size('spacing.large')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    box-shadow: 0 ${size('spacing.small')} ${size('spacing.large')}
      ${palette('slate', 'stroke')};
  }
`;

export const HeaderMenuItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${size('spacing.large')} 0;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.large')};
    &:hover {
      background-color: ${palette('primary', 'background')};
    }
  }
`;

const MarginnedHR = styled(Hr)`
  margin: ${size('spacing.regular')} 0;
`;

export const HeaderItems = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
`;

const HeaderButton = styled(Button)`
  margin-right: ${size('spacing.regular')};
  &:last-child {
    margin-right: 0;
  }
`;
const HeaderItem = styled(Link)`
  display: none;
  padding: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')}) 0;
  margin-right: ${size('spacing.xLarge')};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    padding-bottom: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')} - ${size('border.xxLarge')});
    border-bottom: ${size('border.xxLarge')} solid ${palette('primary', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    &:first-child {
      display: none;
    }
  }

  @media screen and (min-width: ${size('breakpoint.desktop')}) {
     &:first-child {
      display: block;
    }
  }
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  visibility: ${ifProp('menuOpen', 'hidden', 'visible')};
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    visibility: visible;
    width: ${size('header.SearchBox.width')};
  }
`;

const OnlyInSmallScreen = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const OnlyInMobile = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const OnlyInTablet = styled.div`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const Header = ({
  menuOpen, onMenuIconClick, onLocationSearch, headerItems, menuItems, onMenuItemClick, onHeaderBlur, className, smallScreenMenuItems, onLogoClick,
  onCurrentLocation,
}) => {
  const headerItemComponents = headerItems.map(item => item.isButton ? (
    <HeaderButton ghost={item.ghost ? item.ghost : false} onClick={() => item.onClick(item)} key={item.name}>
      {item.name}
    </HeaderButton>
  ) : (
    <HeaderItem noHoverColorChange size="caption" onClick={() => item.onClick(item)} to={item.to} palette={item.palette ? item.palette : 'slate'} key={item.name}>
      {item.name}
    </HeaderItem>
  ));
  menuItems = menuItems.sort((a, b) => a.section - b.section);
  let prevSection = menuItems.length ? menuItems[0].section : 0;
  const headerMenuItemComponents = menuItems
    .map((item) => {
      const mi = (
        <HeaderMenuItem key={item.to} noHoverColorChange size="caption" to={item.to} palette={item.palette ? item.palette : 'slate'} onClick={() => item.onClick(item)}>
          {item.name}
          {item.icon && <Icon size="caption" icon={item.icon} palette={item.palette ? item.palette : 'slate'} />}
        </HeaderMenuItem>
      );
      const ret = item.hideInBigScreen ? (
        <OnlyInSmallScreen>
          {mi}
        </OnlyInSmallScreen>
      ) : mi;
      const hr = prevSection !== item.section && <MarginnedHR />;
      prevSection = item.section;

      return (
        <Fragment key={item.name}>
          {hr}
          {ret}
        </Fragment>
      );
    });
  const smallScreenMenuItemComponents = smallScreenMenuItems
    .map(item => (
      <HeaderMenuItem key={item.to} noHoverColorChange size="caption" to={item.to} palette={item.palette ? item.palette : 'slate'} onClick={() => item.onClick(item)}>
        {item.name}
        {item.icon && <Icon size="caption" icon={item.icon} palette={item.palette ? item.palette : 'slate'} />}
      </HeaderMenuItem>
    ));
  const headerMenuRef = React.createRef();
  const handleHeaderMenuBlur = (e) => {
    // trigger blur event handler only if focus is on an element outside dropdown, mind it
    if (menuOpen && headerMenuRef.current && !headerMenuRef.current.contains(e.relatedTarget)) {
      onHeaderBlur();
    }
  };

  return (
    // tabIndex necessary for onBlur to work
    <HeaderWrapper tabIndex="-1" onBlur={handleHeaderMenuBlur} className={className}>
      <SeniorlyLogoWrapper onClick={onLogoClick}>
        <Link to="/">
          <Logo />
        </Link>
      </SeniorlyLogoWrapper>
      <SeniorlyIconMenu>
        {headerMenuItemComponents.length > 0 && (
          <>
            {!menuOpen && <MenuIcon onClick={onMenuIconClick} icon="menu" palette="secondary" variation="dark35" />}
            {menuOpen && <MenuIcon onClick={onMenuIconClick} icon="close" palette="secondary" variation="dark35" />}
          </>
        )}
        <OnlyInTablet>
          <Link palette="secondary" variation="dark35" to="/"><Icon icon="logo" size="xLarge" /></Link>
        </OnlyInTablet>
        <OnlyInMobile>
          <Link palette="secondary" variation="dark35" to="/"><Icon icon="logo" size="large" /></Link>
        </OnlyInMobile>
      </SeniorlyIconMenu>
      <StyledSearchBoxContainer onCurrentLocation={onCurrentLocation} menuOpen={menuOpen} hasShadow layout="header" onLocationSearch={onLocationSearch} />
      <HeaderItems>
        {headerItemComponents}
      </HeaderItems>
      {menuOpen &&
        <HeaderMenu innerRef={headerMenuRef} onClick={onMenuItemClick}>
          {smallScreenMenuItemComponents.length > 0 &&
            <OnlyInSmallScreen>
              {smallScreenMenuItemComponents}
              <MarginnedHR />
            </OnlyInSmallScreen>
          }
          {headerMenuItemComponents}
        </HeaderMenu>
      }
    </HeaderWrapper>
  );
};

Header.propTypes = {
  menuOpen: bool,
  onMenuIconClick: func,
  onMenuItemClick: func,
  onLocationSearch: func,
  onCurrentLocation: func,
  onHeaderBlur: func,
  onLogoClick: func,
  headerItems: arrayOf(shape({
    name: string.isRequired,
    to: string,
    onClick: func,
    palette: palettePropType,
    isButton: bool,
    ghost: bool,
  })).isRequired,
  menuItems: arrayOf(shape({
    name: string.isRequired,
    to: string,
    onClick: func,
    hideInBigScreen: bool,
    icon: string,
    section: oneOf([1, 2, 3]),
  })),
  smallScreenMenuItems: arrayOf(shape({
    name: string.isRequired,
    to: string,
    onClick: func,
    icon: string,
  })),
  className: string,
};

Header.defaultProps = {
  menuItems: [],
  smallScreenMenuItems: [],
};

export default Header;
