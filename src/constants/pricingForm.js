export const EST_ADDL_COST_ACCOMODATION = {
  'shared-suite': -350,
  suite: 0,
  '1-bedroom': 1000,
  '2-bedroom': 1250,
};

export const EST_ADDL_COST_CARE_SERVICE = {
  none: -250,
  'memory-care': 550,
  'medication-management': 0,
  'mobility-assistance': 150,
  'eating-assistance': 150,
  'bathing-assistance': 120,
  'extra-supervision': 250,
  'palliative-care': 500,
  'diabetes-care': 150,
  'physical-therapy': 200,
  other: 0,
};

export const ROOMTYPE_OPTIONS = [
  { label: 'Shared', value: 'shared-suite' },
  { label: 'Suite', value: 'suite' },
  { label: '1 Bedroom', value: '1-bedroom' },
  { label: '2 Bedroom', value: '2-bedroom' },
  // { label: "I'm not sure", value: 'i-am-not-sure' },
];

export const CARETYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Memory Care', value: 'memory-care' },
  // { label: 'Palliative Care', value: 'palliative-care' },
  // { label: 'Medication Management', value: 'medication-management' },
  // { label: 'Physical Therapy', value: 'physical-therapy' },
  // { label: 'Parkinsons Care', value: 'parkinsons-care' },
  // { label: 'Diabetes Care', value: 'diabetes-care' },
  { label: 'Medication Management', value: 'medication-management' },
  { label: 'Mobility Assistance', value: 'mobility-assistance' },
  { label: 'Eating Assistance', value: 'eating-assistance' },
  { label: 'Bathing Assistance', value: 'bathing-assistance' },
  { label: 'Extra Supervision', value: 'extra-supervision' },
  { label: 'Other', value: 'other' },
];

export const MEDICAID_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'not-sure' },
];

export const WHAT_TO_NEXT_OPTIONS = [
  { value: 'schedule-tour', label: 'Schedule a tour' },
  { value: 'talk-advisor', label: 'Talk to an advisor', type: 'submit' },
  { value: 'learn-similar-communities', label: 'Learn about similar communities' },
  { value: 'explore-affordable-options', label: 'Explore more affordable options', type: 'submit' },
  {
    value: 'apply-financing',
    label: 'Learn about financing',
    href: 'https://try.seniorly.com/getfinancing/',
    target: '_blank',
  },
];

export const EXPLORE_AFFORDABLE_PRICING_OPTIONS = [
  {
    value: 'less-than-$2000',
    label: 'Less than $2000',
    href: 'https://www.seniorly.com/resources/articles/low-income-assisted-living',
    target: '_blank',
  },
  { value: '$2000-$3000', label: '$2000 - $3000', type: 'submit' },
  { value: '$3000-$4000', label: '$3000 - $4000', type: 'submit' },
];
