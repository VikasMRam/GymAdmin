import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationDialog from 'sly/components/molecules/ConfirmationDialog';

const wrap = (props = {}) => shallow(<ConfirmationDialog {...props} />);

const heading = 'test heading';
const description = 'test description';

describe('ConfirmationDialog', () => {
  it('renders', () => {
    const wrapper = wrap({ heading });
    const headingElem = wrapper.find('StyledHeading');

    expect(headingElem).toHaveLength(1);
    expect(headingElem.contains(heading)).toBe(true);
    expect(wrapper.find('ConfirmButon')).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders description', () => {
    const wrapper = wrap({ heading, description });
    const descriptionElem = wrapper.find('StyledBlock');

    expect(descriptionElem).toHaveLength(1);
    expect(descriptionElem.contains(description)).toBe(true);
  });
});
