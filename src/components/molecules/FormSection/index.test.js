import React from 'react';
import { shallow } from 'enzyme';

import FormSection from 'sly/components/molecules/FormSection';

const heading = 'My Profie';

const wrap = (props = {}) => shallow(<FormSection heading={heading} {...props} >test</FormSection>);

describe('FormSection', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(true);
    expect(wrapper.contains(heading)).toBe(true);
  });

  it('renders FormSection with buttons', () => {
    const buttonText = 'Submit';
    const handleSubmit = jest.fn();
    const wrapper = wrap({ buttonText, handleSubmit });
    const form = wrapper.find('WrapperForm');
    form.simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
