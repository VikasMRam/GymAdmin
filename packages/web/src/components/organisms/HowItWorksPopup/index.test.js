import React from 'react';
import { shallow } from 'enzyme';

import HowItWorksPopup from 'sly/web/components/organisms/HowItWorksPopup';

const wrap = (props = {}) => shallow(<HowItWorksPopup {...props} />);

describe('HowItWorksPopup', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHowSlyWorksVideo')).toHaveLength(1);
    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('ListItem')).toHaveLength(4);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('onMatchClick is called', () => {
    const onMatchClick = jest.fn();
    const wrapper = wrap({
      onMatchClick,
    });

    wrapper.find('StyledButton').simulate('click');
    expect(onMatchClick).toHaveBeenCalled();
  });
});
