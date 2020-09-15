import React, { Fragment } from 'react';
import { bool, func, arrayOf, shape, string, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, key } from 'sly/common/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { startingWith, upTo } from 'sly/common/components/helpers';
import { Icon, Button, Logo, Hr, Link, Block } from 'sly/common/components/atoms';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

const Wrapper = styled(Block)`
  // To remove blue line caused by tabIndex
  outline: none;
  z-index: ${key('zIndexes.header')};

  ${upTo('laptop', css`
    ${ifProp('isMenuOpen', `
      position: fixed;
      height: 100%;
      overflow: auto;
    `)}
  `)}
`;

const HeaderBar = styled(Block)`
  ${startingWith('tablet', css`
    padding: 0 ${size('spacing.xLarge')};
  `)}
`;

const SeniorlyLogoWrapper = styled(Block)`
  display: none;

  ${startingWith('laptop', 'display: block;')}
`;

const HeaderMenu = styled.div`
  width: 100%;
  position: absolute;
  top: ${size('header.menu.position.top.tablet')};
  left: 0;
  background: ${palette('white', 'base')};
  z-index: ${key('zIndexes.header')};
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
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
  align-items: center;
  padding: ${size('spacing.large')} 0;
  background: ${palette('white', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.large')};
    &:hover {
      background-color: ${palette('primary', 'background')};
      color: ${palette('primary', 'base')};

      ${Icon} {
        color: ${palette('primary', 'base')};
      }
    }
  }
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

const HeaderItem = styled(Link)`
  padding: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')}) 0;
  &:hover {
    padding-bottom: calc(${size('spacing.xLarge')} + ${size('spacing.regular')} - ${size('spacing.small')} - ${size('border.xxLarge')});
    border-bottom: ${size('border.xxLarge')} solid ${palette('primary', 'base')};
  }
`;

const StyledSearchBoxContainer = styled(SearchBoxContainer)`
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

const OnlyInSmallScreen = styled(Block)`
  ${startingWith('laptop', 'display: none;')}
`;

const mapItem = (item, i, arr, menuOpen) => item.isButton ? (
  <Button
    ghost={item.ghost}
    onClick={() => item.onClick(item)}
    key={item.name}
    marginRight={i !== arr.length - 1 ? 'regular' : null}
  >
    {item.name}
  </Button>
) : (
  <HeaderItem
    noHoverColorChange
    size="caption"
    onClick={() => item.onClick(item)}
    to={item.to}
    palette={item.palette ? item.palette : 'slate'}
    key={item.name}
    marginRight={i !== arr.length - 1 ? 'xLarge' : null}
  >
    {item.name}
    {item.isToggler && <Icon icon="arrow-drop-down" flip={menuOpen} />}
  </HeaderItem>
);

const Header = ({
  menuOpen, onMenuIconClick, onLocationSearch, headerItems, menuItems, onMenuItemClick, onHeaderBlur, className, smallScreenMenuItems, onLogoClick,
  onCurrentLocation, hasSearchBox, hideMenuItemsInSmallScreen,
}) => {
  const headerItemComponents = headerItems.map((...args) => mapItem(...args, menuOpen));
  menuItems = menuItems.sort((a, b) => a.section - b.section);
  let prevSection = menuItems.length ? menuItems[0].section : 0;
  const headerMenuItemComponents = menuItems
    .map((item) => {
      const mi = (
        <HeaderMenuItem key={item.to} size="caption" to={item.to} palette={item.palette ? item.palette : 'grey'} onClick={() => item.onClick(item)}>
          {item.icon && <Icon size="caption" marginRight="medium" icon={item.icon} palette={item.palette ? item.palette : 'grey'} />}
          {item.name}
        </HeaderMenuItem>
      );
      const ret = item.hideInBigScreen ? (
        <OnlyInSmallScreen>
          {mi}
        </OnlyInSmallScreen>
      ) : mi;
      const hr = prevSection !== item.section && <Hr size="regular" />;
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
      <HeaderMenuItem key={item.to} size="caption" to={item.to} palette={item.palette ? item.palette : 'grey'} onClick={() => item.onClick(item)}>
        {item.icon && <Icon size="caption" marginRight="medium" icon={item.icon} palette={item.palette ? item.palette : 'grey'} />}
        {item.name}
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
    <Wrapper
      tabIndex="-1"
      as="nav"
      width="100%"
      background="white"
      top="0"
      isMenuOpen={menuOpen}
      onBlur={handleHeaderMenuBlur}
      className={className}
    >
      <HeaderBar
        display="flex"
        width="100%"
        height="80px"
        verticalAlign="middle"
        borderBottom="regular"
        borderPalette="slate"
        borderVariation="lighter-90"
        padding={[0, 'large']}
      >
        <SeniorlyLogoWrapper onClick={onLogoClick} marginRight="xxLarge">
          <Link to="/" display="block" lineHeight="0" >
            <Logo />
          </Link>
        </SeniorlyLogoWrapper>
        <OnlyInSmallScreen display="flex" verticalAlign="center" marginRight="large" palette="primary">
          {(smallScreenMenuItemComponents.length > 0 || headerMenuItemComponents.length > 0) && (
            <Icon
              onClick={onMenuIconClick}
              marginRight="regular"
              cursor="pointer"
              palette="primary"
              variation="base"
              testId="MenuIcon"
              icon={!menuOpen ? 'menu' : 'close'}
            />
          )}
          <Link palette="primary" variation="base" to="/"><Icon icon="logo" size="hero" /></Link>
        </OnlyInSmallScreen>
        {hasSearchBox && (
          <StyledSearchBoxContainer
            onCurrentLocation={onCurrentLocation}
            onLocationSearch={onLocationSearch}
            layout="header"
            width="100%"
            padding={['regular', 0]}
            visibility={menuOpen ? 'hidden' : 'visible'}
            include="city,zip,community,agent"
            placeholder="Search by city, state, zip, community name"
          />
        )}
        <HeaderItems hideInSmallScreen={hideMenuItemsInSmallScreen}>
          {headerItemComponents}
        </HeaderItems>
      </HeaderBar>
      {menuOpen &&
        <HeaderMenu ref={headerMenuRef} onClick={onMenuItemClick}>
          {smallScreenMenuItemComponents.length > 0 &&
            <OnlyInSmallScreen>
              {smallScreenMenuItemComponents}
              <Hr size="regular" />
            </OnlyInSmallScreen>
          }
          {headerMenuItemComponents}
        </HeaderMenu>
      }
    </Wrapper>
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
    isToggler: bool,
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
