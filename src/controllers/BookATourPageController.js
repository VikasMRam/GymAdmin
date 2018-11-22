import { Component } from 'react';
import { bool, func } from 'prop-types';

import { connectController } from 'sly/controllers';

class BookATourPageController extends Component {
  static propTypes = {
    set: func,
    isAdvisorHelpVisible: bool,
    isConfirmationModalVisible: bool,
    children: func,
  };

  handleToggleAdvisorHelp = () => {
    const { set, isAdvisorHelpVisible } = this.props;
    set({
      isAdvisorHelpVisible: !isAdvisorHelpVisible,
    });
  };

  handleToggleConfirmationModal = () => {
    const { set, isConfirmationModalVisible } = this.props;
    set({
      isConfirmationModalVisible: !isConfirmationModalVisible,
    });
  };

  render() {
    const {
      children, isAdvisorHelpVisible, isConfirmationModalVisible,
    } = this.props;
    const {
      handleToggleAdvisorHelp, handleToggleConfirmationModal,
    } = this;

    return children({
      isAdvisorHelpVisible,
      isConfirmationModalVisible,
      toggleAdvisorHelp: handleToggleAdvisorHelp,
      toggleConfirmationModal: handleToggleConfirmationModal,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  isAdvisorHelpVisible: controller.isAdvisorHelpVisible,
  isConfirmationModalVisible: controller.isConfirmationModalVisible,
});

export default connectController(mapStateToProps)(BookATourPageController);
