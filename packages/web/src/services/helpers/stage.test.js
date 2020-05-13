import { getStageDetails, getPaletteFor } from 'sly/web/services/helpers/stage';
import {
  FAMILY_STAGE_ORDERED,
  FAMILY_STAGE_REJECTED,
  TOTAL_STAGES_COUNT,
} from 'sly/web/constants/familyDetails';

const allStages = Object.entries(FAMILY_STAGE_ORDERED)
  .reduce((acc, [, stages]) => [...acc, ...stages], []);

const groups = Object.keys(FAMILY_STAGE_ORDERED);

describe('stage', () => {
  describe('getStageDetails', () => {
    it('palette correct according to stage', () => {
      allStages.forEach((s) => {
        const { palette } = getStageDetails(s);

        expect(palette).toBe(getPaletteFor(s));
      });
    });

    it('isRejected true when stage is rejected', () => {
      const { isRejected } = getStageDetails(FAMILY_STAGE_REJECTED);

      expect(isRejected).toBeTruthy();
    });

    it('isRejected false when stage is not rejected', () => {
      allStages.filter(s => s !== FAMILY_STAGE_REJECTED).forEach((s) => {
        const { isRejected } = getStageDetails(s);

        expect(isRejected).toBeFalsy();
      });
    });

    it('correct group is returned', () => {
      allStages.forEach((s) => {
        const { group } = getStageDetails(s);
        const gIndex = FAMILY_STAGE_ORDERED[group].indexOf(s);

        expect(gIndex).not.toBe(-1);
      });
    });

    it('correct stage is returned', () => {
      allStages.forEach((s) => {
        const { stage } = getStageDetails(s);

        expect(stage).toBe(s);
      });
    });

    it('correct level is returned', () => {
      allStages.forEach((s) => {
        const { level, group } = getStageDetails(s);
        if (group === groups[groups.length - 1]) {
          expect(level).toBe(TOTAL_STAGES_COUNT);
        } else {
          const lIndex = FAMILY_STAGE_ORDERED[group].indexOf(s);

          expect(level).toBe(lIndex + 1);
        }
      });
    });

    it('correct groupIndex is returned', () => {
      allStages.forEach((s) => {
        const { group, groupIndex } = getStageDetails(s);
        const gIndex = groups.indexOf(group);

        expect(groupIndex).toBe(gIndex);
      });
    });

    it('correct stageIndex is returned', () => {
      allStages.forEach((s) => {
        const { stageIndex, group } = getStageDetails(s);
        const lIndex = FAMILY_STAGE_ORDERED[group].indexOf(s);

        expect(stageIndex).toBe(lIndex);
      });
    });

    it('correct stage group status is returned', () => {
      groups.forEach((gn) => {
        const statusKey = `is${gn}`;

        FAMILY_STAGE_ORDERED[gn].forEach((s) => {
          const r = getStageDetails(s);

          expect(r[statusKey]).toBeTruthy();
          groups.filter(g => g !== gn).forEach((gn) => {
            const statusKey = `is${gn}`;

            expect(r[statusKey]).toBeFalsy();
          });
        });
      });
    });
  });
});
