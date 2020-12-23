
export const getConversionContent = (entry, step) => {
  let key = 'communityPricing';
  switch (entry) {
    case 'pricing-table', 'footer', 'sidebar':
      key = 'communityPricing';
      break;
    default:
      key = 'communityPricing';
      break;
  }
  // Define which modal you want to display from entry
  const conversionText = {
    communityPricing: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
        description: 'We’ll send your request and connect you with one of our Seniorly Local Advisors who will help you with pricing and availability.' },
      confirmationMatched: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
      confirmationNoAgent: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
    },
    personalizedOptions: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.',
        description: 'We’ll send your request and connect you with one of our Seniorly Local Advisors who will help you with pricing and availability.' },
      confirmationMatched: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
      confirmationNoAgent: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
    },
    speakExpert: {
      intro: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      signup: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
      confirmationMatched: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
      confirmationNoAgent: { heading: 'Thanks! Your information helps our Seniorly Local Advisor understand your timing, needs, and budget.',
        description: 'We’ll send your request and connect you with one of our local experts who can answer your questions about senior living communities in your area.',
      },
    },
  };
  return conversionText[key][step];
};

