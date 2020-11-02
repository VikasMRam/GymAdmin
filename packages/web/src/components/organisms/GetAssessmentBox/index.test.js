import React from 'react';
import { shallow } from 'enzyme';

import GetAssessmentBox from '.';

const wrap = (props = {}) => shallow(<GetAssessmentBox {...props} />);

describe('GetAssessmentBox', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Icon')).toHaveLength(2);
    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
  });
});
