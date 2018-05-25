import React from 'react';
import { func, bool, array, arrayOf, number } from 'prop-types';
import { connect } from 'react-redux';

import Header from 'sly/components/organisms/Header';
import { toggle } from 'sly/store/actions';
import { isHeaderDropdownOpen } from 'sly/store/selectors';

const HeaderContainer = ({
  dispatchToggleAction,
  dropdownOpen,
  onLocationSearch,
  headerItems,
  menuItems,
  menuItemHrIndices,
}) => {
  return (
    <Header
      menuOpen={dropdownOpen}
      onMenuIconClick={dispatchToggleAction}
      onMenuItemClick={dispatchToggleAction}
      onLocationSearch={onLocationSearch}
      headerItems={headerItems}
      menuItems={menuItems}
      menuItemHrIndices={menuItemHrIndices}
    />
  );
};

HeaderContainer.propTypes = {
  dispatchToggleAction: func,
  onLocationSearch: func,
  dropdownOpen: bool,
  headerItems: array,
  menuItems: array,
  menuItemHrIndices: arrayOf(number),
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
