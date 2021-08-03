import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Button from '.';

import events from 'sly/web/services/events';

const wrap = (props = {}, context) => shallow(<Button {...props} />, context);

describe('Button (Legacy)', () => {
  const originalSendEvent = events.track;

  beforeEach(() => {
    events.track = jest.fn();
  });

  afterEach(() => {
    events.track = originalSendEvent;
  });

  it('renders with different combination of props', () => {
    wrap({ disabled: true });
    wrap({ transparent: true });
    wrap({ disabled: true, transparent: true });
  });

  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ type: 'submit' });
    expect(wrapper.dive().find('button[type="submit"]')).toHaveLength(1);
  });

  it('renders button by default', () => {
    const wrapper = wrap();
    expect(wrapper.dive().find('button')).toHaveLength(1);
  });

  it('renders Link when href is passed in', () => {
    const wrapper = wrap({ href: 'test' });
    expect(wrapper.prop('as')).toBe('a');
  });

  it('renders Link when to is passed in', () => {
    const wrapper = wrap({ to: '/test' }, { context: { routes: [{
      component: () => {},
      path: '/test',
    }] } });
    expect(wrapper.type()).toBe(Link);
  });

  it('sends event on click when one is provided', () => {
    const onClick = jest.fn();
    const event = { action: 'clicky-clicky', category: 'red' };

    const wrapper = wrap({ onClick, event });
    wrapper.dive().find('button').simulate('click');

    expect(events.track).toHaveBeenCalledWith(event);
    expect(onClick).toHaveBeenCalled();
  });

  it('does not send event on click when one is not provided', () => {
    const onClick = jest.fn();

    const wrapper = wrap({ onClick });
    wrapper.dive().find('button').simulate('click');

    expect(events.track).not.toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
  });
});
