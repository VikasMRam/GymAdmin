import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATAcknowledgement from 'sly/components/organisms/CommunitySATAcknowledgement';

const handleButtonClick = jest.fn();
const defaultProps = {
  onButtonClick: handleButtonClick,
};

const wrap = (props = {}) => shallow(<CommunitySATAcknowledgement {...defaultProps} {...props} />);

describe('CommunitySATAcknowledgement', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('onButtonClick is called', () => {
    const wrapper = wrap({ });
    wrapper.find('Styled(Button)').simulate('click');
    expect(handleButtonClick).toHaveBeenCalled();
  });
});
