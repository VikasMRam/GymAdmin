import React, { Component, Fragment } from 'react';
import { func, bool, array, arrayOf, number, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getDetail } from 'sly/store/selectors';
import Header from 'sly/components/organisms/Header';
import { toggle } from 'sly/store/actions';
import { isHeaderDropdownOpen } from 'sly/store/selectors';
import SavedCommunitiesPopupController from 'sly/controllers/SavedCommunitiesPopupController';

const defaultHeaderItems = [
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Saved', url: '?modal=savedCommunities' },
  { name: 'List Your Property', url: '/providers' },
  // { name: 'Sign in', url: '/signin' },
];

const defaultMenuItems = [
  { name: 'Home', url: '/' },
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: "Alzheimer's Care", url: '/alzheimers-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'Our Company', url: '/about' },
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
    dropdownOpen: bool,
    menuItemHrIndices: arrayOf(number),
    user: object,
  };

  render(){
    const {
      dispatchToggleAction,
      dropdownOpen,
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
      <Fragment>
        <Header
          menuOpen={dropdownOpen}
          onMenuIconClick={dispatchToggleAction}
          onMenuItemClick={dispatchToggleAction}
          onHeaderBlur={dispatchToggleAction}
          headerItems={headerItems}
          menuItems={menuItems}
          menuItemHrIndices={menuItemHrIndices}
        />
        <SavedCommunitiesPopupController />
      </Fragment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
