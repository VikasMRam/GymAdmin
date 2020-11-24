// filter types
export const STATE = 'state';
export const CITY = 'city';
export const TOC = 'toc';
export const SIZE = 'size';
export const GUIDE = 'own-guide';
export const BUDGET = 'budget';
export const RADIUS = 'radius';
export const GEO = 'geo';
export const SORT = 'sort';
export const CARE_SERVICES = 'care-services';
export const NON_CARE_SERVICES = 'non-care-services';
export const ROOM_AMENITIES = 'room-amenities';
export const COMMUNITY_AMENITIES = 'community-amenities';

export const PAGE_NUMBER = 'page-number';
export const PAGE_SIZE = 'page-size';
export const DEFAULT_PAGE_SIZE = 20;

export const MORE_FILTERS = [
  CARE_SERVICES,
  NON_CARE_SERVICES,
  ROOM_AMENITIES,
  COMMUNITY_AMENITIES,
];

export const ALL_FILTERS = [
  TOC,
  SIZE,
  BUDGET,
  ...MORE_FILTERS,
];

export const CLEARABLE_FILTERS = [
  PAGE_NUMBER,
  PAGE_SIZE,
  ...ALL_FILTERS,
];

// TOC
export const NH = 'nursing-homes';
export const AL = 'assisted-living';
export const IL = 'independent-living';
export const MC = 'memory-care';
export const BNC = 'board-and-care-home';
export const CCRC = 'continuing-care-retirement-community';
export const AA = 'active-adult';
export const SNF = 'skilled-nursing-facility';

export const TOCS = {
  [AL]: {
    label: 'Assisted Living',
    value: AL,
    description: 'For seniors who need some help with daily activities and want a supportive community that’s active, social, and engaging.',
    seoLabel: 'Assisted Living Facilities',
  },
  [MC]: {
    label: 'Memory Care',
    value: MC,
    description: 'A supervised and secured community designed to support engagement and quality of life for residents living with dementia.',
    seoLabel: 'Memory Care Facilities',
  },
  [IL]: {
    label: 'Independent Living',
    value: IL,
    description: 'For active older adults who want to downsize to a home in a retirement community but don’t need help to live independently.',
    seoLabel: 'Independent Living Communities',
  },
  [BNC]: {
    label: 'Board and Care Home',
    value: BNC,
    description: 'Homes in residential neighborhoods that are equipped and staffed to provide daily care for a small number of residents.',
    seoLabel: 'Board and Care Homes',
  },
  [CCRC]: {
    label: 'Continuing Care Retirement Communities',
    value: CCRC,
    description: 'For residents who want to age in place as their care needs change—from Independent Living to nursing care. Requires a buy-in fee.',
    seoLabel: 'Continuing Care Retirement Communities',
  },
  [AA]: {
    label: 'Active Adult Communities(55+)',
    value: AA,
    description: 'Communities of houses and apartments for residents 55 and older who live independently, enjoying an active, social lifestyle.',
    seoLabel: 'Active Adult (55+)',
  },
  [SNF]: {
    label: 'Skilled Nursing Facilities',
    value: SNF,
    description: 'For seniors with more serious medical needs who require skilled care following a hospitalization, illness, or surgery.',
    seoLabel: 'Skilled Nursing Facilities',
  },
};

// SIZE

export const SMALL = 'small';
export const MEDIUM = 'medium';
export const LARGE = 'large';

export const SIZES = {
  [SMALL]: {
    label: 'Small',
    value: SMALL,
    description: '(<20) Home-like environment',
  },
  [MEDIUM]: {
    label: 'Medium',
    value: MEDIUM,
    description: '(20-50) Boutique environment',
  },
  [LARGE]: {
    label: 'Large',
    value: LARGE,
    description: '(50+) Hotel-like environment',
  },
};

// BUDGET

const $2500 = 2500;
const $3000 = 3000;
const $3500 = 3500;
const $4000 = 4000;
const $4500 = 4500;
const $5000 = 5000;
const $5500 = 5500;
const $6000 = 6000;
const $100000 = 100000;

export const BUDGETS = {
  [$2500]: {
    label: 'Up to $2500',
    segment: '2500-dollars',
    value: $2500,
  },
  [$3000]: {
    label: 'Up to $3000',
    segment: '3000-dollars',
    value: $3000,
  },
  [$3500]: {
    label: 'Up to $3500',
    segment: '3500-dollars',
    value: $3500,
  },
  [$4000]: {
    label: 'Up to $4000',
    segment: '4000-dollars',
    value: $4000,
  },
  [$4500]: {
    label: 'Up to $4500',
    segment: '4500-dollars',
    value: $4500,
  },
  [$5000]: {
    label: 'Up to $5000',
    segment: '5000-dollars',
    value: $5000,
  },
  [$5500]: {
    label: 'Up to $5500',
    segment: '5500-dollars',
    value: $5500,
  },
  [$6000]: {
    label: 'Up to $6000',
    segment: '6000-dollars',
    value: $6000,
  },
  [$100000]: {
    label: 'More than $6000',
    segment: 'greater-than-6000-dollars',
    value: $100000,
  },
};

// SERVICES

export const CARE_SERVICES_OPTIONS = [
  { value: 'Medication management', label: 'Medication management' },
  { value: 'Meal preparation and service', label: 'Meal preparation and service' },
  { value: 'Transportation arrangement', label: 'Transportation arrangement' },
  { value: '24-hour call system', label: '24-hour call system' },
  { value: '24-hour supervision', label: '24-hour supervision' },
  { value: 'Coordination with health care providers', label: 'Coordination with health care providers' },
];

export const NON_CARE_SERVICES_OPTIONS = [
  { value: 'Housekeeping and linen services', label: 'Housekeeping and linen services' },
  { value: 'Fitness programs', label: 'Fitness programs' },
  { value: 'Community-sponsored activities', label: 'Community-sponsored activities' },
  { value: 'Move-in coordination', label: 'Move-in coordination' },
  { value: 'Planned day trips', label: 'Planned day trips' },
  { value: 'Transportation arrangement (non-medical)', label: 'Transportation arrangement (non-medical)' },
];

export const ROOM_AMENITIES_OPTIONS = [
  { value: 'Cable', label: 'Cable' },
  { value: 'Wifi', label: 'Wifi' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Telephone', label: 'Telephone' },
  { value: 'Air-conditioning', label: 'Air-conditioning' },
  { value: 'Kitchenettes', label: 'Kitchenettes' },
];

export const COMMUNITY_AMENITIES_OPTIONS = [
  { value: 'Dining room', label: 'Dining room' },
  { value: 'Restaurant-style dining', label: 'Restaurant-style dining' },
  { value: 'Outdoor patio', label: 'Outdoor patio' },
  { value: 'Garden', label: 'Garden' },
  { value: 'Beauty salon', label: 'Beauty salon' },
  { value: 'Located close to shopping centers', label: 'Located close to shopping centers' },
];

