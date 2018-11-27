import { Component } from 'react';
import { bool, func, string } from 'prop-types';

import { connectController } from 'sly/controllers';

class FullScreenWizardController extends Component {
  static propTypes = {
    set: func,
    isAdvisorHelpVisible: bool,
    isConfirmationModalVisible: bool,
    type: string,
    children: func,
  };

  static defaultProps = {
    isConfirmationModalVisible: false,
  }

  handleToggleAdvisorHelp = () => {
    const { set, isAdvisorHelpVisible } = this.props;
    set({
      isAdvisorHelpVisible: !isAdvisorHelpVisible,
    });
  };

  handleToggleConfirmationModal = (type) => {
    const { set, isConfirmationModalVisible } = this.props;
    let typeToBeSet = null;
    if (!isConfirmationModalVisible) {
      typeToBeSet = type;
    }
    set({
      type: typeToBeSet,
      isConfirmationModalVisible: !isConfirmationModalVisible,
    });
  };

  render() {
    const {
      children, isAdvisorHelpVisible, isConfirmationModalVisible, type,
    } = this.props;
    const {
      handleToggleAdvisorHelp, handleToggleConfirmationModal,
    } = this;

    return children({
      isAdvisorHelpVisible,
      isConfirmationModalVisible,
      toggleAdvisorHelp: handleToggleAdvisorHelp,
      toggleConfirmationModal: handleToggleConfirmationModal,
      type,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  isAdvisorHelpVisible: controller.isAdvisorHelpVisible,
  isConfirmationModalVisible: controller.isConfirmationModalVisible,
  type: controller.type,
});

export default connectController(mapStateToProps)(FullScreenWizardController);
