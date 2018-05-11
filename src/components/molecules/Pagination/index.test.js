import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '.';

const wrap = (props={}) => shallow(<Pagination {...props} />);

const onChange = jest.fn();

const small = {
  current: 0,
  range: 5,
  total: 5,
  onChange 
};

describe('Pagination', () => {
  it('should render elements under total', () => {
    expect(wrap(small).children()).toHaveLength(5);
  });
});

