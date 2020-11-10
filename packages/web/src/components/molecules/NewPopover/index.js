import React, { useRef, useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { bool, func, node } from 'prop-types';

import { withShadow } from 'sly/common/components/helpers';

const PopoverBlock = styled.div`
  background: white;
  width: 360px;
  z-index: 1000;
  ${withShadow}
`;

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
      shadowBlur="regular"
      shadowSpread="tiny"
      shadowVOffset="small"
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
