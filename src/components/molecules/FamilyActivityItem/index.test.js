import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';

const title = 'test';
const description = 'test description';
const date = '2019-04-05T15:54:06Z';
const dateString = dayjs(date).format('MM/DD/YYYY hh:mm A');
const defaultProps = {
  title,
  description,
  date,
};
const wrap = (props = {}) => shallow(<FamilyActivityItem {...defaultProps} {...props} />);

describe('FamilyActivityItem', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.dive().find('StyledIcon').prop('icon')).toBe(FamilyActivityItem.defaultProps.icon);
    expect(wrapper.dive().find('StyledColumn').find('StyledBlock').contains(title)).toBeTruthy();
    expect(wrapper.dive().find('StyledColumn').find('Block').contains(description)).toBeTruthy();
    expect(wrapper.dive().find('Block').contains(dateString)).toBeTruthy();
  });

  it('renders when icon provided', () => {
    const icon = 'sdfsdfsd';
    const wrapper = wrap({
      icon,
    });

    expect(wrapper.dive().find('StyledIcon').prop('icon')).toBe(icon);
  });
});
