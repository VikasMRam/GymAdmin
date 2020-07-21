import { oneOf } from 'prop-types';

export default {
  propTypes: {
    level: oneOf(['hero', 'title', 'subtitle']).isRequired,
  },
  defaultProps: {
    level: 'title',
    palette: 'slate',
    variation: 'base',
    weight: 'medium',
  },
};
