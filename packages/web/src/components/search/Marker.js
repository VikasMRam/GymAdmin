import React, { useEffect } from 'react';
import { func, number, bool, object } from 'prop-types';
import styled from 'styled-components';

import Pin from './Pin';

const Wrapper = styled.div``;


const Marker = ({
  active,
  number,
  markerHover,
  isCommunityHoveredInList,
  community,
  ...props
}) => {
  const { tags } = community;
  let isVerified = false;
  let isPlus = false;
  isVerified = !!tags && !!tags.length ? tags.includes('VERIFIED') : false;
  isPlus = !!tags && !!tags.length ? tags.includes('PLUS') : false;
  return (
    <Wrapper
      {...props}
    >
      <Pin
        number={number}
        active={active}
        markerHover={markerHover}
        isCommunityHoveredInList={isCommunityHoveredInList}
        isVerified={isVerified}
        isPlus={isPlus}
        css={{
          transform: 'translate(-50%, -100%)',
          position: 'absolute',
          zIndex: (active || markerHover || isCommunityHoveredInList) ? 900 : (800 - number),
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
  community: object,
  markerHover: bool,
  isCommunityHoveredInList: bool,
};

export default Marker;
