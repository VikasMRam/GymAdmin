import React from 'react';
import { shallow } from 'enzyme';

import ThreeSectionFormTemplate from 'sly/web/components/molecules/ThreeSectionFormTemplate';

const wrap = (props = {}, children) => shallow(<ThreeSectionFormTemplate {...props}>{children}</ThreeSectionFormTemplate>);

describe('ThreeSectionFormTemplate', () => {
  it('renders', () => {
    const children = 'test';
    const heading = 'test heading';
    const submitButtonText = 'test button';
    const wrapper = wrap({
      heading,
      submitButtonText,
      hasCancel: true,
    }, children);
    expect(wrapper.find('ForwardRef').contains(heading)).toBeTruthy();
    expect(wrapper.find('Block').contains(children)).toBeTruthy();
    expect(wrapper.find('Block').find('Button')).toHaveLength(1);
  });

  it('onCancelClick is called', () => {
    const onCancelClick = jest.fn();
    const wrapper = wrap({
      onCancelClick,
      hasCancel: true,
    });

    wrapper.find('Block').find('Button').simulate('click');
    expect(onCancelClick).toHaveBeenCalled();
  });

  it('onSubmit is called', () => {
    const onSubmit = jest.fn();
    const wrapper = wrap({
      onSubmit,
      hasSubmit: true,
    });

    wrapper.find('Block').at(0).simulate('submit');
    expect(onSubmit).toHaveBeenCalled();
  });
});
