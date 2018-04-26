import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Image from 'sly/components/atoms/Image';

const StyledImg = styled(Image)`
  width: ${size('thumbnail.width')};
  height: ${size('thumbnail.height')};

  ${props =>
    props.selected &&
    css`
      border: ${size('border.xLarge')} solid ${palette(0)};
    `};
`;

const Thumbnail = props => <StyledImg {...props} />;

Thumbnail.propTypes = {
  props: PropTypes.any,
  palette: PropTypes.string,
  selected: PropTypes.bool,
};

Thumbnail.defaultProps = {
  palette: 'slate',
};

export default Thumbnail;
