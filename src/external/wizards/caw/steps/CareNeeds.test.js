import React from 'react';
import { shallow } from 'enzyme';

import CareNeeds, { StyledHeading, Description, BoxRadioButtonWrapper, options } from './CareNeeds';
import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<CareNeeds {...props} />);

const data = {};

describe('CareNeeds', () => {
  it('renders', () => {
    const wrapper = wrap({ data });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(wrapper.find(Description)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton) => {
      expect(boxRadioButton.dive().prop('checked')).toEqual(false);
    });
  });

  it('renders when one care need checked', () => {
    const dataCareNeedChecked = { ...data };
    const key = stepInputFieldNames.CareNeeds[0];
    dataCareNeedChecked[key] = {};
    dataCareNeedChecked[key][options[0].label] = true;
    const wrapper = wrap({ data: dataCareNeedChecked });
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

  it('renders when multiple care need checked', () => {
    const dataCareNeedChecked = { ...data };
    const key = stepInputFieldNames.CareNeeds[0];
    dataCareNeedChecked[key] = {};
    dataCareNeedChecked[key][options[0].label] = true;
    dataCareNeedChecked[key][options[1].label] = true;
    dataCareNeedChecked[key][options[2].label] = true;
    const wrapper = wrap({ data: dataCareNeedChecked });
    const boxRadioButtons = wrapper.find(BoxRadioButtonWrapper);

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(boxRadioButtons).toHaveLength(options.length);
    boxRadioButtons.children().forEach((boxRadioButton, i) => {
      if (i < 3) {
        expect(boxRadioButton.dive().prop('checked')).toEqual(true);
      } else {
        expect(boxRadioButton.dive().prop('checked')).toEqual(false);
      }
    });
  });
});
