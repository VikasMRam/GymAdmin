import React, { Component } from 'react';
import { func, bool, array, arrayOf, number, object } from 'prop-types';
import { connect } from 'react-redux';

import { getDetail } from 'sly/store/selectors';
import Header from 'sly/components/organisms/Header';
import { toggle } from 'sly/store/actions';
import { isHeaderDropdownOpen } from 'sly/store/selectors';

const defaultHeaderItems = [
  { name: 'Resources', url: '/resources' },
  // { name: 'Moving Center', url: '#' },
  // { name: 'News', url: '#' },
  // { name: 'Moving Center', url: '/resources/tags/moving+center' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'List Your Property', url: '/providers' },
  { name: 'Our History', url: '/about' },
  // { name: 'Sign in', url: '/signin' },
];

const defaultMenuItems = [
  { name: 'Home', url: '/' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: "Alzheimer's Care", url: '/alzheimers-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'Our History', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
  { name: 'List on Seniorly', url: '/providers' },
  // { name: 'Sign Out', url: '#' },
];

const loginHeaderItems = user => user
  ? [{ name: 'Dashboard', url: '/mydashboard' }]
  : [{ name: 'Sign in', url: '/signin' }];

const loginMenuItems = user => loginHeaderItems(user)
  .concat(user
    ? [{ name: 'Log out', url: '/signout' }]
    : []
  );

const menuItemHrIndices = [7, 10];

class HeaderContainer extends Component {
  static propTypes = {
    dispatchToggleAction: func,
    onLocationSearch: func,
    dropdownOpen: bool,
    menuItemHrIndices: arrayOf(number),
    user: object,
  };

  render(){
    const {
      dispatchToggleAction,
      dropdownOpen,
      onLocationSearch,
      user,
    } = this.props;

    const headerItems = [
      ...defaultHeaderItems,
      ...loginHeaderItems(user),
    ];

    const menuItems = [
      ...defaultMenuItems,
      ...loginMenuItems(user),
    ];

    return (
      <Header
        menuOpen={dropdownOpen}
        onMenuIconClick={dispatchToggleAction}
        onMenuItemClick={dispatchToggleAction}
        onLocationSearch={onLocationSearch}
        onHeaderBlur={dispatchToggleAction}
        headerItems={headerItems}
        menuItems={menuItems}
        menuItemHrIndices={menuItemHrIndices}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dropdownOpen: isHeaderDropdownOpen(state),
    // this will break as soon as we are requesting other users
    // TODO: make the me resource remember it's id
    user: getDetail(state, 'user', 'me'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggleAction: () => dispatch(toggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
