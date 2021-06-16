import React from 'react';
import { shallow } from 'enzyme';

import Notification from 'sly/web/components/molecules/Notification';

const wrap = (props = {}) => shallow(<Notification {...props} />);

describe('Notification', () => {
  it('renders with default status', () => {
    const wrapper = wrap({ status: 'default', children: 'test children' });
    expect(wrapper.text()).toContain('test children');
  });

  it('renders with error status', () => {
    const wrapper = wrap({ status: 'error', children: 'test children' });
    expect(wrapper.text()).toContain('test children');
  });

  it('does not render close button for not closeable', () => {
    const wrapper = wrap({ status: 'default', closeable: false, children: 'test children' });
    expect(wrapper.find('svg')).toHaveLength(0);
  });

  it('onClose is called', () => {
    const onCloseSpy = jest.fn();
    const wrapper = wrap({ status: 'default', children: '', onClose: onCloseSpy });
    wrapper.find('CloseIcon').simulate('click');
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
