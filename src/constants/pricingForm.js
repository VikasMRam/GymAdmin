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

export const MOVETIMELINE_OPTIONS = [
  { label: 'Immediately', value: 'immediately' },
  { label: '1 - 3 months', value: '1-3-months' },
  { label: '3 - 6 months', value: '3-6-months' },
  { label: "I'm not sure", value: 'i-am-not-sure' },
];

export const CARETYPE_OPTIONS = [
  { label: 'None', value: 'none' },
  { label: 'Memory care', value: 'memory-care' },
  // { label: 'Palliative Care', value: 'palliative-care' },
  // { label: 'Physical Therapy', value: 'physical-therapy' },
  // { label: 'Parkinsons Care', value: 'parkinsons-care' },
  // { label: 'Diabetes Care', value: 'diabetes-care' },
  { label: 'Medication management', value: 'medication-management' },
  { label: 'Mobility assistance', value: 'mobility-assistance' },
  { label: 'Eating assistance', value: 'eating-assistance' },
  { label: 'Bathing assistance', value: 'bathing-assistance' },
  { label: 'Extra supervision', value: 'extra-supervision' },
  { label: 'Other', value: 'other' },
];

export const MEDICAID_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'not-sure' },
];

export const WHAT_TO_NEXT_OPTIONS = [
  // { value: 'schedule-tour', label: 'Schedule a tour' },
  { value: 'talk-advisor', label: 'Talk to an advisor', type: 'submit' },
  { value: 'explore-affordable-options', label: 'Explore more options', type: 'submit' },
];

export const EXPLORE_AFFORDABLE_PRICING_OPTIONS = [
  {
    value: '<$2K',
    label: 'Less than $2000',
    // href: 'https://www.seniorly.com/resources/articles/low-income-assisted-living',
    // target: '_blank',
    type: 'submit',
  },
  { value: '$2K-$3K', label: '$2000 - $3000', type: 'submit' },
  { value: '$3K-$4K', label: '$3000 - $4000', type: 'submit' },
];
