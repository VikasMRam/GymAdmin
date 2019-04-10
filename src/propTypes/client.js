import { string, shape } from 'prop-types';

import uuidAux from './user';

export default shape({
  id: string,
  name: string,
  uuidAux,
});
