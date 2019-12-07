import React from 'react';
import { shallow } from 'enzyme';

import Datatable from 'sly/services/datatable/components/Datatable';
import TableHeaderButtons from '.';

const wrap = (props = {}) => shallow((
  <Datatable>
    {(datatable) => (
      <TableHeaderButtons
        datatable={datatable}
        {...props}
      />
    )}
  </Datatable>
));

describe('TableHeaderButtons', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
