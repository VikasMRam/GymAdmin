import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${palette('base')};
  font-size: ${size('text.caption')};
  height: ${size('element.small')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  padding: 0 1em;
  line-height: 1.5em;
  /* &::before {
    content: "#";
  } */
`;

Tag.propTypes = {
  palette: string,
  size: string,
};

Tag.defaultProps = {
  palette: 'grey',
  size: 'body',
};

export default Tag;
