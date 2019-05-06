import { FAMILY_STAGE_ORDERED, TOTAL_STAGES_COUNT, FAMILY_STAGE_NEW } from 'sly/constants/familyDetails';

const stageArr = Object.keys(FAMILY_STAGE_ORDERED);

export const getStageDetails = (stageName) => {
  let level = -1;
  let levelGroup = '';
  let palette = 'primary';
  let disableUpdateButton = false;
  let disableAddNoteButton = false;
  let showAcceptRejectButtons = false;
  let showUpdateAddNoteButtons = false;
  let showPauseButton = false;
  const showRejectOption = stageName === FAMILY_STAGE_NEW;

  stageArr.forEach((s, idx) => {
    if (level === -1) {
      const i = FAMILY_STAGE_ORDERED[s].findIndex(t => t === stageName);
      if (i !== -1) {
        level = i + 1;
        levelGroup = s;
        if (stageArr.length - 1 === idx) {
          palette = 'danger';
          level = TOTAL_STAGES_COUNT;
          disableAddNoteButton = true;
          disableUpdateButton = true;
        }
        if (idx === 0 && i === 0) {
          showAcceptRejectButtons = true;
        } else {
          showUpdateAddNoteButtons = true;
          if (idx === 1) {
            showPauseButton = true;
          }
        }
      }
    }
  });

  return {
    level,
    levelGroup,
    palette,
    disableAddNoteButton,
    disableUpdateButton,
    showAcceptRejectButtons,
    showUpdateAddNoteButtons,
    showPauseButton,
    showRejectOption,
  };
};
