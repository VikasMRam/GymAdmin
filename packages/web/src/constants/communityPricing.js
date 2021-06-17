export const costSections = [
  'Assisted Living', 'Independent Living', 'Memory Care', 'Additional Costs',
];


const memoryCareRoomTypes = [{ label: 'Private Room', value: 'privateRoom' }, { label: 'Shared Room', value: 'sharedBedroom' }];


const assistedLivingIndependentLivingRoomTypes = [
  { label: 'Studio', value: 'studio' }, { label: 'One Bedroom', value: 'oneBedroom' }, { label: 'Two Bedroom', value: 'twoBedroom' },
  ...memoryCareRoomTypes,
];


export const valueToLabel = {
  studio: 'Studio',
  oneBedroom: 'One Bedroom',
  twoBedroom: 'Two Bedroom',
  privateRoom: 'Private Room',
  sharedBedroom: 'Shared Bedroom',
  additionalService: 'Additional levels of care',
  secondPerson: 'Second person fee',
};


export const orderedLabels = [
  'Studio',
  'One Bedroom',
  'Two Bedroom',
  'Private Room',
  'Shared Room',
  'Additional levels of care',
  'Second person fee',
];

export const costSectionOptions = {
  'Assisted Living': {
    costHeading: 'Room Types',
    costTypes: [...assistedLivingIndependentLivingRoomTypes] },
  'Independent Living': {
    costHeading: 'Room Types',
    costTypes: [...assistedLivingIndependentLivingRoomTypes],
  },
  'Memory Care': {
    costHeading: 'Room Types',
    costTypes: [...memoryCareRoomTypes],
  },
  'Additional Costs': {
    costHeading: 'Other fees and services',
    costTypes: [{ label: 'Additional levels of care', value: 'additionalService' }, { label: 'Second person fee', value: 'secondPerson' }],
  },
};

export const costTypeOptions = [{ value: 'range', label: 'Range' }, { value: 'from', label: 'From' }];

export const memoryCareCostTypeOptions = [{ value: 'range', label: 'Range' }, { value: 'from', label: 'From' }, { value: 'inclusive', label: 'All Inclusive' }];
