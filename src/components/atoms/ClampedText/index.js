import { oneOf, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';

import { size, getKey, palette } from 'sly/components/themes';

const textSize = ({ size: sizeProp }) => size('text', sizeProp);

const ClampedText = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${textSize};
  color: ${palette('base')};
  ${switchProp('weight', {
    medium: css`font-weight: 500;`,
    bold: css`font-weight: bold;`,
  })};
`;

ClampedText.propTypes = {
  size: oneOf(Object.keys(getKey('sizes.text'))),
  palette: oneOf(Object.keys(getKey('palette'))),
  weight: oneOf(['regular', 'medium', 'bold']),
  title: string,
};

ClampedText.defaultProps = {
  size: 'body',
  palette: 'slate',
  weight: 'regular',
};

export default ClampedText;
