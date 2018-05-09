import { stringify, parse } from 'query-string';

const searchParamsWhitelist = [
  'toc',
  'state',
  'city',
  'size',
  'budget',
  'sort',
  'page-number',
  'page-size',
  'radius',
  'view',
  'latitude',
  'longitude',
  'searchOnMove',
];

export const tocs = [
  { label: 'All Communities',    value: 'retirement-community', segment: 'retirement-community'},
  { label: 'Assisted Living',    value: 'assisted-living'     , segment: 'assisted-living'},
  { label: 'Independent Living', value: 'independent-living'  , segment: 'independent-living'},
  { label: 'Memory Care',        value: 'alzheimers-care'     , segment: 'alzheimers-care'},
];

export const sizes = [
  { label: 'Small', segment: 'less-than-20-beds', value: 'small' },
  { label: 'Medium', segment: '20-to-51-beds', value: 'medium' },
  { label: 'Large', segment: 'greater-than-51-beds', value: 'large' },
];

export const budgets = [
  { label: 'Up to $2500', segment: '2500-dollars', value: 2500 },
  { label: 'Up to $3000', segment: '3000-dollars', value: 3000 },
  { label: 'Up to $3500', segment: '3500-dollars', value: 3500 },
  { label: 'Up to $4000', segment: '4000-dollars', value: 4000 },
  { label: 'Up to $4500', segment: '4500-dollars', value: 4500 },
  { label: 'Up to $5000', segment: '5000-dollars', value: 5000 },
  { label: 'Up to $5500', segment: '5500-dollars', value: 5500 },
  { label: 'Up to $6000', segment: '6000-dollars', value: 6000 },
];

const findAFilter = (ary, filters='') => filters.split('/')
  .reduce((cumul, filter) => {
    return ary 
      .reduce((cumul, item) => {
        if (item.segment === filter) return item.segment;
        return cumul;
      }, cumul)
  }, undefined);  

const filterSearchParams = params => Object.keys(params)
  .reduce((cumul, key) => {
    if (searchParamsWhitelist.includes(key)) {
      cumul[key] = params[key];
    }
    return cumul;
  }, {});

export const filterLinkPath = (currentFilters, nextFilters) => {
  const filters = filterSearchParams({
    ...currentFilters,
    ...nextFilters,
  });

  const { size, budget, toc, state, city, ...qs } = filters;

  const sizeSegment = size ? `/${size}` : '';
  const budgetSegment = budget ? `/${budget}` : '';
  const filtersSegment = (sizeSegment || budgetSegment)
    ? `/filters${sizeSegment}${budgetSegment}`
    : '';

  const key = Object.keys(nextFilters)[0];
  const selected = currentFilters[key] === nextFilters[key];

  return {
    path: `/${toc}/${state}/${city}${filtersSegment}${stringify(qs)}`,
    selected,
  };
};

export const getSearchParams = ({ params }, location) => {
  const qs = parse(location.search);
  const budget = findAFilter(budgets, params.filters);
  const size = findAFilter(sizes, params.filters);

  return filterSearchParams({
    ...params,
    ...qs,
    budget,
    size,
  });
};
