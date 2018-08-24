import React from 'react';
import { shallow } from 'enzyme';

import LookingFor, { StyledHeading, BoxRadioButtonWrapper, options } from './LookingFor';

import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<LookingFor {...props} />);
const data = {};

describe('LookingFor', () => {
  it('renders', () => {
    const wrapper = wrap({ data });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    boxRadioButtons.children().forEach((boxRadioButton) => {
      expect(boxRadioButton.dive().prop('checked')).toEqual(false);
    });
  });

  it('renders when an option checked', () => {
    const key = stepInputFieldNames.LookingFor[0];
    data[key] = options[3];
    const wrapper = wrap({ data });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton, i) => {
      if (i === 3) {
        expect(boxRadioButton.dive().prop('checked')).toEqual(true);
      } else {
        expect(boxRadioButton.dive().prop('checked')).toEqual(false);
      }
    });
  });
});
