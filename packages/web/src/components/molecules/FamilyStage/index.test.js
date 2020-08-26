import React from 'react';
import { shallow } from 'enzyme';

import FamilyStage from 'sly/web/components/molecules/FamilyStage';
import { FAMILY_STAGE_ORDERED } from 'sly/web/constants/familyDetails';
import AmalFrancis from 'sly/storybook/sample-data/user-amal-francis.json';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';

const stageGroups = Object.keys(FAMILY_STAGE_ORDERED);
const newStage = FAMILY_STAGE_ORDERED[stageGroups[0]][0];
const fitem = FAMILY_STAGE_ORDERED[stageGroups[stageGroups.length - 1]];
const endStage = fitem[fitem.length - 1];
const interStage = FAMILY_STAGE_ORDERED[stageGroups[1]][1];

const defaultProps = {
  stageText: newStage,
  user: AmalFrancis,
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<FamilyStage {...defaultProps} {...props} />);

describe('FamilyStage', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PaddedStage').prop('stage')).toContain(newStage);
  });

  it('renders intermediate stage', () => {
    const wrapper = wrap({
      stageText: interStage,
    });
    expect(wrapper.find('PaddedStage').prop('stage')).toContain(interStage);
  });

  it('renders end stage', () => {
    const wrapper = wrap({
      stageText: endStage,
    });
    expect(wrapper.find('PaddedStage').prop('stage')).toContain(endStage);
  });

  it('onAcceptClick is triggered', () => {
    const onAcceptClick = jest.fn();
    const wrapper = wrap({
      onAcceptClick,
    });

    wrapper.find('MarginBottomFullWidthButton').simulate('click');
    expect(onAcceptClick).toHaveBeenCalled();
  });

  it('onRejectClick is triggered', () => {
    const onRejectClick = jest.fn();
    const wrapper = wrap({
      onRejectClick,
    });

    wrapper.find('FullWidthButton').simulate('click');
    expect(onRejectClick).toHaveBeenCalled();
  });

  it('onAddNoteClick is triggered', () => {
    const onAddNoteClick = jest.fn();
    const wrapper = wrap({
      onAddNoteClick,
      stageText: interStage,
    });

    wrapper.find('FullWidthButton').simulate('click');
    expect(onAddNoteClick).toHaveBeenCalled();
  });

  it('onUpdateClick is triggered', () => {
    const onUpdateClick = jest.fn();
    const wrapper = wrap({
      onUpdateClick,
      stageText: endStage,
    });

    wrapper.find('MarginBottomFullWidthButton').simulate('click');
    expect(onUpdateClick).toHaveBeenCalled();
  });
});
