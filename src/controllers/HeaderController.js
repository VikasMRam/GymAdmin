import React, { Component, Fragment } from 'react';
import { func, bool, arrayOf, number, object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { objectToURLQueryParams, parseURLQueryParams } from 'sly/services/helpers/url';
import { SAVED_COMMUNITIES } from 'sly/constants/modalType';

import { connectController } from 'sly/controllers';
import { getDetail } from 'sly/store/selectors';

import Header from 'sly/components/organisms/Header';
import SavedCommunitiesPopupController from 'sly/controllers/SavedCommunitiesPopupController';

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
    // { name: 'Sign in', url: '/signin' },
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
  // { name: 'Sign Out', url: '#' },
];

const loginHeaderItems = user => user
  ? [{ name: 'Dashboard', url: '/mydashboard' }]
  : [{ name: 'Sign in', url: '/signin' }];

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
  };

  setModal = (value) => {
    if (value) {
      this.changeSearchParams({ changedParams: { modal: value } });
    } else {
      this.handleParamsRemove({ paramsToRemove: ['modal'] });
    }
  };

  handleMenuItemClick = () => {
    const { dropdownOpen, set } = this.props;

    set({
      dropdownOpen: !dropdownOpen,
    });
  };

  changeSearchParams = ({ changedParams }) => {
    const { history, location } = this.props;
    const { pathname, search } = location;

    const newParams = { ...parseURLQueryParams(search), ...changedParams };
    const path = `${pathname}?${objectToURLQueryParams(newParams)}`;
    history.push(path);
  };

  handleParamsRemove = ({ paramsToRemove }) => {
    const changedParams = paramsToRemove.reduce((obj, p) => {
      const nobj = obj;
      nobj[p] = undefined;
      return nobj;
    }, {});
    this.changeSearchParams({ changedParams });
  };

  render() {
    const {
      dropdownOpen,
      user,
    } = this.props;
    const hItems = defaultHeaderItems(user);

    const savedHeaderItem = hItems.find(item => item.name === 'Saved');
    if (savedHeaderItem) {
      savedHeaderItem.onClick = () => this.setModal(SAVED_COMMUNITIES);
    }

    const headerItems = [
      ...hItems,
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
          onMenuIconClick={this.handleMenuItemClick}
          onMenuItemClick={this.handleMenuItemClick}
          onHeaderBlur={this.handleMenuItemClick}
          headerItems={headerItems}
          menuItems={menuItems}
          menuItemHrIndices={menuItemHrIndices}
        />
        <SavedCommunitiesPopupController />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { controller }) => {
  const { dropdownOpen } = controller;

  return {
    dropdownOpen,
    // this will break as soon as we are requesting other users
    // TODO: make the me resource remember it's id
    user: getDetail(state, 'user', 'me'),
  };
};

export default withRouter(connectController(mapStateToProps)(HeaderController));
