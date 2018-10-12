import React from 'react';
import { shallow } from 'enzyme';
import { Block } from 'sly/components/atoms';

import JoinSlyButtons from '.';

const wrap = (props = {}) => shallow(<JoinSlyButtons {...props} />);

describe('JoinSlyButtons', () => {
  it('renders', () => {
    const wrapper = wrap();
    const heading = wrapper.find('StyledHeading');

    expect(wrapper.find(Block)).toHaveLength(1);
    expect(heading).toHaveLength(1);
    expect(heading.dive().dive().dive().text()).toBe(JoinSlyButtons.defaultProps.heading);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('FacebookButton')).toHaveLength(1);
    expect(wrapper.find('GoogleButton')).toHaveLength(1);
  });

  it('call callback on login click', () => {
    const onLoginClickedSpy = jest.fn();
    const wrapper = wrap({
      onLoginClicked: onLoginClickedSpy,
    });
    const link = wrapper.find('Login');

    expect(link).toHaveLength(1);
    link.simulate('click');
    expect(onLoginClickedSpy).toHaveBeenCalled();
  });

  it('call callback on email signup click', () => {
    const onEmailSignupClickedSpy = jest.fn();
    const wrapper = wrap({
      onEmailSignupClicked: onEmailSignupClickedSpy,
    });
    const button = wrapper.find('StyledButton');

    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(onEmailSignupClickedSpy).toHaveBeenCalled();
  });


  it('shows correct heading', () => {
    const wrapper = wrap({
      heading: 'test heading',
    });
    const heading = wrapper.find('StyledHeading');

    expect(heading).toHaveLength(1);
    expect(heading.dive().dive().dive().text()).toBe('test heading');
  });
});
