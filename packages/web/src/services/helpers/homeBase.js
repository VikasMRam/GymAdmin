import user from 'sly/common/propTypes/user';

export const getWelcomeContent = (homebase = {}, qp = {}, step) => {
  const { modal = '', communityName = 'your requested community' } = qp;
  // console.log('seeing homeBase', homebase);
  // console.log('seeing entry', entry);
  let key =  'communityPricing';
  let userName = 'there';
  if (homebase && homebase.user && homebase.user.name) {
    userName =  homebase.user.name.split(' ')[0];
  }
  if (modal !== '') {
    key = modal;
  }
  // Define which modal you want to display from entry
  const welcomeText = {
    communityPricing: {
      banner: { title: `Hi ${userName}, welcome to your Home Base!`,
        description: 'Here you can find information about your local advisor, community recommendations, helpful articles, personalized services and offers and much more.' },
      modal: {
        matched: { heading: 'We\'ve sent your request!',
          caption: 'What happens next?',
          description: `Your Seniorly Local Advisor will contact you shortly to follow up with pricing and availability for ${communityName}. In the meantime, you can explore our recommendations and other helpful resources in your Home Base.`,
        },
        noAgent: { heading: 'We\'ve sent your request!',
          caption: 'Ready to explore your Home Base?',
          description: 'This is your private Seniorly space where you’ll see our recommendations for the best communities for your needs and budget. You’ll also find other helpful resources and special offers in your Seniorly Home Base.',
        },
      },
    },
    communityRecommendations: {
      banner: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      modal: {
        matched: { heading: 'We\'ve sent your request!',
          caption: 'What happens next?',
          description: `Your Seniorly Local Advisor will contact you shortly to follow up with pricing and availability for ${communityName}. In the meantime, you can explore our recommendations and other helpful resources in your Home Base.`,
        },
        noAgent: { heading: 'We\'ve sent your request!',
          caption: 'Ready to explore your Home Base?',
          description: 'This is your private Seniorly space where you’ll see our recommendations for the best communities for your needs and budget. You’ll also find other helpful resources and special offers in your Seniorly Home Base.',
        },
      },
    },
    generalRecommendations: {
      banner: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      modal: {
        matched: { heading: 'We\'ve sent your request!',
          caption: 'What happens next?',
          description: 'A Seniorly Local Advisor will contact you shortly to help you understand your options, offer expert insights, and answer any questions you may have. In the meantime, you can explore our recommendations and other helpful resources in your Home Base.',
        },
        noAgent: { heading: 'We\'ve sent your request!',
          caption: 'Ready to explore your Home Base?',
          description: 'This is your private Seniorly space where you’ll see our recommendations for the best communities for your needs and budget. You’ll also find other helpful resources and special offers in your Seniorly Home Base.',
        },
      },
    },
    speakExpert: {
      banner: { title: 'We need to ask a few quick questions to understand your needs',
        description: 'Since pricing can vary depending on your preferences and care needs, you’ll get more accurate, up-to-date information working with a Seniorly Local Advisor.' },
      modal: {
        matched: { heading: 'We\'ve sent your request!',
          caption: 'What happens next?',
          description: 'A Seniorly Local Advisor will contact you shortly to help you understand your options, offer expert insights, and answer any questions you may have. In the meantime, you can explore our recommendations and other helpful resources in your Home Base.',
        },
        noAgent: { heading: 'We\'ve sent your request!',
          caption: 'Ready to explore your Home Base?',
          description: 'This is your private Seniorly space where you’ll see our recommendations for the best communities for your needs and budget. You’ll also find other helpful resources and special offers in your Seniorly Home Base.',
        },
      },
    },
  };
  return welcomeText[key][step];
};


export const getWelcomeModalContent = (entry, homeBase) => {
  const bc = {
    title: 'Your request has been received',
    description: 'Here you can find information about your local advisor, community recommendations, helpful articles, personalized services and offers and much more',
  };
  return bc;
};

export const shouldShowModal = (modal) => {
  const validModals = ['communityPricing', 'communityRecommendations', 'generalRecommendations', 'speakExpert'];
  return validModals.indexOf(modal) > -1;
};

export const getChecklistItems = (homeBase, uuidAux) => {
  const itemList = [{ checked: false, text: 'Finish your senior living quiz' }, { checked: true, text: 'Connect with your Advisor' },
    { checked: false, text: 'Evaluate Options' }, { checked: false, text: 'Prepare to move' }, { checked: false, text: 'Move to your new home' }];
  const stepsCompleted = [0, 0, 0, 0, 0];
  const { conversionInfo } = uuidAux;
  if (conversionInfo) {
    const wizardActions = conversionInfo.filter((e) => { return e.page.indexOf('wizard') > -1; });
    if (wizardActions.length > 0) {
      stepsCompleted[0] = 1;
    }
  }
  const { client } = homeBase;
  if (client) {
    if (client.stage === 'Family Chose My Referral') {
      stepsCompleted[1] = 1; stepsCompleted[2] = 1; stepsCompleted[3] = 1;
    } else if (client.stage === 'Active Tours' || client.stage === 'Post Tours') {
      stepsCompleted[1] = 1; stepsCompleted[2] = 1;
    } else if (client.stage === 'Discussing Options') {
      stepsCompleted[1]  = 1;
    }
  }
  for (let j = 0; j < stepsCompleted.length; j++) {
    if (stepsCompleted[j]) {
      itemList[j].checked = true;
    }
  }
  return itemList;
};
