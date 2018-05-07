import { string, bool } from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';

const Label = styled.label`
  display: block;
  font-size: ${size('text', 'body')};
  color: ${ifProp('invalid', palette('danger', 0), palette(0))};
  margin-bottom: ${size('spacing.small')};
`;

Label.propTypes = {
  palette: string,
};

Label.defaultProps = {
  palette: 'slate',
};

export default Label;
