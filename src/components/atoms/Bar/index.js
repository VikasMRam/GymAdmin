import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { prop } from 'styled-tools';

import { size } from 'sly/components/themes';

const Bar = styled.div`
  background-color: ${palette(2, true)};
  height: ${size('text.body')};
  width: ${prop('width')}%;
`;

Bar.propTypes = {
  palette: PropTypes.string,
  width: PropTypes.number,
};

Bar.defaultProps = {
  palette: 'grayscale',
  width: 100,
};

export default Bar;
