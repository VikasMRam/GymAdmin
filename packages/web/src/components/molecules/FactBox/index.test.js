import React from 'react';
import { shallow } from 'enzyme';

import FactBox from '.';

const wrap = (props = {}) => shallow(<FactBox {...props} />);

const title = 'test title';
const description = 'test description';

describe('FactBox', () => {
  it('renders', () => {
    const wrapper = wrap({
      title,
      description,
    });
    expect(wrapper.find('Block').text()).toContain(title);
    expect(wrapper.find('Paragraph').text()).toContain(description);
  });
});
