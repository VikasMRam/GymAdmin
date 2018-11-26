import { Component } from 'react';
import { func, string } from 'prop-types';

import { connectController } from 'sly/controllers';

class JoinSlyButtonsController extends Component {
  static propTypes = {
    set: func,
    socialLoginError: string,
    children: func,
  };

  setSocialLoginError = (msg) => {
    const { set } = this.props;
    set({
      socialLoginError: msg,
    });
  };

  render() {
    const {
      children,
      socialLoginError,
    } = this.props;
    const { setSocialLoginError } = this;

    return children({
      socialLoginError,
      setSocialLoginError,
    });
  }
}

const mapStateToProps = (state, { controller }) => ({
  socialLoginError: controller.socialLoginError || '',
});

export default connectController(mapStateToProps)(JoinSlyButtonsController);
