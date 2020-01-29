import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms/index';
import PasswordResetPage from 'sly/components/pages/PasswordResetPage';

const error = 'Blah';
const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
};
const wrap = (props = {}) => shallow(<PasswordResetPage {...defaultProps} {...props} />);

describe('PasswordResetPage', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledForm')).toHaveLength(1);
    expect(wrapper.find('CenteredPaddedHeading')).toHaveLength(1);
    expect(wrapper.find('PaddedFullWidthButton')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    const errorMsg = wrapper.find('PaddedBlock');

    expect(wrapper.find('StyledForm')).toHaveLength(1);
    expect(wrapper.find('CenteredPaddedHeading')).toHaveLength(1);
    expect(wrapper.find('PaddedFullWidthButton')).toHaveLength(1);
    expect(errorMsg).toHaveLength(1);
    expect(errorMsg.dive().contains(error)).toBeTruthy();
  });

  it('handles onSubmit', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = wrap({ handleSubmit: onSubmitSpy });

    wrapper.find('StyledForm').simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
