import React from 'react';
import { shallow } from 'enzyme';

import FamilyStage from 'sly/components/molecules/FamilyStage';
import { FAMILY_STAGE_ORDERED, TOTAL_STAGES_COUNT } from 'sly/constants/familyDetails';

const stageGroups = Object.keys(FAMILY_STAGE_ORDERED);
const newStage = FAMILY_STAGE_ORDERED[stageGroups[0]][0];
const newStageLevel = 1;
const fitem = FAMILY_STAGE_ORDERED[stageGroups[stageGroups.length - 1]];
const endStage = fitem[fitem.length - 1];
const endStageLevel = TOTAL_STAGES_COUNT;
const interStage = FAMILY_STAGE_ORDERED[stageGroups[1]][1];
const interStageLevel = 2;
const defaultProps = {
  stageText: newStage,
};
const wrap = (props = {}) => shallow(<FamilyStage {...defaultProps} {...props} />);

describe('FamilyStage', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PaddedStage').prop('text')).toContain(newStage);
    expect(wrapper.find('PaddedStage').prop('currentStage')).toBe(newStageLevel);
  });

  it('renders intermediate stage', () => {
    const wrapper = wrap({
      stageText: interStage,
    });
    expect(wrapper.find('PaddedStage').prop('text')).toContain(interStage);
    expect(wrapper.find('PaddedStage').prop('currentStage')).toBe(interStageLevel);
  });

  it('renders end stage', () => {
    const wrapper = wrap({
      stageText: endStage,
    });
    expect(wrapper.find('PaddedStage').prop('text')).toContain(endStage);
    expect(wrapper.find('PaddedStage').prop('currentStage')).toBe(endStageLevel);
  });

  it('onAcceptClick is triggered', () => {
    const onAcceptClick = jest.fn();
    const wrapper = wrap({
      onAcceptClick,
    });

    wrapper.dive().find('MarginBottomFullWidthButton').simulate('click');
    expect(onAcceptClick).toHaveBeenCalled();
  });

  it('onRejectClick is triggered', () => {
    const onRejectClick = jest.fn();
    const wrapper = wrap({
      onRejectClick,
    });

    wrapper.dive().find('FullWidthButton').simulate('click');
    expect(onRejectClick).toHaveBeenCalled();
  });

  it('onAddNoteClick is triggered', () => {
    const onAddNoteClick = jest.fn();
    const wrapper = wrap({
      onAddNoteClick,
      stageText: interStage,
    });

    wrapper.dive().find('FullWidthButton').simulate('click');
    expect(onAddNoteClick).toHaveBeenCalled();
  });

  it('onUpdateClick is triggered', () => {
    const onUpdateClick = jest.fn();
    const wrapper = wrap({
      onUpdateClick,
      stageText: endStage,
    });

    wrapper.dive().find('MarginBottomFullWidthButton').simulate('click');
    expect(onUpdateClick).toHaveBeenCalled();
  });
});
