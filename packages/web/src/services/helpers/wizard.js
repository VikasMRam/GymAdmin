export const getModalFromEntry = (entry) => {
  // Define which modal you want to display from entry
  const entryModals = {
    communityPricing: 'pricing',
    communityOptions: 'communityRecommendations',
    generalOptions: 'generalRecommendations',
    speakExpert: 'matchExpert',
  };
  return entryModals[entry];
};
