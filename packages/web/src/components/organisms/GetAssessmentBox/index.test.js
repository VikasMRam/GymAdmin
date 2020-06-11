import React from 'react';
import { shallow } from 'enzyme';

import GetAssessmentBox from 'sly/web/components/organisms/GetAssessmentBox';

const wrap = (props = {}) => shallow(<GetAssessmentBox {...props} />);

describe('GetAssessmentBox', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('FullWidthButton')).toHaveLength(1);
  });
});
