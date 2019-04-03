import React from 'react';
import { shallow } from 'enzyme';

import { Td, TextTd, LinkTd, StageTd, DoubleLineTd, TextIconTd } from 'sly/components/molecules/Td';

const wrap = (props = {}) => shallow(<Td {...props} />);
const textTdWrap = (props = {}) => shallow(<TextTd {...props} />);
const linkTdWrap = (props = {}) => shallow(<LinkTd {...props} />);
const stageTdWrap = (props = {}) => shallow(<StageTd {...props} />);
const doubleLineTdWrap = (props = {}) => shallow(<DoubleLineTd {...props} />);
const textIconTdWrap = (props = {}) => shallow(<TextIconTd {...props} />);

it('renders Td', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders Td disabled', () => {
  const wrapper = wrap({ children: 'test', disabled: true });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.find('Wrapper').prop('disabled')).toBeTruthy();
});

it('renders TextTd', () => {
  const wrapper = textTdWrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders TextTd disabled', () => {
  const wrapper = textTdWrap({ children: 'test', disabled: true });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.find('Td').prop('disabled')).toBeTruthy();
});

it('renders LinkTd', () => {
  const wrapper = linkTdWrap({ children: 'test', href: '/' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders LinkTd disabled', () => {
  const wrapper = linkTdWrap({ children: 'test', href: '/', disabled: true });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.find('Td').prop('disabled')).toBeTruthy();
});

it('renders StageTd', () => {
  const wrapper = stageTdWrap({ text: 'test', currentStage: 1 });
  expect(wrapper.find('Stage')).toHaveLength(1);
});

it('renders StageTd disabled', () => {
  const wrapper = stageTdWrap({ text: 'test', currentStage: 1, disabled: true });
  expect(wrapper.find('Stage')).toHaveLength(1);
  expect(wrapper.find('Td').prop('disabled')).toBeTruthy();
});

it('renders DoubleLineTd', () => {
  const wrapper = doubleLineTdWrap({ firstLine: 'test', secondLine: 'blah' });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.contains('blah')).toBe(true);
});

it('renders DoubleLineTd disabled', () => {
  const wrapper = doubleLineTdWrap({ firstLine: 'test', secondLine: 'blah', disabled: true });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.contains('blah')).toBe(true);
  expect(wrapper.find('Td').prop('disabled')).toBeTruthy();
});

it('renders TextIconTd', () => {
  const wrapper = textIconTdWrap({ children: 'test', icon: 'pause' });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.find('Td').prop('kind')).toEqual('textIcon');
});

it('renders TextIconTd disabled', () => {
  const wrapper = textIconTdWrap({ children: 'test', icon: 'pause', disabled: true });
  expect(wrapper.contains('test')).toBe(true);
  expect(wrapper.find('Td').prop('kind')).toEqual('textIcon');
});
