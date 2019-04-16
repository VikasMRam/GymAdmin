import React from 'react';
import { shallow } from 'enzyme';

import AcceptAndContactFamilyForm from 'sly/components/organisms/AcceptAndContactFamilyForm';

const wrap = (props = {}) => shallow(<AcceptAndContactFamilyForm {...props} />);

describe('AcceptAndContactFamilyForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('ThreeSectionFormTemplate')).toHaveLength(1);
  });

  it('onCallClick is called', () => {
    const onCallClick = jest.fn();
    const wrapper = wrap({ onCallClick });

    wrapper.find('ThreeSectionFormTemplate').find('StyledIconButton').simulate('click');
    expect(onCallClick).toHaveBeenCalled();
  });

  it('onEmailClick is called', () => {
    const onEmailClick = jest.fn();
    const wrapper = wrap({ onEmailClick });

    wrapper.find('ThreeSectionFormTemplate').find('IconButton').simulate('click');
    expect(onEmailClick).toHaveBeenCalled();
  });
});
