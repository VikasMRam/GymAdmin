import { string, shape, oneOf } from 'prop-types';

import user from './user';

import {
  TASK_STATUS_DELETED,
  TASK_STATUS_NOT_STARTED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_COMPLETED,
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_MED,
  TASK_PRIORITY_HIGH,
} from 'sly/constants/tasks';

export default shape({
  id: string,
  description: string,
  priority: oneOf([
    TASK_PRIORITY_LOW,
    TASK_PRIORITY_MED,
    TASK_PRIORITY_HIGH,
  ]),
  status: oneOf([
    TASK_STATUS_DELETED,
    TASK_STATUS_NOT_STARTED,
    TASK_STATUS_IN_PROGRESS,
    TASK_STATUS_COMPLETED,
  ]).isRequired,
  creator: user,
  owner: user,
});
