import {
  TASK_STATUS_LABEL_MAP,
  TASK_TOTAL_STAGES,
  TASK_STATUS_DELETED,
  TASK_STATUS_INITED,
  TASK_STATUS_ORDERED,
} from 'sly/constants/tasks';

export const getTaskStatusDetails = (status) => {
  let palette = 'primary';
  let level = TASK_STATUS_ORDERED.find(v => v === status) + 1;
  const stageLabel = TASK_STATUS_LABEL_MAP[status];

  if (status === TASK_STATUS_DELETED) {
    level = TASK_TOTAL_STAGES;
    palette = 'danger';
  }
  if (status === TASK_STATUS_INITED) {
    palette = 'danger';
  }

  return {
    palette,
    level,
    stageLabel,
    totalStage: TASK_TOTAL_STAGES,
  };
};
