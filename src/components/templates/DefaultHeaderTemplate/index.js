import React from 'react';
import { func } from 'prop-types';

import HeaderContainer from 'sly/containers/HeaderContainer';

const headerItems = [
  { name: 'List on Seniorly', url: '/providers' },
  { name: 'Help Center', url: '/resources' },
  // { name: 'Saved', url: '#' },
  { name: 'Sign Up', url: '/signup' },
  { name: 'Login', url: '/signin' },
];
const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'Assisted Living', url: '/assisted-living' },
  { name: "Alzheimer's Care", url: '/alzheimers-care' },
  { name: 'Respite Care', url: '/respite-care' },
  { name: 'About Us', url: '/about' },
  { name: 'Contact', url: '/contact' },
  { name: 'Careers', url: 'https://angel.co/seniorly/jobs' },
  { name: 'List on Seniorly', url: '/providers' },
  // { name: 'Sign Out', url: '#' },
];
const menuItemHrIndices = [5, 9];

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
