export const SENIOR_LIVING_GUIDES_TOPIC = 'senior-living-guides';
export const HEALTH_AND_LIFESTYLE_TOPIC = 'health-and-lifestyle';

export const ARTICLES_RANGE_FOR_PAGINATION = 18;

export const selectAllArticlesItem = { value: 'all-articles', label: 'All articles' };

export const seniorLivingGuidesTags = [
  selectAllArticlesItem,
  { value: 'assisted-living', label: 'Assisted living' },
  { value: 'independent-living', label: 'Independent living' },
  { value: 'memory-care', label: 'Memory care' },
  { value: 'ccrc', label: 'CCRC' },
  { value: 'home-care', label: 'Home care' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal' },
  { value: 'advisors', label: 'Advisors' },
];

export const healthAndLifestyleTags = [
  selectAllArticlesItem,
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'health', label: 'Health' },
  { value: 'technology', label: 'Technology' },
  { value: 'veterans', label: 'Veterans' },
  { value: 'travel', label: 'Travel' },
  { value: 'business', label: 'Business' },
];

export const getTextForPagination = (pageNumber, articlesCount) => {
  let start;
  let end;

  if (pageNumber) {
    start = (pageNumber * ARTICLES_RANGE_FOR_PAGINATION) + 1;
  } else start = 1;
  if ((articlesCount < ARTICLES_RANGE_FOR_PAGINATION) || (pageNumber * ARTICLES_RANGE_FOR_PAGINATION) + ARTICLES_RANGE_FOR_PAGINATION >= articlesCount) {
    end = articlesCount;
  }
  if ((pageNumber * ARTICLES_RANGE_FOR_PAGINATION) + ARTICLES_RANGE_FOR_PAGINATION < articlesCount) {
    end = (pageNumber * ARTICLES_RANGE_FOR_PAGINATION) + ARTICLES_RANGE_FOR_PAGINATION;
  }
  if ((ARTICLES_RANGE_FOR_PAGINATION < articlesCount) && !pageNumber) {
    end = ARTICLES_RANGE_FOR_PAGINATION;
  }

  return `${start} – ${end} of ${articlesCount} results`;
};

export const getSearchItem = (search, itemName, fullString) => {
  if (!search) return null;
  const splitSearch = search.split('&');
  const splitSearchItem = splitSearch.find(item => item.includes(itemName));
  if (splitSearchItem) {
    return fullString ? splitSearchItem.replace('?', '') : (splitSearchItem.split('='))[1];
  }
  return null;
};

export const toUppercaseAndSnakeCase = value =>
  value?.toUpperCase().replace(/-/g, '_');

export const getTagsOptionByTopic = topic =>
  (topic === SENIOR_LIVING_GUIDES_TOPIC && seniorLivingGuidesTags) ||
  (topic === HEALTH_AND_LIFESTYLE_TOPIC && healthAndLifestyleTags);

export const getTagsSelectDefaultValue = (search, topic) => {
  const tagName = getSearchItem(search, 'tag-name');
  if (tagName) {
    const tagList = getTagsOptionByTopic(topic);
    const defaultValue = tagList.find(item => item.value === tagName);
    if (defaultValue) {
      return defaultValue;
    }
  }
  return selectAllArticlesItem;
};

export const onChangeTagsSelect = (search, history) => ({ value }) => {
  let tagNameSearchItem = null;
  if (value !== selectAllArticlesItem.value) {
    tagNameSearchItem = `?tag-name=${value}`;
  }
  history.push({ search: `${tagNameSearchItem || ''}` });
};

export const isActiveTab = (search, value) => {
  if (value === selectAllArticlesItem.value && !getSearchItem(search, 'tag-name')) return true;
  return getSearchItem(search, 'tag-name') === value;
};

export const getStylesForEllipsisText = (maxRowQty, styles = {}) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: maxRowQty,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ...styles,
});
