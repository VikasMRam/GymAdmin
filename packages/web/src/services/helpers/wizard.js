export const getModalFromEntry = (entry) => {
  // Define which modal you want to display from entry
  const entryModals = {
    communityFooter: 'communityPricing',
    communitySidebar: 'communityPricing',
    pricingTable: 'communityPricing',
    searchList: 'communityRecommendations',
    communityOptions: 'communityRecommendations',
    generalOptions: 'generalRecommendations',
    speakExpert: 'speakExpert',
  };
  return entryModals[entry];
};

export const getIntroTextFromEntry = (entry) => {
  // Define which modal you want to display from entry
  const introText = {
    communityPricing: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
        description: 'We’ll send your request and connect you with one of our Seniorly Local Advisors who will help you with pricing and availability.' },
    },
    personalizedOptions: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
        description: 'We’ll send your request and connect you with one of our Seniorly Local Advisors who will help you with pricing and availability.' },
    },
    speakExpert: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
        description: 'We’ll send your request and connect you with one of our Seniorly Local Advisors who will help you with pricing and availability.' },
    },
  };
  return introText[entry];
};

