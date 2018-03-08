import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from 'components';
import { Modal } from 'components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 0.5rem;
  }
`;

class LoginModal extends Component {
  static propTypes = {
    user: PropTypes.object,
    onFacebookLogin: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      this.props.onClose();
    }
  }

  render() {
    const { onFacebookLogin, ...props } = this.props;
    return (
      <Modal title="Login" name="login" closeable {...props}>
        <Wrapper>
          <Button onClick={onFacebookLogin} icon="facebook">
            Connect with Facebook
          </Button>
        </Wrapper>
      </Modal>
    );
  }
}

export default LoginModal;
