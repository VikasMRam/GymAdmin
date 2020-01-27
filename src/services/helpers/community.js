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
