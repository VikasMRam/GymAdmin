import React from 'react';
import { mount } from 'enzyme';
import Measure from 'react-measure';

import CollapsibleBlock, { ReadMore } from 'sly/components/molecules/CollapsibleBlock';

const wrap = (props = {}) => mount(<CollapsibleBlock {...props} />);

describe('CollapsibleBlock', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find('div[id="foo"]')).toHaveLength(1);
  });

  it('renders default collapsed, calls toggle', () => {
    const wrapper = wrap();
    const readMore = wrapper.find(ReadMore);

    expect(wrapper.state()).toEqual({ collapsed: true });
    expect(readMore.text()).toEqual('Read more');
    readMore.simulate('click');
    expect(wrapper.state()).toEqual({ collapsed: false });
    expect(readMore.text()).toEqual('Read less');
  });

  it('renders default collapsed, calls toggle', () => {
    const wrapper = wrap({ collapsedDefault: false });
    const readMore = wrapper.find(ReadMore);

    expect(wrapper.state()).toEqual({ collapsed: false });
    expect(readMore.text()).toEqual('Read less');
    readMore.simulate('click');
    expect(wrapper.state()).toEqual({ collapsed: true });
    expect(readMore.text()).toEqual('Read more');
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

  it('passes block className to the parent', () => {
    const wrapper = wrap({ blockClassName: 'parentClassName' });
    expect(wrapper.find('div').first().props().className).toEqual('parentClassName');
  });
});

