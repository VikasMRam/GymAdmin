import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
  user-select: none;
`;

function generateAlt(src) {
  const srcParts = src.split('/');
  return decodeURIComponent(srcParts.pop());
}

function failedLoadImageHandler(e) {
  e.target.src = require(`!url-loader!./placeholder.png`);
}

const Image = ({ src, ...props }) => {
  const alt = props.alt || generateAlt(src);
  return <StyledImage src={src} {...props} alt={alt} onError={failedLoadImageHandler} />;
};

Image.propTypes = {
  src: string.isRequired,
  alt: string,
};

export default Image;
