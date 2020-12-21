export const getWelcomeBannerContent = (entry, homeBase) => {
  const bc = {
    title: 'Welcome',
    description: 'Here you can find information about your local advisor, community recommendations, helpful articles, personalized services and offers and much more',
  };
  return bc;
};

export const getWelcomeModalContent = (entry, homeBase) => {
  const bc = {
    title: 'Your request has been received',
    description: 'Here you can find information about your local advisor, community recommendations, helpful articles, personalized services and offers and much more',
  };
  return bc;
};

export const shouldShowModal = (modal) => {
  const validModals = ['pricing', 'communityRecommendations', 'generalRecommendations', 'matchExpert'];
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
