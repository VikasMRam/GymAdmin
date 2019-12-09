export const careServiceMap = {
  '24-Hour Call System': '24-Hour Supervision',
  'Mental Wellness Program': 'Mental Wellness Program',
  'Diabetes Diet': 'Diabetes Care',
  'Parkinsons Care': 'Parkinsons Care',
  'Hospice Waiver': 'Hospice Waiver',
  'Memory Care': 'Memory Care',
  'Medication Management': 'Medication Management',
  'Rehabilitation Program': 'Rehabilitation Program',
};

export const hasCCRC = (community) => {
  const { propInfo } = community;
  const { typeCare } = propInfo;
  return typeCare.includes('Continuing Care Retirement Community(CCRC)');
};

export const hasSNF = (community) => {
  const { propInfo } = community;
  const { typeCare } = propInfo;
  return typeCare.includes('Skilled Nursing Facility');
};
