import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import Performer1 from 'sly/../private/storybook/sample-data/performer-1.json';
import Performer2 from 'sly/../private/storybook/sample-data/performer-2.json';
import Event1 from 'sly/../private/storybook/sample-data/event-1.json';
import CurtainupEventBox from 'sly/components/organisms/CurtainupEventBox';

const performers = [
  Performer1,
  Performer2,
];
const defaultProps = {
  event: Event1,
  performers,
};
const wrap = (props = {}) => shallow(<CurtainupEventBox {...defaultProps} {...props} />);
const parsedDate = dayjs(Event1.liveAt);
const month = parsedDate.format('MMM');
const day = parsedDate.format('D');
const dayName = parsedDate.format('dddd');

describe('CreatePasswordForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    const header = wrapper.find('Header');
    const performerWrappers = wrapper.find('PerformerWrapper');

    expect(header.contains(day)).toBeTruthy();
    expect(header.contains(month)).toBeTruthy();
    expect(header.contains(dayName)).toBeTruthy();
    expect(performerWrappers).toHaveLength(performers.length);
    performerWrappers.forEach((pw, i) => {
      expect(pw.contains(performers[i].name)).toBeTruthy();
      expect(pw.contains(performers[i].description)).toBeTruthy();
    });
  });
});
