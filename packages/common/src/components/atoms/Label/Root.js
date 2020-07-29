import React from 'react';
import styled from 'styled-components';

const Label = styled.label``;

// use styled.label so that unnecessary props are not passed to html element
// eslint-disable-next-line jsx-a11y/label-has-for
const Root = props => <Label {...props} />;

export default Root;
