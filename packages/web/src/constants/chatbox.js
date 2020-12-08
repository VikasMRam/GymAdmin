import careTypes from './careTypes';

export const ENABLED_ROUTES = [
  `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
];
