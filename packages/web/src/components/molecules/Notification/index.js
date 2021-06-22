import React from 'react';
import { oneOf, node, func, bool } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { key } from 'sly/common/components/themes';
import { CheckmarkCircle, Warning, Close } from 'sly/common/icons';
import { sx$laptop, element, color, space } from 'sly/common/system';

const Wrapper = styled.div`
  visibility: ${ifProp('isOpen', 'visible', 'hidden')};
  transform: ${ifProp('isOpen', 'translate(0%)', 'translate(100%)')};
  display: flex;
  align-items: center;
  white-space: nowrap;
  width:100%;
  height:${element('l')};
  padding: ${space('s')} ${space('l')};
  background:${color('slate.base')};
  color: ${color('white.base')};
  transition: all ${key('transitions.slow.inOut')};


  ${sx$laptop({
    width: 'col8',
    bottom: space('l'),
    mx: 'auto',
  })}
`;

const Notification = ({
  type, isOpen, closeable, closeButtonPalette, onClose, children,
}) => (
  <Wrapper type={type} isOpen={isOpen}>
    {type === 'error' ?  <Warning color="red" mr="s" /> : <CheckmarkCircle mr="s" color="primary" /> }
    {children}
    {closeable &&
      <Close
        ml="auto"
        onClick={onClose}
        color={closeButtonPalette}
      />
    }
  </Wrapper>
);

Notification.propTypes = {
  type: oneOf(['default', 'error']).isRequired,
  children: node,
  onClose: func,
  closeable: bool,
  isOpen: bool,
  closeButtonPalette: oneOf(['white', 'slate']),
};

Notification.defaultProps = {
  type: 'default',
  closeable: true,
  closeButtonPalette: 'white',
};

export default Notification;
