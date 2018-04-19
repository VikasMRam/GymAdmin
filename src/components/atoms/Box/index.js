import PropTypes from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

const Box = styled.div`
  border: ${size('border')} solid ${palette(2)};
  border-radius: ${size('spacing.tiny')};
  padding: ${size('spacing.large')};
`;

Box.propTypes = {
  palette: PropTypes.string,
};

Box.defaultProps = {
  palette: 'grayscale',
};

export default Box;
