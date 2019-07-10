import { FAMILY_STAGE_ORDERED, TOTAL_STAGES_COUNT, FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/constants/familyDetails';

const stageArr = Object.keys(FAMILY_STAGE_ORDERED);

export const getStageDetails = (stageName) => {
  let level = -1;
  let levelGroup = '';
  let palette = 'primary';
  const disableUpdateButton = stageName === FAMILY_STAGE_REJECTED;
  const disableAddNoteButton = stageName === FAMILY_STAGE_REJECTED;
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
        }
        if (idx === 0 && i === 0) {
          showAcceptRejectButtons = true;
        } else {
          showUpdateAddNoteButtons = true;
          if (idx === 1) {
            showPauseButton = true;
          }
        }
        if (idx === 2 && i === 0) { // whens stage is WON
          palette = 'green';
        }
      }
    }
  });

  const canEditFamilyDetails = levelGroup === stageArr[1]; // Connected
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
    canEditFamilyDetails,
  };
};
