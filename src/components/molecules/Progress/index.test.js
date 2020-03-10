import React from 'react';
import { shallow } from 'enzyme';

import Progress from 'sly/components/molecules/Progress';

const steps = ['TIMELINE', 'CARE', 'MEDICAID', 'FINISH'];
const defaultProps = {
  steps,
};

const wrap = (props = {}) => shallow(<Progress {...defaultProps} {...props} />);

describe('Progress', () => {
  it('renders', () => {
    const wrapper = wrap();
    const stepNames = wrapper.find('CenteredBlock');

    expect(wrapper.find('Bubble')).toHaveLength(steps.length);
    expect(stepNames).toHaveLength(steps.length);

    stepNames.forEach((s, i) => {
      expect(s.contains(steps[i])).toBeTruthy();
    });
  });

  it('renders with currentStep', () => {
    const currentStep = steps[1];
    const wrapper = wrap({
      currentStep,
    });

    wrapper.find('Bubble').forEach((b, i) => {
      if (i <= 1) {
        expect(b.prop('checked')).toBeTruthy();
      } else {
        expect(b.prop('checked')).toBeFalsy();
      }
    });
  });
});

