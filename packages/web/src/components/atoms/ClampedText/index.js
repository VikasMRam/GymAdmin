import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { text as textPropType } from 'sly/propTypes/text';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { weight as weightPropType } from 'sly/propTypes/weight';

const textSize = ({ size: sizeProp }) => size('text', sizeProp);

const ClampedText = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${textSize};
  color: ${palette('base')};
  font-weight: ${p => size('weight', p.weight)};
`;

ClampedText.propTypes = {
  size: textPropType,
  palette: palettePropType,
  weight: weightPropType,
  title: string,
};

ClampedText.defaultProps = {
  size: 'body',
  palette: 'slate',
  weight: 'regular',
};

export default ClampedText;
