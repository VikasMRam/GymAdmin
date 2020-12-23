import { urlize, stateRegionMap, getStateAbbr, objectToURLQueryParams } from 'sly/web/services/helpers/url';

const validNumber = x => typeof x === 'number' || x === undefined;


export const generateAskAgentQuestionContents = (name, city, type) => {
  let heading = `Ask your Seniorly Local Advisor a question about ${name} in ${city}.`;
  let placeholder = `Hi, I have a question about ${name} in ${city}...`;
  let description = null;
  let question = null;

  if (type === 'tour') {
    heading = 'We have received your tour request.';
    description = 'Your Seniorly Local Advisor will reach out to you soon. Feel free to ask them any questions in' +
      ' the meantime.';
    placeholder = `Hi, I would like more information about ${name}.`;
  } else if (type === 'pricing') {
    heading = 'We have received your custom pricing request.';
    description = 'Your Seniorly Local Advisor will reach out to you soon. Feel free to ask them any questions in the meantime.';
  } else if (type === 'offer') {
    heading = `Ask your Seniorly Local Advisor about the holiday incentive at ${name}`;
    question = `Hi, I am interested in knowing more about the holiday promotion at ${name}. I am looking for...`;
  } else if (type === 'services') {
    heading = `Ask your Seniorly Local Advisor about services provided at ${name}`;
    question = `Hi, I would like more information about ${name}'s amenities.`;
  } else if (type === 'expert') {
    heading = 'Get help from an Expert';
    question = `Hi, I would like more information about ${name}`;
  } else if (type === 'covid-banner') {
    heading = `We are excited to provide you a virtual tour of ${name}`;
    description = 'Please tell us when you are available to take your virtual tour?';
    placeholder = 'Write your preferred day and time here.';
  } else if (type === 'profile-content-question') {
    heading = `Ask us anything about living at ${name}`;
    question = 'Hi, I am interested in knowing more about...';
  }

  return {
    heading,
    placeholder,
    description,
    question,
  };
};

export const isOnVacation = (agent) => {
  const { name: businessName, info = {}, status } = agent;
  const { vacationStart, vacationEnd } = info;
  try {
    const now = new Date();
    const eDate = Date.parse(vacationEnd);
    return eDate > now;
  } catch (e) {
    return false;
  }
};
