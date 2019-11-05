const careTypes = [
  'retirement-community',
  'assisted-living',
  'independent-living',
  'board-and-care-home',
  'memory-care',
  'continuing-care-retirement-community',
];

export default {
  communityDetailPage: {
    path: `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
    nodeStatsFile: 'dist/loadable-stats-community-detail-node.json',
    webStatsFile: 'dist/loadable-stats-community-detail-web.json',
  },
};
