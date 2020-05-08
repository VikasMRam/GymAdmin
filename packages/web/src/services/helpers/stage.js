import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_WON,
  FAMILY_STAGE_LOST,
  FAMILY_STAGE_REJECTED,
  TOTAL_STAGES_COUNT,
} from 'sly/constants/familyDetails';

const stagesIndex = Object.entries(FAMILY_STAGE_ORDERED)
  .reduce((acc, [group, stages], groupIndex) => {
    stages.forEach((stage, stageIndex) => {
      acc.push({ group, stage, groupIndex, stageIndex });
    });
    return acc;
  }, []);

export const getPaletteFor = (stage) => {
  switch (stage) {
    case FAMILY_STAGE_LOST:
    case FAMILY_STAGE_REJECTED: return 'danger';
    case FAMILY_STAGE_WON: return 'green';
    default: return 'primary';
  }
};

const stageGroupNames = Object.keys(FAMILY_STAGE_ORDERED);

export const getStageDetails = (stageName) => {
  const {
    group,
    stage,
    groupIndex,
    stageIndex,
  } = stagesIndex.find(stage => stage.stage === stageName);

  let level = stageIndex + 1;
  const palette = getPaletteFor(stage);
  const stageGroupsStatuses = stageGroupNames
    .reduce((acc, gn) => {
      acc[`is${gn}`] = group === gn;
      return acc;
    }, {});
  const isRejected = stageName === FAMILY_STAGE_REJECTED;
  // if Closed stage level full - to fill all pills
  if (groupIndex === stageGroupNames.length - 1) {
    level = TOTAL_STAGES_COUNT;
  }

  return {
    palette,
    isRejected,
    group,
    stage,
    level,
    groupIndex,
    stageIndex,
    ...stageGroupsStatuses,
  };
};
