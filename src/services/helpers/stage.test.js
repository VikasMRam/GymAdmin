import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STAGE_ORDERED, FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/constants/familyDetails';

describe('stage', () => {
  it('getStageDetails - showPauseButton is false in Prospects stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Prospects;
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showPauseButton).toBeFalsy();
    });
  });

  it('getStageDetails - showPauseButton is true in Connected stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Connected;
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showPauseButton).toBeTruthy();
    });
  });

  it('getStageDetails - showPauseButton is false in Closed stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Closed;
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showPauseButton).toBeFalsy();
    });
  });

  it('getStageDetails - showRejectOption is false in all other Prospects stage', () => {
    const r = getStageDetails(FAMILY_STAGE_NEW);
    expect(r.showRejectOption).toBeTruthy();
  });

  it('getStageDetails - showRejectOption is false in all other Prospects stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Prospects.splice(1);
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showRejectOption).toBeFalsy();
    });
  });

  it('getStageDetails - showRejectOption is false in Connected stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Connected;
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showRejectOption).toBeFalsy();
    });
  });

  it('getStageDetails - showRejectOption is false in Connected stage', () => {
    const stages = FAMILY_STAGE_ORDERED.Closed;
    stages.forEach((s) => {
      const r = getStageDetails(s);
      expect(r.showRejectOption).toBeFalsy();
    });
  });

  it('getStageDetails - disableUpdateButton is true in Rejected stage', () => {
    const r = getStageDetails(FAMILY_STAGE_REJECTED);
    expect(r.disableUpdateButton).toBeTruthy();
  });

  it('getStageDetails - disableAddNoteButton is true in Rejected stage', () => {
    const r = getStageDetails(FAMILY_STAGE_REJECTED);
    expect(r.disableAddNoteButton).toBeTruthy();
  });
});
