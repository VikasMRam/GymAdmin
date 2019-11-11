const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'board-and-care-home',
  'memory-care',
  'continuing-care-retirement-community',
];

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
