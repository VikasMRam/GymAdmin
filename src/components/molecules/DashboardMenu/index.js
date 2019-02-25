import React from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Span from 'sly/components/atoms/Span';

const Wrapper = styled.div`
  display: flex;
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};

  @media screen and (min-width: 1024px) {
    display: block;
    padding: 0;
    padding-top: ${size('spacing.xxLarge')};
    // TODO: Move this to the layout of the dashboard
    width: ${size('element.xxHuge')};;
  }
`;

const MenuItem = styled.div`
  display: ${ifProp('active', 'block', 'none')};
  align-items: center;
  cursor: pointer;
  margin-right: ${size('spacing.large')};
  padding-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    border-bottom: ${size('border.xxLarge')} ${ifProp('active', 'solid', 'none')} ${palette('slate', 'base')};
    border-left: none;
  }

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    border-bottom: none;
    border-left: ${size('border.xxLarge')} ${ifProp('active', 'solid', 'none')} ${palette('slate', 'base')};
    margin-bottom: ${size('spacing.xxLarge')};
    padding: 0 ${size('spacing.xLarge')};
  }
`;

const MenuItemIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const MenuIcon = styled(Icon)`
  margin-left: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const MenuItemLabel = styled(Span)`
  
`;

const DashboardMenu = ({ menuItems, onMenuIconClick }) => {
  const menuItemComponents = menuItems.map(item => (
    <MenuItem key={item.label} active={item.active} onClick={item.onClick}>
      <MenuItemIcon icon={item.icon} size={item.iconSize} palette={item.palette} variation={item.variation} />
      <MenuItemLabel weight="medium" size="caption" palette={item.palette} variation={item.variation}>{item.label}</MenuItemLabel>
    </MenuItem>
  ));
  return (
    <Wrapper>
      {menuItemComponents}
      <MenuIcon icon="menu" onClick={onMenuIconClick} />
    </Wrapper>
  );
};

DashboardMenu.propTypes = {
  menuItems: arrayOf(shape({
    label: string.isRequired,
    icon: string.isRequired,
    iconSize: string.isRequired,
    palette: string.isRequired,
    variation: string.isRequired,
    onClick: func,
  })).isRequired,
  onMenuIconClick: func,
};

export default DashboardMenu;
