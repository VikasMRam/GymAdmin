import React, { useRef, useCallback, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { bool, func, node } from 'prop-types';

import { withShadow, withBorder } from 'sly/common/components/helpers';

const PopoverBlock = styled.div(
  withShadow,
  withBorder,
  css`
    background: white;
    width: 360px;
    z-index: 2001;
    border-radius: 4px;
  `,
);

PopoverBlock.defaultProps = {
  shadow: 'regular',
  border: 'regular',
};

const Popover = ({ onClose, isOpen, children, ...props }) => {
  const blockRef = useRef();

  const onDocumentClick = useCallback((event) => {
    if (isOpen
      && document.contains(event.target)
      && !blockRef.current.contains(event.target)
    ) {
      onClose();
    }
  }, [isOpen, onClose]);

  const onKeyUp = useCallback((event) => {
    if (isOpen && event.code === 'Escape') {
      onClose();
    }
  }, [isOpen, onClose]);

  useLayoutEffect(() => {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onDocumentClick, onKeyUp]);

  return (
    <PopoverBlock
      ref={blockRef}
      {...props}
    >
      {children}
    </PopoverBlock>
  );
};

Popover.propTypes = {
  onClose: func,
  isOpen: bool,
  children: node,
};

export default Popover;
