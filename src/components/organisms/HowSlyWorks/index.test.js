import React from 'react';
import { shallow } from 'enzyme';

import HowSlyWorks from 'sly/components/organisms/HowSlyWorks';
import ReasonTile from 'sly/components/molecules/ReasonTile';

const wrap = (props = {}) => shallow(<HowSlyWorks {...props} />);

describe('HowSeniorlyWorks', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders 3 ReasonTiles', () => {
    const wrapper = wrap();
    expect(wrapper.find(ReasonTile)).toHaveLength(3);
  });
});
