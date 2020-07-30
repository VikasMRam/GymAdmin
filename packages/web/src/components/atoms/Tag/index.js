import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${palette('primary', 'base')};
  color: ${palette('white', 'base')};
  letter-spacing: ${size('spacing.nano')};
  line-height: ${size('spacing.large')};
  font-size: ${size('spacing.medium')};
  height: ${size('spacing.xLarge')};
  border-radius: ${size('spacing.small')};
  padding: 0 ${size('spacing.regular')};
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
