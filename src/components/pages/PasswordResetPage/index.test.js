import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/components/atoms/index';
import PasswordResetPage from 'sly/components/pages/PasswordResetPage';

const error = 'Blah';

const wrap = (props = {}) => shallow(<PasswordResetPage {...props} />);

describe('PasswordResetPage', () => {
  it('render PasswordResetPage', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = wrap({ handleSubmit: onSubmitSpy });
    expect(wrapper.find('StyledForm')).toHaveLength(1);
    expect(wrapper.find('StyledBlock')).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = wrap({ handleSubmit: onSubmitSpy, error });
    const errorMsg = wrapper.find(Block);

    expect(wrapper.find('StyledForm')).toHaveLength(1);
    expect(wrapper.find('StyledBlock')).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(errorMsg).toHaveLength(1);
    expect(errorMsg.dive().render().text()).toContain(error);
  });

  it('handles onSubmit', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = wrap({ handleSubmit: onSubmitSpy });
    wrapper.find('StyledForm').simulate('submit');
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
