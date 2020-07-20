import React, { Fragment } from 'react';
import { bool, func, arrayOf, shape, string, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, key } from 'sly/common/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import cursor from 'sly/web/components/helpers/cursor';
import { Icon, Hr, Link, Button } from 'sly/web/components/atoms';
import Logo from 'sly/web/components/atoms/Logo';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const HeaderWrapper = styled.nav`
  display: flex;
  width: 100%;
  height: 80px;
  border-bottom: ${size('border.regular')} solid ${palette('slate.lighter-90')};
  // To remove blue line caused by tabIndex
  outline: none;
  align-items: center;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
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

const SeniorlyIconMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${size('spacing.large')};
  color: ${palette('primary', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const MenuIcon = cursor(styled(Icon)`
  margin-right: ${size('spacing.regular')};
`);
MenuIcon.displayName = 'MenuIcon';

const HeaderMenu = styled.div`
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
    height: unset;
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

const HeaderMenuItem = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${size('spacing.large')} 0;
  background: ${palette('white', 'base')};

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

const HeaderItems = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 1.5rem;

  > * {
    white-space: nowrap;
  }

  ${ifProp('hideInSmallScreen', css`display: none;`)};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
  }
`;

const HeaderButton = styled(Button)`
  margin-right: ${size('spacing.regular')};
  &:last-child {
    margin-right: 0;
  }
`;
const HeaderItem = styled(Link)`
  padding: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')}) 0;
  margin-right: ${size('spacing.xLarge')};
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    padding-bottom: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')} - ${size('border.xxLarge')});
    border-bottom: ${size('border.xxLarge')} solid ${palette('primary', 'base')};
  }
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
  visibility: ${ifProp('menuOpen', 'hidden', 'visible')};
  width: 100%;
  padding: ${size('spacing.regular')} 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: calc(${size('spacing.large')} + ${size('spacing.tiny')}) 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.large')} 0;
    visibility: visible;
    flex-grow: 1;
    width: unset;
    max-width: ${size('header.SearchBox.width')};
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

const mapItem = item => item.isButton ? (
  <HeaderButton ghost={item.ghost ? item.ghost : false} onClick={() => item.onClick(item)} key={item.name}>
    {item.name}
  </HeaderButton>
) : (
  <HeaderItem noHoverColorChange size="caption" onClick={() => item.onClick(item)} to={item.to} palette={item.palette ? item.palette : 'slate'} key={item.name}>
    {item.name}
  </HeaderItem>
);

const Header = ({
  menuOpen, onMenuIconClick, onLocationSearch, headerItems, menuItems, onMenuItemClick, onHeaderBlur, className, smallScreenMenuItems, onLogoClick,
  onCurrentLocation, hasSearchBox, hideMenuItemsInSmallScreen,
}) => {
  const headerItemComponents = headerItems.map(mapItem);
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
        {(smallScreenMenuItemComponents.length > 0 || headerMenuItemComponents.length > 0) && (
          <>
            {!menuOpen && <MenuIcon onClick={onMenuIconClick} icon="menu" palette="primary" variation="base" />}
            {menuOpen && <MenuIcon onClick={onMenuIconClick} icon="close" palette="primary" variation="base" />}
          </>
        )}
        <OnlyInTablet>
          <Link palette="primary" variation="base" to="/"><Icon icon="logo" size="hero" /></Link>
        </OnlyInTablet>
        <OnlyInMobile>
          <Link palette="primary" variation="base" to="/"><Icon icon="logo" size="hero" /></Link>
        </OnlyInMobile>
      </SeniorlyIconMenu>
      {hasSearchBox && (
        <StyledSearchBoxContainer
          onCurrentLocation={onCurrentLocation}
          menuOpen={menuOpen}
          layout="header"
          onLocationSearch={onLocationSearch}
        />
      )}
      <HeaderItems hideInSmallScreen={hideMenuItemsInSmallScreen}>
        {headerItemComponents}
      </HeaderItems>
      {menuOpen &&
        <HeaderMenu ref={headerMenuRef} onClick={onMenuItemClick}>
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
  hasSearchBox: bool,
  hideMenuItemsInSmallScreen: bool,
};

Header.defaultProps = {
  menuItems: [],
  smallScreenMenuItems: [],
  hideMenuItemsInSmallScreen: true,
};

export default Header;
