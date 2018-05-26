import React from 'react';
import { func } from 'prop-types';

import HeaderContainer from 'sly/containers/HeaderContainer';

const headerItems = [
  { name: 'Resources', url: '/resources' },
  // { name: 'Moving Center', url: '#' },
  // { name: 'News', url: '#' },
  { name: 'Moving Center', url: '/resources/tags/moving+center' },
  { name: 'List Your Property', url: '/providers' },
  { name: 'Our History', url: '/about' },
  { name: 'Sign in', url: '/signin' },
];
const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'Resources', url: '/resources' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: "Alzheimer's Care", url: '/alzheimers-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'Our History', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
  { name: 'List on Seniorly', url: '/providers' },
  // { name: 'Sign Out', url: '#' },
];
const menuItemHrIndices = [6, 10];

const DefaultHeaderTemplate = ({ onLocationSearch }) => (
  <HeaderContainer
    headerItems={headerItems}
    menuItems={menuItems}
    menuItemHrIndices={menuItemHrIndices}
    onLocationSearch={onLocationSearch}
  />
);

DefaultHeaderTemplate.propTypes = {
  onLocationSearch: func.isRequired,
};

export default DefaultHeaderTemplate;
