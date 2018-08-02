import React from 'react';
import { shallow } from 'enzyme';

import BuyingOrRenting, { StyledHeading, BoxRadioButtonWrapper, options } from './BuyingOrRenting';
import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<BuyingOrRenting {...props} />);

const data = {};

describe('BuyingOrRenting', () => {
  it('renders', () => {
    const wrapper = wrap({ data });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton) => {
      expect(boxRadioButton.dive().prop('checked')).toEqual(false);
    });
  });

  it('renders when buying checked', () => {
    const dataBuyingChecked = { ...data };
    const key = stepInputFieldNames.BuyingOrRenting[0];
    dataBuyingChecked[key] = options[0];
    const wrapper = wrap({ data: dataBuyingChecked });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton, i) => {
      if (i === 0) {
        expect(boxRadioButton.dive().prop('checked')).toEqual(true);
      } else {
        expect(boxRadioButton.dive().prop('checked')).toEqual(false);
      }
    });
  });

  it('renders when renting checked', () => {
    const dataBuyingChecked = { ...data };
    const key = stepInputFieldNames.BuyingOrRenting[0];
    dataBuyingChecked[key] = options[1];
    const wrapper = wrap({ data: dataBuyingChecked });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton, i) => {
      if (i === 1) {
        expect(boxRadioButton.dive().prop('checked')).toEqual(true);
      } else {
        expect(boxRadioButton.dive().prop('checked')).toEqual(false);
      }
    });
  });
});
