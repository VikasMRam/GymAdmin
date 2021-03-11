import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { urlize } from 'sly/web/services/helpers/url';

export const SENIOR_LIVING_GUIDES_TOPIC = 'SENIOR_LIVING_GUIDES';
export const HEALTH_AND_LIFESTYLE_TOPIC = 'HEALTH_AND_LIFESTYLE';

export const ARTICLES_RANGE_FOR_PAGINATION = 18;

export const topics = [
  { label: SENIOR_LIVING_GUIDES_TOPIC, value: 'Senior Living Guides', to: `${RESOURCE_CENTER_PATH}/senior-living-guides` },
  { label: 'CITY_GUIDES', value: 'City Guides', to: `${RESOURCE_CENTER_PATH}/city-guides` },
  { label: HEALTH_AND_LIFESTYLE_TOPIC, value: 'Health and Lifestyle', to: `${RESOURCE_CENTER_PATH}/health-and-lifestyle` },
  { label: 'CAREGIVERS', value: 'Caregivers', to: `${RESOURCE_CENTER_PATH}/caregivers` },
  { label: 'VOICES', value: 'Voices', to: `${RESOURCE_CENTER_PATH}/voices` },
  { label: 'SENIOR_NEWS_AND_ANNOUNCEMENTS', value: 'Senior news and Announcements', to: `${RESOURCE_CENTER_PATH}/senior-news-and-announcements` },
];

export const selectAllArticlesItem = { value: 'ALL_ARTICLES', label: 'All articles' };

export const seniorLivingGuidesTags = [
  selectAllArticlesItem,
  { value: 'ASSISTED_LIVING', label: 'Assisted living' },
  { value: 'INDEPENDENT_LIVING', label: 'Independent living' },
  { value: 'MEMORY_CARE', label: 'Memory care' },
  { value: 'CCRC', label: 'CCRC' },
  { value: 'HOME_CARE', label: 'Home care' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'LEGAL', label: 'Legal' },
  { value: 'ADVISORS', label: 'Advisors' },
  { value: 'CITY_GUIDES', label: 'City guides' },
];

export const healthAndLifestyleTags = [
  selectAllArticlesItem,
  { value: 'LIFESTYLE', label: 'Lifestyle' },
  { value: 'HEALTH', label: 'Health' },
  { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'VETERANS', label: 'Veterans' },
  { value: 'TRAVEL', label: 'Travel' },
  { value: 'BUSINESS', label: 'Business' },
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
  (toUppercaseAndSnakeCase(topic) === SENIOR_LIVING_GUIDES_TOPIC && seniorLivingGuidesTags) ||
  (toUppercaseAndSnakeCase(topic) === HEALTH_AND_LIFESTYLE_TOPIC && healthAndLifestyleTags);

export const getTagsSelectDefaultValue = (search, topic) => {
  const tagName = getSearchItem(search, 'tag-name');
  if (tagName) {
    const tagList = getTagsOptionByTopic(topic);
    const defaultValue = tagList.find(item => item.value === toUppercaseAndSnakeCase(tagName));
    if (defaultValue) {
      return defaultValue;
    }
  }
  return selectAllArticlesItem;
};

export const onChangeTagsSelect = (search, history) => ({ value }) => {
  let tagNameSearchItem = null;
  if (value !== selectAllArticlesItem.value) {
    tagNameSearchItem = `?tag-name=${urlize(value)}`;
  }
  history.push({ search: `${tagNameSearchItem || ''}` });
};

export const isActiveTab = (search, value) => {
  if (value === selectAllArticlesItem.value && !getSearchItem(search, 'tag-name')) return true;
  return toUppercaseAndSnakeCase(getSearchItem(search, 'tag-name')) === value;
};
