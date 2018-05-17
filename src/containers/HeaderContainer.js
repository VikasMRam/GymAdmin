import React from 'react';
import { func, bool } from 'prop-types';
import { connect } from 'react-redux';

import Header from 'sly/components/organisms/Header';
import { toggle } from 'sly/store/actions';
import { isHeaderDropdownOpen } from 'sly/store/selectors';

const HeaderContainer = ({
  dispatchToggleAction,
  dropdownOpen,
  onLocationSearch,
}) => {
  const headerItems = [
    { name: 'List on Seniorly', url: '/providers' },
    { name: 'Help Center', url: '/resources' },
    // { name: 'Saved', url: '#' },
    { name: 'Sign Up', url: '/signup' },
    { name: 'Login', url: '/signin' },
  ];
  const menuItems = [
    { name: 'Assisted Living', url: '/assisted-living' },
    { name: "Alzheimer's Care", url: '/alzheimers-care' },
    { name: 'Respite Care', url: '#' },
    { name: 'About Us', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
    { name: 'List on Seniorly', url: '/providers' },
    // { name: 'Sign Out', url: '#' },
  ];

  return (
    <Header
      menuOpen={dropdownOpen}
      onMenuIconClick={dispatchToggleAction}
      onLocationSearch={onLocationSearch}
      headerItems={headerItems}
      menuItems={menuItems}
    />
  );
};

HeaderContainer.propTypes = {
  dispatchToggleAction: func,
  onLocationSearch: func,
  dropdownOpen: bool,
};

const mapStateToProps = (state) => {
  return {
    dropdownOpen: isHeaderDropdownOpen(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchToggleAction: () => dispatch(toggle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
