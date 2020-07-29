import React from 'react';
import { any } from 'prop-types';
import styled from 'styled-components';

const StyledView = styled.View``;

// skip padding prop from being passed down. padding is a valid react native prop
// but our string padding used in css styles is different. Hence skip that prop.
const View = ({ padding, ...props }) => <StyledView {...props} />;

View.propTypes = {
  padding: any,
};

export default View;
