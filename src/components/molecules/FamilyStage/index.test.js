import React from 'react';
import { shallow } from 'enzyme';

import FamilyStage from 'sly/components/molecules/FamilyStage';

const stageText = 'test';
const stageLevel = 2;
const defaultProps = {
  stageText,
  stageLevel,
};
const wrap = (props = {}) => shallow(<FamilyStage {...defaultProps} {...props} />);

describe('FamilyStage', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('PaddedStage').props()).toEqual({ text: stageText, currentStage: stageLevel });
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
});
