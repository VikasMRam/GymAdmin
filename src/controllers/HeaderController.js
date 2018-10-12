import React, { Component, Fragment } from 'react';
import { func, bool, arrayOf, number, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { setModal } from 'sly/services/helpers/url';
import { SAVED_COMMUNITIES, MODAL_TYPE_LOG_IN } from 'sly/constants/modalType';

import { connectController } from 'sly/controllers';
import { getDetail } from 'sly/store/selectors';
import { getSearchParams } from 'sly/services/helpers/search';

import Header from 'sly/components/organisms/Header';
import SavedCommunitiesPopupController from 'sly/controllers/SavedCommunitiesPopupController';
import AuthController from 'sly/controllers/AuthController';

const defaultHeaderItems = (user) => {
  let i = [
    { name: '(855) 866-4515', url: 'tel:+18558664515' },
    { name: 'Resources', url: '/resources' },
    { name: 'How It Works', url: '/how-it-works' },
  ];
  if (user) {
    i = [...i, { name: 'Saved' }];
  }
  i = [
    ...i,
    { name: 'List Your Property', url: '/providers' },
  ];

  return i;
};

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
];

const loginHeaderItems = user => user
  ? [{ name: 'Dashboard', url: '/mydashboard' }]
  : [{ name: 'Sign in' }];

const loginMenuItems = user => loginHeaderItems(user)
  .concat(user
    ? [{ name: 'Log out', url: '/signout' }]
    : []);

const menuItemHrIndices = [7, 10];

class HeaderController extends Component {
  static propTypes = {
    dropdownOpen: bool,
    menuItemHrIndices: arrayOf(number),
    user: object,
    set: func,
    history: object,
    location: object,
    searchParams: object,
  };

  handleMenuItemClick = () => {
    const { dropdownOpen, set } = this.props;

    set({
      dropdownOpen: !dropdownOpen,
    });
  };

  render() {
    const {
      dropdownOpen,
      user,
      history,
      location,
    } = this.props;
    const hItems = defaultHeaderItems(user);
    const lhItems = loginHeaderItems(user);
    const lmItems = loginMenuItems(user);

    const savedHeaderItem = hItems.find(item => item.name === 'Saved');
    if (savedHeaderItem) {
      savedHeaderItem.onClick = () => setModal(history, location, SAVED_COMMUNITIES);
    }
    let loginItem = lhItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => setModal(history, location, MODAL_TYPE_LOG_IN);
    }
    loginItem = lmItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => setModal(history, location, MODAL_TYPE_LOG_IN);
    }

    const headerItems = [
      ...hItems,
      ...lhItems,
    ];

    const menuItems = [
      ...defaultMenuItems,
      ...lmItems,
    ];

    return (
      <Fragment>
        <Header
          menuOpen={dropdownOpen}
          onMenuIconClick={this.handleMenuItemClick}
          onMenuItemClick={this.handleMenuItemClick}
          onHeaderBlur={this.handleMenuItemClick}
          headerItems={headerItems}
          menuItems={menuItems}
          menuItemHrIndices={menuItemHrIndices}
        />
        <SavedCommunitiesPopupController />
        <AuthController />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { match, location, controller }) => ({
  searchParams: getSearchParams(match, location),
  dropdownOpen: controller.dropdownOpen,
  // this will break as soon as we are requesting other users
  // TODO: make the me resource remember it's id
  user: getDetail(state, 'user', 'me'),
});

export default withRouter(connectController(mapStateToProps)(HeaderController));
