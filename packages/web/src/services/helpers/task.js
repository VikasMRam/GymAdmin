import {
  TASK_TOTAL_STAGES,
  TASK_STATUS_DELETED,
  TASK_STATUS_NOT_STARTED,
  TASK_STATUS_ORDERED,
} from 'sly/web/constants/tasks';

export const getTaskStatusDetails = (status) => {
  let palette = 'primary';
  let level = TASK_STATUS_ORDERED.findIndex(v => v === status) + 1;

  if (status === TASK_STATUS_DELETED) {
    level = TASK_TOTAL_STAGES;
    palette = 'danger';
  }
  if (status === TASK_STATUS_NOT_STARTED) {
    palette = 'danger';
  }

  return {
    palette,
    level,
    totalStage: TASK_TOTAL_STAGES,
  };
};
