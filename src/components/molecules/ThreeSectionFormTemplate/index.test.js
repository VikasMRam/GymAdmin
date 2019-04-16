import React from 'react';
import { shallow } from 'enzyme';

import ThreeSectionFormTemplate from 'sly/components/molecules/ThreeSectionFormTemplate';

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

    expect(wrapper.find('StyledHeading').contains(heading)).toBeTruthy();
    expect(wrapper.find('Wrapper').contains(children)).toBeTruthy();
    expect(wrapper.find('Bottom').find('Button')).toHaveLength(1);
  });

  it('onCancelClick is called', () => {
    const onCancelClick = jest.fn();
    const wrapper = wrap({
      onCancelClick,
      hasCancel: true,
    });

    wrapper.find('Bottom').find('Button').simulate('click');
    expect(onCancelClick).toHaveBeenCalled();
  });

  it('onSubmitClick is called', () => {
    const onSubmitClick = jest.fn();
    const wrapper = wrap({
      onSubmitClick,
      hasSubmit: true,
    });

    wrapper.find('Bottom').find('Button').simulate('click');
    expect(onSubmitClick).toHaveBeenCalled();
  });
});
