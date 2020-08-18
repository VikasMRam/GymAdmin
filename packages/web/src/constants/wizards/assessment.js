export const WHO_PERSON_OPTIONS = [
  { label: 'Parent(s)', value: 'parents' },
  { label: 'Myself', value: 'myself' },
  { label: 'Spouse', value: 'spouse' },
  { label: 'Myself and spouse', value: 'myself-and-spouse' },
  { label: 'Other Relative(s)', value: 'other-relatives' },
  { label: 'Friend(s)', value: 'friend' },
  { label: 'Other', value: 'other' },
  // v1 OPTIONS BELOW:
  // { label: 'Mom', value: 'mom' },
  // { label: 'Dad', value: 'dad' },
  // { label: 'Wife', value: 'wife' },
  // { label: 'Husband', value: 'husband' },
  // { label: 'Grandmother', value: 'grandmother' },
  // { label: 'Grandfather', value: 'grandfather' },
  // { label: 'Mother-in-law', value: 'mother-in-law' },
  // { label: 'Father-in-law', value: 'father-in-law' },
  // { label: 'Aunt', value: 'aunt' },
  // { label: 'Uncle', value: 'uncle' },
  // { label: 'Brother', value: 'brother' },
  // { label: 'Sister', value: 'sister' },
  //
  // { label: 'Client', value: 'client' },
  // { label: 'Patient', value: 'patient' },
  // { label: 'Myself', value: 'myself' },
];

export const AGE_OPTIONS = [
  { label: 'Below 40', value: 'below-40' },
  { label: '40-49', value: '40-49' },
  { label: '50-59', value: '50-59' },
  { label: '60-69', value: '60-69' },
  { label: '70+', value: '70+' },
];

export const LIVE_SEARCH_STATE = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const LOCAL_EXPERT_INTEREST = [
  { label: 'Yes definitely', value: 'yes' },
  { label: 'I might be', value: 'maybe' },
  { label: 'Not now', value: 'no' },
];

export const SERVICES_OPTIONS = [
  { label: 'Power of Attorney, wills, or other legal help', value: 'legal' },
  { label: 'Moving, packing, and/or estate sales', value: 'moving' },
  { label: 'Private caregiving services at home', value: 'private-caregiving' },
  { label: 'Making an existing home more accessible', value: 'home-accessibility' },
  { label: 'Selling an existing home', value: 'home-sale' },
  { label: 'Reverse mortgages on an existing home', value: 'reverse-mortgage' },
  { label: 'Not interested in any of these services at this time', value: 'none' },
];

export const PRODUCTS_OPTIONS = [
  { label: 'Furniture packages for your new apartment', value: 'furniture' },
  { label: 'Accessory Dwelling Units to install in your existing home', value: 'dwelling-units' },
  { label: 'Medicare Advantage plans', value: 'medicare-advantage' },
  { label: 'Subscription service for adult diapers', value: 'subscriptions-diapers' },
  { label: 'Subscription service for Life Alert monitoring', value: 'subscriptions-lifealert' },
  { label: 'Cell phone or tablet designed for seniors', value: 'celltab-seniors' },
  { label: 'Not interested in any of these services at this time', value: 'none' },
];

export const FEELING_OPTIONS = [
  { label: "I'm feeling excited about it", value: 'excited' },
  { label: 'I have mixed feelings about it', value: 'mixed-feelings' },
  { label: "I'm feeling anxious about it", value: 'anxious' },
];

export const ADL_OPTIONS = [
  { label: 'Memory Care', value: 'memory-care' },
  { label: 'Bathing', value: 'bathing' },
  { label: 'Dressing', value: 'dressing' },
  { label: 'Transferring', value: 'transferring' },
  { label: 'Toileting', value: 'toileting' },
  { label: 'Eating', value: 'eating' },
  { label: 'Medication management', value: 'medication-management' },
  { label: 'Other', value: 'other' },
  { label: 'None', value: 'none' },
  { label: "I'm not sure", value: 'im-not-sure' },
];

export const COEXISTING_ADL_OPTIONS = {
  bathing: ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  dressing: ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  transferring: ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  toileting: ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  eating: ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  'medication-management': ['bathing', 'dressing', 'transferring', 'toileting', 'eating', 'medication-management'],
  none: ['none'],
  'im-not-sure': ['im-not-sure'],
};

export const DEMENTIA_FORGETFUL_OPTIONS = {
  parents: [
    { label: 'Yes, they are also at risk of wandering', value: 'risk-of-wandering' },
    { label: 'Yes, they often forget the names of friends and family', value: 'forget-names' },
    { label: 'Yes, they often forget to do things like take medicine', value: 'forget-to-do-things' },
    { label: 'No', value: 'no' },
    { label: "I'm not sure", value: 'iam-not-sure' },
  ],
  'myself-and-spouse': [
    { label: 'Yes, one or both of us are also at risk of wandering', value: 'risk-of-wandering' },
    { label: 'Yes, one or both of us often forget the names of friends and family', value: 'forget-names' },
    { label: 'Yes, one or both of us often forget to do things like take medicine', value: 'forget-to-do-things' },
    { label: 'No', value: 'no' },
    { label: "I'm not sure", value: 'iam-not-sure' },
  ],
};

const maleDementiaForgetfulDefaultOptions = [
  { label: 'Yes, he is also at risk of wandering', value: 'risk-of-wandering' },
  { label: 'Yes, he often forgets the names of friends and family', value: 'forget-names' },
  { label: 'Yes, he often forgets to do things like take medicine', value: 'forget-to-do-things' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'iam-not-sure' },
];

const femaleDementiaForgetfulDefaultOptions = [
  { label: 'Yes, she is also at risk of wandering', value: 'risk-of-wandering' },
  { label: 'Yes, she often forgets the names of friends and family', value: 'forget-names' },
  { label: 'Yes, she often forgets to do things like take medicine', value: 'forget-to-do-things' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'iam-not-sure' },
];

const theyDementiaForgetfulDefaultOptions = [
  { label: 'Yes, they are also at risk of wandering', value: 'risk-of-wandering' },
  { label: 'Yes, they often forget the names of friends and family', value: 'forget-names' },
  { label: 'Yes, they often forget to do things like take medicine', value: 'forget-to-do-things' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'iam-not-sure' },
];

export const DEMENTIA_FORGETFUL_DEFAULT_OPTIONS = {
  dad: maleDementiaForgetfulDefaultOptions,
  mom: femaleDementiaForgetfulDefaultOptions,
  wife: femaleDementiaForgetfulDefaultOptions,
  husband: maleDementiaForgetfulDefaultOptions,
  grandmother: femaleDementiaForgetfulDefaultOptions,
  grandfather: maleDementiaForgetfulDefaultOptions,
  'mother-in-law': femaleDementiaForgetfulDefaultOptions,
  'father-in-law': maleDementiaForgetfulDefaultOptions,
  aunt: femaleDementiaForgetfulDefaultOptions,
  uncle: maleDementiaForgetfulDefaultOptions,
  brother: maleDementiaForgetfulDefaultOptions,
  sister: femaleDementiaForgetfulDefaultOptions,
  friend: theyDementiaForgetfulDefaultOptions,
  client: theyDementiaForgetfulDefaultOptions,
  patient: theyDementiaForgetfulDefaultOptions,
  myself: [
    { label: 'Yes, I am at risk of wandering', value: 'risk-of-wandering' },
    { label: 'Yes, I often forget the names of friends and family', value: 'forget-names' },
    { label: 'Yes, I often forget to do things like take medicine', value: 'forget-to-do-things' },
    { label: 'No', value: 'no' },
    { label: "I'm not sure", value: 'iam-not-sure' },
  ],
};

export const TIMING_OPTIONS = [
  // { label: 'Just starting to research communities', value: 'starting' },
  // { label: 'Working with a senior living advisor', value: 'working' },
  // { label: 'Inquired directly to communities', value: 'inquired' },
  // { label: 'Toured one or more communities', value: 'toured' },
  // { label: 'Already chosen a community and am just comparing', value: 'already-chosen' },
  { label: 'Need to find a community as soon as possible', value: 'asap' },
  { label: 'Just starting to research communities', value: 'researching' },
  { label: 'I\'m in the process of planning for the future', value: 'planning' },
];

export const WORKING_WITH_OPTIONS = [
  { label: 'Working with a senior living advisor', value: 'working' },
  { label: 'Inquired directly to communities', value: 'inquired' },
  { label: 'Toured one or more communities', value: 'toured' },
  { label: 'None of these apply', value: 'none-apply' },
];

export const CURRENT_LIVING_OPTIONS = {
  parents: [
    { label: 'Currently waiting to be discharged', value: 'waiting' },
    { label: 'Living at home alone', value: 'home' },
    { label: 'Living at home with a child', value: 'home-with-child' },
    { label: 'Living at another senior living community', value: 'another-community' },
    { label: 'Other', value: 'other' },
    { label: "I'm not sure", value: 'not-sure' },
  ],
  'myself-and-spouse': [
    { label: 'Currently waiting to be discharged', value: 'waiting' },
    { label: 'Living at home alone', value: 'home' },
    { label: 'Living at home with a child', value: 'home-with-child' },
    { label: 'Living at another senior living community', value: 'another-community' },
    { label: 'Other', value: 'other' },
    { label: "I'm not sure", value: 'not-sure' },
  ],
};

export const CURRENT_LIVING_DEFAULT_OPTIONS = [
  { label: 'Currently waiting to be discharged', value: 'waiting' },
  { label: 'Living at home alone', value: 'home' },
  { label: 'Living at home with a spouse or child', value: 'home-with-spouse-or-child' },
  { label: 'Living at another senior living community', value: 'another-community' },
  { label: 'Other', value: 'other' },
  { label: "I'm not sure", value: 'not-sure' },
];

export const BUDGET_OPTIONS = [
  { label: 'Veterans benefits', value: 'veterans' },
  { label: 'Long term care insurance policy holder', value: 'long-term-care-insurance' },
  { label: 'Life insurance policy holder', value: 'life-insurance' },
  { label: 'Equity in a home', value: 'equity-home' },
  { label: 'Pension plan', value: 'pension-plan' },
  { label: "I don't have access to any of these benefits", value: 'dont-have' },
  { label: "I'm not sure", value: 'not-sure' },
];

export const COEXISTING_BUDGET_OPTIONS = {
  'dont-have': ['dont-have', 'not-sure'],
};

export const COEXISTING_DEMENTIA_OPTIONS = {
  no: ['no', 'not-sure'],
};

export const MEDICAID_OPTIONS = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'not-sure' },
];

export const ASSESSMENT_WIZARD_MATCHED_AGENT = 'assesmentWizardMatchedAgent';
export const ASSESSMENT_WIZARD_COMPLETED = 'assesmentWizardCompleted';
export const ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES = 'assesmentWizardCompletedCommunities';
