import React, { useEffect } from 'react';
import { func, number, bool } from 'prop-types';
import styled from 'styled-components';

import Pin from './Pin';

const Wrapper = styled.div``;

const Marker = ({
  active,
  number,
  ...props
}) => {
  return (
    <Wrapper
      {...props}
    >
      <Pin
        number={number}
        active={active}
        css={{
          transform: 'translate(-50%, -100%)',
          position: 'absolute',
          zIndex: active ? 900 : (800 - number),
          cursor: 'pointer',
        }}
        {...props}
      />
    </Wrapper>
  );
};

Marker.propTypes = {
  active: bool,
  number: number.isRequired,
  $hover: bool,
  onHover: func,
  onLeave: func,
};

export default Marker;
