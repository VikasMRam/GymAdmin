export const WEIGHT_ACCOMODATION = {
  suite: 0,
  '1-bedroom': 10,
  '2-bedroom': 20,
};

export const WEIGHT_CARE_SERVICE = {
  none: -10,
  'memory-care': 20,
  'palliative-care': 15,
  'medication-management': 0,
  'diabetes-care': 5,
  'physical-therapy': 5,
  other: 0,
};

export const EST_ADDL_COST_ACCOMODATION = {
  'shared-suite':-350,
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
