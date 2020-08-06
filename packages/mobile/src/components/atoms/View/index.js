import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

const StyledView = styled.View``;

// skip padding, borderRadius and margin prop from being passed down.
// padding, borderRadius and margin are valid react native props
// but our string equivalent of these props used in css styles is different. Hence skip that prop.
const View = ({ padding, margin, borderRadius, ...props }) =>
  <StyledView {...props} />;

View.propTypes = {
  padding: any,
  margin: any,
  borderRadius: any,
};

export default View;
