import React from 'react';
import { shallow } from 'enzyme';

import Button from 'sly/components/atoms/Button';
import SlyEvent from 'sly/services/helpers/events';

const wrap = (props = {}) => shallow(<Button {...props} />).dive();

describe('Button', () => {
  beforeEach(() => {
    spyOn(SlyEvent.getInstance(), 'sendEvent');
  });

  it('renders with different combination of props', () => {
    wrap({ disabled: true });
    wrap({ transparent: true });
    wrap({ disabled: true, transparent: true });
  });

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'submit' });
    expect(wrapper.find({ type: 'submit' })).toHaveLength(1);
  });

  it('renders button by default', () => {
    const wrapper = wrap();
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders anchor when href is passed in', () => {
    const wrapper = wrap({ href: 'test' });
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('renders Link when to is passed in', () => {
    const wrapper = wrap({ to: 'test' }).dive();
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('sends event on click when one is provided', () => {
    const onClick = jest.fn();
    const event = { action: 'clicky-clicky', category: 'red' };

    const wrapper = wrap({ onClick, event });
    wrapper.find('button').simulate('click');

    expect(SlyEvent.getInstance().sendEvent).toHaveBeenCalledWith(event);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not send event on click when one is not provided', () => {
    const onClick = jest.fn();

    const wrapper = wrap({ onClick });
    wrapper.find('button').simulate('click');

    expect(SlyEvent.getInstance().sendEvent).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });
});
