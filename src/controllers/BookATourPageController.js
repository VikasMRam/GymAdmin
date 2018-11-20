import { Component } from 'react';
import { bool, func } from 'prop-types';

import { connectController } from 'sly/controllers';

class BookATourPageController extends Component {
  static propTypes = {
    set: func,
    isAdvisorHelpVisible: bool,
    children: func,
  };

  handleToggleAdvisorHelp = () => {
    const { set, isAdvisorHelpVisible } = this.props;

    set({
      isAdvisorHelpVisible: !isAdvisorHelpVisible,
    });
  }

  render() {
    const { children, isAdvisorHelpVisible } = this.props;
    const { handleToggleAdvisorHelp } = this;

    return children({
      isAdvisorHelpVisible, toggleAdvisorHelp: handleToggleAdvisorHelp,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  isAdvisorHelpVisible: controller.isAdvisorHelpVisible,
});

export default connectController(mapStateToProps)(BookATourPageController);
