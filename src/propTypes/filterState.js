import { arrayOf, oneOf, shape } from 'prop-types';
import filterProptype from 'sly/propTypes/datatableFilter';

export default shape({
  logicalOperator: oneOf(['and', 'or']),
  filters: arrayOf(filterProptype),
});
