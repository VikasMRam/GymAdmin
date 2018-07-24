import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { SearchPageTileTexts as searchAdProps } from 'sly/services/helpers/ad';
import AdTile, { StyledIcon } from '.';

const wrap = (props = {}) =>
  shallow(<AdTile {...searchAdProps} {...props} />);

describe('AdTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders AdTile', () => {
    const wrapper = wrap();
    expect(wrapper.find('li')).toHaveLength(3);
    expect(wrapper.find(StyledIcon)).toHaveLength(1);
  });

  it('handles Click event', () => {
    const onClick = spy();
    const wrapper = wrap({ onClick });
    wrapper.simulate('click');
    expect(onClick.getCalls()).toHaveLength(1);
  });
});
