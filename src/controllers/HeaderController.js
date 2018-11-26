import { Component } from 'react';
import { func, bool } from 'prop-types';

import { connectController } from 'sly/controllers';

class HeaderController extends Component {
  static propTypes = {
    isDropdownOpen: bool,
    set: func,
    children: func,
  };

  handleToggleDropdown = () => {
    const { isDropdownOpen, set } = this.props;

    set({
      isDropdownOpen: !isDropdownOpen,
    });
  };

  render() {
    const {
      isDropdownOpen,
      children,
    } = this.props;
    const { handleToggleDropdown } = this;

    return children({
      isDropdownOpen,
      toggleDropdown: handleToggleDropdown,
    });
  }
}

const mapStateToProps = (state, { controller }) => ({
  isDropdownOpen: controller.isDropdownOpen,
});

export default connectController(mapStateToProps)(HeaderController);
