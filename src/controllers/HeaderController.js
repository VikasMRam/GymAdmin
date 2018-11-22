import React, { Component, Fragment } from 'react';
import { func, bool, object, string } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { SAVED_COMMUNITIES } from 'sly/constants/modalType';

import { connectController } from 'sly/controllers';
import { getDetail } from 'sly/store/selectors';
import { getSearchParams } from 'sly/services/helpers/search';
import { getQueryParamsSetter } from 'sly/services/helpers/queryParams';
import { resourceDeleteRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { ensureAuthenticated, entitiesReceive } from 'sly/store/actions';

import SavedCommunitiesPopupController from 'sly/controllers/SavedCommunitiesPopupController';
import AuthContainer from 'sly/containers/AuthContainer';
import NotificationController from 'sly/controllers/NotificationController';
import Notifications from 'sly/components/organisms/Notifications';
import Header from 'sly/components/organisms/Header';

const defaultHeaderItems = [
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Saved' },
  { name: 'List Your Property', url: '/providers' },
];

const defaultMenuItems = [
  { name: 'Home', url: '/' },
  { name: '(855) 866-4515', url: 'tel:+18558664515' },
  { name: 'Resources', url: '/resources' },
  { name: 'How It Works', url: '/how-it-works' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: 'Memory Care', url: '/memory-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'Our Company', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
  { name: 'List on Seniorly', url: '/providers' },
];

const loginHeaderItems = user => user
  ? []
  : [{ name: 'Sign in' }];

const loginMenuItems = user => loginHeaderItems(user)
  .concat(user
    ? [{ name: 'Log out' }]
    : []);

const menuItemHrIndices = [7, 10];

class HeaderController extends Component {
  static propTypes = {
    dropdownOpen: bool,
    user: object,
    set: func,
    setQueryParams: func,
    searchParams: object,
    logoutUser: func,
    fetchUser: func,
    history: object,
    match: object,
    location: object,
    ensureAuthenticated: func,
    className: string.isRequired,
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
      setQueryParams,
      logoutUser,
      fetchUser,
      className,
      ensureAuthenticated,
    } = this.props;

    const hItems = defaultHeaderItems;
    const lhItems = loginHeaderItems(user);
    const lmItems = loginMenuItems(user);

    const savedHeaderItem = hItems.find(item => item.name === 'Saved');
    if (savedHeaderItem) {
      savedHeaderItem.onClick = () => ensureAuthenticated(() => setQueryParams({ modal: SAVED_COMMUNITIES }));
    }
    const logoutLeftMenuItem = lmItems.find(item => item.name === 'Log out');
    if (logoutLeftMenuItem) {
      logoutLeftMenuItem.onClick = () => {
        logoutUser().then(() => fetchUser());
      };
    }
    let loginItem = lhItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
    }
    loginItem = lmItems.find(item => item.name === 'Sign in');
    if (loginItem) {
      loginItem.onClick = () => ensureAuthenticated(() => {});
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
          className={className}
        />
        <NotificationController>
          {({
            notifyInfo,
            messages,
            dismiss,
          }) => (
            <Fragment>
              {user !== null && <SavedCommunitiesPopupController notifyInfo={notifyInfo} />}
              <AuthContainer notifyInfo={notifyInfo} />
              <Notifications messages={messages} dismiss={dismiss} />
            </Fragment>
          )}
        </NotificationController>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, {
  history, match, location, controller,
}) => ({
  setQueryParams: getQueryParamsSetter(history, location),
  searchParams: getSearchParams(match, location),
  dropdownOpen: controller.dropdownOpen,
  // this will break as soon as we are requesting other users
  // TODO: make the me resource remember it's id
  user: getDetail(state, 'user', 'me'),
});

const mapDispatchToProps = (dispatch) => {
  return {
    ensureAuthenticated: action => dispatch(ensureAuthenticated(action)),
    logoutUser: () => dispatch(resourceDeleteRequest('logout')),
    // TODO: FIXME: Temp solution to set the entity and resource of user me to null as the response is not jsonapi
    fetchUser: () => dispatch(resourceDetailReadRequest('user', 'me'))
      .catch(() => dispatch(entitiesReceive({ user: { me: null } }))),
  };
};

export default withRouter(connectController(mapStateToProps, mapDispatchToProps)(HeaderController));
