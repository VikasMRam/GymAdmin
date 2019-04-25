import React from 'react';
import { shallow } from 'enzyme';

import Table from 'sly/components/organisms/Table';

const defaultProps = {
  headings: [
    { text: 'Contact Name' },
    { text: 'Resident Name' },
    { text: 'Stage', sort: 'asc' },
    { text: 'Latest Note' },
    { text: 'Date Added' },
  ],
  contents: [
    {
      id: '1',
      rowItems: [
        { type: 'link', data: { text: 'Amanda Appleseed', href: '/' } },
        { type: 'text', data: { text: 'Clara Appleseed' } },
        { type: 'stage', data: { text: 'New', currentStage: 1 } },
        { type: 'doubleLine', data: { firstLine: 'Amanda is looking for Assisted Living for her mother  in Saratoga', secondLine: '10/10/2019' } },
        { type: 'text', data: { text: '10/10/2019' } },
      ],
    },
    {
      id: '2',
      rowItems: [
        { type: 'link', data: { text: 'Belinda Baker', href: '/' } },
        { type: 'text', data: { text: 'Belinda Baker' } },
        { type: 'stage', data: { text: '1st Contact Attempt', currentStage: 2 } },
        { type: 'doubleLine', data: { firstLine: 'I called and left a message on her voicemail saying that I have a few communities that she would', secondLine: '10/10/2019' } },
        { type: 'blah', data: { text: '10/10/2019' } },
      ],
    },
    {
      id: '3',
      rowItems: [
        { type: 'link', data: { text: 'Claudia Chamberlain', href: '/' } },
        { type: 'text', data: { text: 'Kendrick Chaimberlain' } },
        { type: 'stage', data: { text: '2nd Contact Attempt', currentStage: 3 } },
        { type: 'doubleLine', data: { firstLine: 'Sent another message through app', secondLine: '10/10/2019' } },
        { type: 'text', data: { text: '10/10/2019' } },
      ],
    },
    {
      id: '4',
      rowItems: [
        { type: 'link', data: { text: 'Dominique Dominguez Drommelders', href: '/' } },
        { type: 'text', data: { text: 'Deepa Davenport' } },
        { type: 'stage', data: { text: '3rd Contact Attempt', currentStage: 4 } },
        { type: 'doubleLine', data: { firstLine: 'I called and left a message on her voicemail saying that I have a few communities that she would', secondLine: '10/10/2019' } },
        { type: 'text', data: { text: '10/10/2019' } },
      ],
    },
  ],
};

const wrap = (props = {}) =>
  shallow(<Table {...defaultProps} {...props} />);

describe('Table', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Table', () => {
    const wrapper = wrap();
    expect(wrapper.find('thead')).toHaveLength(1);
    expect(wrapper.find('tbody')).toHaveLength(1);
    expect(wrapper.find('Th')).toHaveLength(5);
    expect(wrapper.find('tr')).toHaveLength(5);
    expect(wrapper.find('Td')).toHaveLength(1);
    expect(wrapper.find('TextTd')).toHaveLength(7);
    expect(wrapper.find('LinkTd')).toHaveLength(4);
    expect(wrapper.find('StageTd')).toHaveLength(4);
    expect(wrapper.find('DoubleLineTd')).toHaveLength(4);
  });
});
