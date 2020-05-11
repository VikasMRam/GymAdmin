import React from 'react';
import { shallow } from 'enzyme';

import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup/index';
import IconItem from 'sly/components/molecules/IconItem/index';

const wrap = (props = {}) =>
  shallow(<AdvisorHelpPopup {...props} />);

describe('AdvisorHelpPopup', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders AdvisorHelpPopup', () => {
    const wrapper = wrap();
    expect(wrapper.find(IconItem)).toHaveLength(4);
    expect(wrapper.find('GotItButton')).toHaveLength(1);
  });

  it('handles onButtonClick', () => {
    const onButtonClick = jest.fn();
    const wrapper = wrap({
      onButtonClick,
    });

    const GotItButton = wrapper.find('GotItButton');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
    GotItButton.simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
