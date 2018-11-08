import { oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, getKey, palette } from 'sly/components/themes';

const textSize = ({ size: sizeProp }) => size('text', sizeProp);

const ClampedText = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: ${textSize};
  color: ${palette('base')};
`;

ClampedText.propTypes = {
  size: oneOf(Object.keys(getKey('sizes.text'))),
  palette: oneOf(Object.keys(getKey('palette'))),
  title: string,
};

ClampedText.defaultProps = {
  size: 'body',
  palette: 'slate',
};

export default ClampedText;
