import React from 'react';
import { oneOf, node, func, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, switchProp } from 'styled-tools';

import { size, palette, key } from 'sly/web/components/themes';
import IconButton from 'sly/web/components/molecules/IconButton';

const Wrapper = styled.div`
  visibility: ${ifProp('isOpen', 'visible', 'hidden')};
  transform: ${ifProp('isOpen', 'translate(0%)', 'translate(100%)')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  padding: ${size('spacing.regular')} ${size('spacing.large')};
  border-radius: ${size('spacing.small')};
  ${switchProp('type', {
    default: css`background-color: ${palette('slate', 'base')};`,
    error: css`background-color: ${palette('danger', 'base')};`,
  })};
  color: ${palette('white', 'base')};
  transition: all ${key('transitions.slow.inOut')};
`;

const Notification = ({
  type, isOpen, closeable, closeButtonPalette, onClose, children,
}) => (
  <Wrapper type={type} isOpen={isOpen}>
    {children}
    {closeable &&
      <IconButton
        icon="close"
        iconSize="small"
        transparent
        onClick={onClose}
        palette={closeButtonPalette}
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
