export const medicareToBool = (medicare) => {
  if (medicare === 'not-sure') return null;
  return medicare === 'yes';
};

export const boolToMedicare = (medicare) => {
  if (medicare === null || typeof medicare === 'undefined') return 'not-sure';
  return medicare ? 'yes' : 'no';
};
