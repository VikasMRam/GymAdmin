import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATDateForm from 'sly/components/organisms/CommunitySATDateForm';
import { Block } from 'sly/components/atoms';

const error = 'Blah';
const wrap = (props = {}) => shallow(<CommunitySATDateForm {...props} />);

describe('CommunitySATDateForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find('StyledTimeField')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });

    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find('StyledTimeField')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });
});
