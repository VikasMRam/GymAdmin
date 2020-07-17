import { shape, string, arrayOf, bool } from 'prop-types';

export default arrayOf(shape({
  label: string.isRequired,
  value: string.isRequired,
  type: shape({
    name: string.isRequired,
    allowedExpressions: arrayOf(string).isRequired,
  }).isRequired,
  typeInfo: shape({
    list: arrayOf(string),
    validation: arrayOf(string),
  }),
  isFilterable: bool.isRequired,
  isSortable: bool.isRequired,
}));
