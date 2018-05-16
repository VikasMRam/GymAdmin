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
    { name: 'List on Seniorly', url: '#' },
    { name: 'Help Center', url: '#' },
    { name: 'Saved', url: '#' },
    { name: 'Sign Up', url: '#' },
    { name: 'Login', url: '#' },
  ];
  const menuItems = [
    { name: 'Assisted Living', url: '#' },
    { name: "Alzheimer's Care", url: '#' },
    { name: 'Respite Care', url: '#' },
    { name: 'About Us', url: '#' },
    { name: 'Contact', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'List on Seniorly', url: '#' },
    { name: 'Sign Out', url: '#' },
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
