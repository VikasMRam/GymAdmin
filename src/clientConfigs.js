import careTypes from 'sly/constants/careTypes';

export default [
  {
    bundle: 'external',
    ssr: false,
    path: '/external*',
  },
  {
    bundle: 'community-details',
    ssr: true,
    path: `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
  },
  {
    bundle: 'main',
    ssr: true,
    path: '*',
  },
];
