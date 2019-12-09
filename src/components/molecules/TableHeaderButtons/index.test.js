import React from 'react';
import { shallow } from 'enzyme';

import { Datatable } from 'sly/services/datatable';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';

const wrap = (props = {}) => shallow(
  <Datatable>
    {datatable => (
      <TableHeaderButtons
        datatable={datatable}
        {...props}
      />
    )}
  </Datatable>,
);

// FIXME: rewrite test
describe.skip('TableHeaderButtons', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
