import React from 'react';
import { shallow } from 'enzyme';

import FactBox from 'sly/components/molecules/FactBox';
import { Paragraph } from 'sly/components/atoms';

const wrap = (props = {}) => shallow(<FactBox {...props} />);

const title = 'test title';
const description = 'test description';

describe('FactBox', () => {
  it('renders', () => {
    const wrapper = wrap({
      title,
      description,
    });
    expect(wrapper.dive().find('StyledBlock').dive().dive()
      .text()).toContain(title);
    expect(wrapper.dive().find(Paragraph).dive().dive()
      .text()).toContain(description);
  });
});
