import React from 'react';
import { shallow } from 'enzyme';

import SectionForm from 'sly/web/components/molecules/SectionForm';

const heading = 'My Profile';

const wrap = (props = {}) => shallow(<SectionForm heading={heading} {...props}>test</SectionForm>);

describe('SectionForm', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBeTruthy();
    expect(wrapper.find('HeadingBoxSection').prop('heading')).toBe(heading);
  });

  it('renders SectionForm with buttons', () => {
    // const buttonText = 'Save';
    const handleSubmit = jest.fn();
    const wrapper = wrap({ buttonText: 'Some', handleSubmit });
    // const button = wrapper.find('BottomButton');
    // expect(button).toHaveLength(1);
    // expect(button.contains(buttonText)).toBeTruthy();
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
