import React from 'react';
import { shape, arrayOf, string, func, number } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Role from 'sly/components/common/Role';
import { Icon, Span, Link } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  padding: ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    padding: 0;
    padding-top: ${size('spacing.xxLarge')};
    border-right: ${size('border.regular')} solid ${palette('grey', 'filler')};
    border-bottom: 0;
  }
`;

const MenuItem = styled(Link)`
  align-items: center;
  cursor: pointer;
  margin-right: ${size('spacing.large')};
  padding-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    border-left: none;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    flex-direction: column;
    margin-bottom: ${size('spacing.xxLarge')};
    margin-right: 0;
    padding: 0;
  }
`;

const ActiveMenuItem = MenuItem.extend`
  display: block;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.xxLarge')} solid ${palette('slate', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border-left: ${size('border.xxLarge')} solid ${palette('slate', 'base')};
    border-bottom: none;
  }
`;

const NotActiveMenuItem = MenuItem.extend`
  display: none;
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

const DashboardMenu = ({ menuItems, onMenuIconClick }) => {
  const menuItemComponents = menuItems.map((item) => {
    const ItemComponent = item.active ? ActiveMenuItem : NotActiveMenuItem;
    return (
      <Role className="role" is={item.role} key={item.label}>
        <ItemComponent onClick={item.onClick} to={item.href}>
          <MenuItemIcon icon={item.icon} size={item.iconSize} palette={item.palette} variation={item.variation} />
          <Span weight="medium" size="caption" palette={item.palette} variation={item.variation}>{item.label}</Span>
        </ItemComponent>
      </Role>
    );
  });
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
    role: number.isRequired,
    href: string,
  })).isRequired,
  onMenuIconClick: func,
};

export default DashboardMenu;
