import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { size, palette, getKey } from 'sly/common/components/themes';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';

const StyledImg = styled(ResponsiveImage)`
  width: ${size('thumbnail.width')};
  height: ${size('thumbnail.height')};

  ${props =>
    props.selected &&
    css`
      border: ${size('border.xxLarge')} solid ${palette('base')};
    `};
`;

const Thumbnail = (props) => {
  const { sizes, sources } = getKey('imageFormats.thumbGallery');
  return <StyledImg sizes={sizes} sources={sources} {...props} />;
};

Thumbnail.propTypes = {
  props: PropTypes.any,
  palette: PropTypes.string,
  selected: PropTypes.bool,
};

Thumbnail.defaultProps = {
  palette: 'slate',
};

export default Thumbnail;
