import React from 'react';
import { shallow } from 'enzyme';

import ReasonTile from 'sly/components/molecules/ReasonTile';
import HowSlyWorks from '.';

const wrap = (props = {}) => shallow(<HowSlyWorks {...props} />);

describe('HowSeniorlyWorks', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders 4 ReasonTiles', () => {
    const wrapper = wrap();
    expect(wrapper.find(ReasonTile)).toHaveLength(4);
  });
});
