import { string, shape, bool, arrayOf } from 'prop-types';

import { uuidAux } from './user';

const clientInfo = shape({
  name: string.isRequired,
  email: string.isRequired,
  referralSource: string.isRequired,
  slyMessage: string.isRequired,
});

export const meta = shape({
  rejectReasons: arrayOf(string).isRequired,
});

export default shape({
  id: string,
  archived: bool,
  clientInfo,
  uuid: string,
  uuidAux,
});
