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

export const ROOMTYPE_OPTIONS = [
  { label: 'Suite', value: 'suite' },
  { label: '1 Bedroom', value: '1-bedroom' },
  { label: '2 Bedroom', value: '2-bedroom' },
  { label: "I'm not sure", value: 'i-am-not-sure' },
];

export const CARETYPE_OPTIONS = [
  { label: 'Memory Care', value: 'memory-care' },
  { label: 'Palliative Care', value: 'palliative-care' },
  { label: 'Medication Management', value: 'medication-management' },
  { label: 'Physical Therapy', value: 'physical-therapy' },
  { label: 'Parkinsons Care', value: 'parkinsons-care' },
  { label: 'Diabetes Care', value: 'diabetes-care' },
  { label: 'None', value: 'none' },
  { label: 'Other', value: 'other' },
];

export const MEDICAID_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
