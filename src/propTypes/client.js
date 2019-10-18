import { string, object, shape, bool, arrayOf } from 'prop-types';

import { uuidAux } from './user';

const clientInfo = shape({
  name: string.isRequired,
  email: string,
  phoneNumber: string,
  referralSource: string.isRequired,
  slyMessage: string,
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
  autocomplete_filters: object,
});
