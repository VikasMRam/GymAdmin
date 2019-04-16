import React from 'react';
import { shallow } from 'enzyme';

import TableRowCard from 'sly/components/molecules/TableRowCard';

const defaultProps = {
  heading: 'Amanda Appleseed',
  href: '/',
  id: '1',
  rowItems: [
    { type: 'doubleLine', data: { firstLine: 'Amanda is looking for Assisted Living for her mother  in Saratoga', secondLine: '10/10/2019' } },
    { type: 'stage', data: { text: 'New', currentStage: 1 } },
    { type: 'blah', data: {} },
  ],
};

const wrap = (props = {}) => shallow(<TableRowCard {...defaultProps} {...props} />);

describe('TableRowCard', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders TableRowCard', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('DoubleLineDiv')).toHaveLength(1);
    expect(wrapper.find('StageDiv')).toHaveLength(1);
  });
});
