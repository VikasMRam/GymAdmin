import React from 'react';
import { shallow } from 'enzyme';

import Datatable from './Datatable';

const location = {
  search: '',
  pathname: 'currentpath',
};

const defaultProps = {
  location,
  datatable: {},
  status: {
    datatable: {},
  },
  history: {
    push: () => {},
  },
  children: () => {},
};

const wrap = (props = {}) => shallow(<Datatable.WrappedComponent {...defaultProps} {...props} />);
describe('Datatable', () => {
  it('renders', () => {
    const wrapper = wrap({
      children: () => <div>hola</div>,
    });
    expect(wrapper.text()).toEqual('hola');
  });

  it('adds empty filter', () => {
    let datatable;
    const push = jest.fn();
    const wrapper = wrap({
      children: dt => datatable = dt,
      history: { push },
    });

    expect(datatable.query).toEqual({});

    datatable.addFilter();

    const search = 'currentpath?filter[]=';
    expect(push).toHaveBeenCalledWith(search);

    wrapper.setProps({ location: { search, ...location } });
    expect(datatable.query).toEqual({});
  });

  it('adds a filter with params', () => {
    let datatable;
    const push = jest.fn();
    const wrapper = wrap({
      children: dt => datatable = dt,
      history: { push },
    });
    expect(datatable.query).toEqual({});

    datatable.addFilter({ column: 'foo', operator: 'bar', value: 'baz' });

    const search = '?filter[foo]=bar:baz';
    expect(push).toHaveBeenCalledWith(`currentpath${search}`);

    wrapper.setProps({ location: { ...location, search } });
    wrapper.update();

    expect(datatable.query).toEqual({
      'filter[foo]': 'bar:baz',
    });
  });

  it('adds a filter with repeated param names', () => {
    let datatable;
    const push = jest.fn();
    const wrapper = wrap({
      children: dt => datatable = dt,
      history: { push },
    });
    expect(datatable.query).toEqual({});

    let search = '?filter[foo]=bar:baz';
    datatable.addFilter({ column: 'foo', operator: 'bar', value: 'baz' });
    expect(push).lastCalledWith(`currentpath${search}`);
    wrapper.setProps({ location: { ...location, search } });

    search += '&filter[foo]=xxx:yyy&exp=and';
    datatable.addFilter({ column: 'foo', operator: 'xxx', value: 'yyy' });
    expect(push).lastCalledWith(`currentpath${search}`);
    wrapper.setProps({ location: { ...location, search } });

    expect(datatable.query).toEqual({ 'filter[foo]': ['bar:baz', 'xxx:yyy'], exp: 'and' });
  });
});
