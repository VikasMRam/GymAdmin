import PropTypes from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const Bar = styled.div`
  background-color: ${palette('base')};
  height: ${size('text.body')};
  width: ${prop('width')}%;
`;

Bar.propTypes = {
  palette: PropTypes.string,
  width: PropTypes.number,
};

Bar.defaultProps = {
  palette: 'slate',
  width: 100,
};

export default Bar;
