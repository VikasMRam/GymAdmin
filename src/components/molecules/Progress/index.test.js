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

  it('renders with currentStep as first step', () => {
    const currentStep = steps[0];
    const wrapper = wrap({
      currentStep,
    });

    wrapper.find('Bubble').forEach((b, i) => {
      if (i <= 1) {
        expect(b.prop('checked')).toBeTruthy();
        expect(b.prop('pathHighlighted')).toBeFalsy();
        expect(b.prop('filled')).toBeTruthy();
      } else {
        expect(b.prop('checked')).toBeFalsy();
        expect(b.prop('pathHighlighted')).toBeFalsy();
        expect(b.prop('filled')).toBeFalsy();
      }
    });
  });

  it('renders with currentStep as last step', () => {
    const currentStep = steps[steps.length - 1];
    const wrapper = wrap({
      currentStep,
    });

    wrapper.find('Bubble').forEach((b, i) => {
      if (i < steps.length - 1) {
        expect(b.prop('checked')).toBeTruthy();
        expect(b.prop('pathHighlighted')).toBeTruthy();
        expect(b.prop('filled')).toBeTruthy();
      } else {
        expect(b.prop('checked')).toBeTruthy();
        expect(b.prop('pathHighlighted')).toBeFalsy();
        expect(b.prop('filled')).toBeFalsy();
      }
    });
  });

  it('renders with currentStep as step in between', () => {
    const currentStep = steps[2];
    const wrapper = wrap({
      currentStep,
    });

    wrapper.find('Bubble').forEach((b, i) => {
      if (i < 2) {
        expect(b.prop('checked')).toBeTruthy();
        expect(b.prop('pathHighlighted')).toBeTruthy();
        expect(b.prop('filled')).toBeTruthy();
      } else if (i === 2) {
        expect(b.prop('checked')).toBeTruthy();
        expect(b.prop('pathHighlighted')).toBeFalsy();
        expect(b.prop('filled')).toBeFalsy();
      } else {
        expect(b.prop('checked')).toBeFalsy();
        expect(b.prop('pathHighlighted')).toBeFalsy();
        expect(b.prop('filled')).toBeFalsy();
      }
    });
  });
});

