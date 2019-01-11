import React from 'react';
import { mount } from 'enzyme';
import Measure from 'react-measure';

import CollapsibleBlock, { ReadMore } from 'sly/components/molecules/CollapsibleBlock';

const children = 'test '.repeat(1000);
const wrap = (props = {}) => mount(<CollapsibleBlock {...props}>{children}</CollapsibleBlock>);

describe('CollapsibleBlock', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains(children)).toBe(true);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find('div[id="foo"]')).toHaveLength(1);
  });

  it('receives onResize event', () => {
    const wrapper = wrap();
    const onResize = wrapper.find(Measure).prop('onResize');
    expect(wrapper.state('maxHeight')).toEqual(undefined);

    onResize({});
    expect(wrapper.state('maxHeight')).toEqual(undefined);

    onResize({ entry: { height: 600 } });
    expect(wrapper.state('maxHeight')).toEqual(600);
  });

  it('renders default collapsed, calls toggle', () => {
    const wrapper = wrap();
    wrapper.setState({ maxHeight: 600 });
    const readMore = wrapper.find(ReadMore);

    expect(wrapper.state()).toEqual({ maxHeight: 600, collapsed: true });
    expect(readMore.text()).toContain('Show more');
    readMore.simulate('click');
    expect(wrapper.state()).toEqual({ maxHeight: 600, collapsed: false });
    expect(readMore.text()).toContain('Show less');
  });

  it('renders default collapsed, calls toggle', () => {
    const wrapper = wrap({ collapsedDefault: false });
    wrapper.setState({ maxHeight: 600 });
    const readMore = wrapper.find(ReadMore);

    expect(wrapper.state()).toEqual({ maxHeight: 600, collapsed: false });
    expect(readMore.text()).toContain('Show less');
    readMore.simulate('click');
    expect(wrapper.state()).toEqual({ maxHeight: 600, collapsed: true });
    expect(readMore.text()).toContain('Show more');
  });

  it('passes block className to the parent', () => {
    const wrapper = wrap({ blockClassName: 'parentClassName' });
    expect(wrapper.find('div').first().props().className).toEqual('parentClassName');
  });
});

