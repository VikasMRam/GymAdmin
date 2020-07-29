import styled from 'styled-components';

import Root from './Root';

import {
  withDisplay,
  withColor,
  withSpacing,
  withText,
} from 'sly/common/components/helpers';

const Label = styled(Root)`
  ${withColor}
  ${withSpacing}
  ${withText}
  ${withDisplay}
`;

Label.defaultProps = {
  palette: 'slate',
  display: 'block',
  pad: 'small',
  size: 'caption',
  lineHeight: 'caption',
};

export default Label;
