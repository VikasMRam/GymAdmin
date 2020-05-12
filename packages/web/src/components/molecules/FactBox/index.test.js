import React from 'react';
import { mount } from 'enzyme';

import FactBox from 'sly/web/components/molecules/FactBox';
import { Paragraph } from 'sly/web/components/atoms';

const wrap = (props = {}) => mount(<FactBox {...props} />);

const title = 'test title';
const description = 'test description';

describe('FactBox', () => {
  it('renders', () => {
    const wrapper = wrap({
      title,
      description,
    });
    expect(wrapper.find('StyledBlock').text()).toContain(title);
    expect(wrapper.find(Paragraph).text()).toContain(description);
  });
});
