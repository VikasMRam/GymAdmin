import { string, shape } from 'prop-types';

import uuidAux from './uuidAux';

export default shape({
  id: string,
  uuidAux,
});
