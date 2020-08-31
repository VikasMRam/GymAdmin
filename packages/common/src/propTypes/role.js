import { oneOf } from 'prop-types';

import {
  CUSTOMER_ROLE,
  PROVIDER_OD_ROLE,
  AGENT_ND_ROLE,
  AGENT_ADMIN_ROLE,
  PLATFORM_ADMIN_ROLE,
} from 'sly/common/constants/roles';

export default oneOf([
  CUSTOMER_ROLE,
  PROVIDER_OD_ROLE,
  AGENT_ND_ROLE,
  AGENT_ADMIN_ROLE,
  PLATFORM_ADMIN_ROLE,
]);
