import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';

const Label = styled.label`
  display: block;
  font-size: ${size('text.caption')};
  color: ${palette('base')};
  margin-bottom: ${size('spacing.small')};
  line-height: ${size('lineHeight.title')};
`;

Label.propTypes = {
  palette: string,
};

Label.defaultProps = {
  palette: 'slate',
};

export default Label;
