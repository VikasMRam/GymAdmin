import React from 'react';
import { shallow } from 'enzyme';

import BoxRadioButton, { StyledField, StyledIcon, StyledHelpBubble } from '.';

const wrap = (props = {}) => shallow(<BoxRadioButton {...props} />);

const name = 'testName';
const helpText = 'help text';

describe('BoxRadioButton', () => {
  it('renders non multiselect unchecked', () => {
    const wrapper = wrap({
      name,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'radio' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon)).toHaveLength(0);
    expect(wrapper.find(StyledHelpBubble)).toHaveLength(0);
  });

  it('renders non multiselect unchecked with help text', () => {
    const wrapper = wrap({
      name,
      helpText,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'radio' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon)).toHaveLength(0);
    expect(wrapper.find(StyledHelpBubble).find({ text: helpText })).toHaveLength(1);
  });

  it('renders non multiselect checked with help text', () => {
    const wrapper = wrap({
      name,
      helpText,
      checked: true,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'radio' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon).find({ icon: 'round-checkmark' })).toHaveLength(1);
    expect(wrapper.find(StyledHelpBubble).find({ text: helpText })).toHaveLength(1);
  });

  it('renders multiselect unchecked', () => {
    const wrapper = wrap({
      name,
      multiSelect: true,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon)).toHaveLength(0);
    expect(wrapper.find(StyledHelpBubble)).toHaveLength(0);
  });

  it('renders multiselect unchecked with help text', () => {
    const wrapper = wrap({
      name,
      helpText,
      multiSelect: true,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon)).toHaveLength(0);
    expect(wrapper.find(StyledHelpBubble).find({ text: helpText })).toHaveLength(1);
  });

  it('renders non multiselect checked with help text', () => {
    const wrapper = wrap({
      name,
      helpText,
      checked: true,
      multiSelect: true,
    });
    expect(wrapper.find(StyledField).find({ name, type: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(StyledIcon).find({ icon: 'checkbox' })).toHaveLength(1);
    expect(wrapper.find(StyledHelpBubble).find({ text: helpText })).toHaveLength(1);
  });
});
