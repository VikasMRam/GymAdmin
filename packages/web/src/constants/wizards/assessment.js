export const WHO_PERSON_OPTIONS = [
  // v2 OPTIONS BELOW
  { label: 'Parent', value: 'parents' },
  { label: 'Spouse or partner', value: 'spouse' },
  { label: 'Myself', value: 'myself' },
  { label: 'Someone else', value: 'other' },
  // v11 OPTIONS BELOW:
  // { label: 'Parents', value: 'parents' },
  // { label: 'Myself', value: 'myself' },
  // { label: 'Spouse', value: 'spouse' },
  // { label: 'Myself and spouse', value: 'myself-and-spouse' },
  // { label: 'Other Relative(s)', value: 'other-relatives' },
  // { label: 'Friend(s)', value: 'friend' },
  // { label: 'Other', value: 'other' },
  // v1 OPTIONS BELOW:
  // { label: 'Parent(s)', value: 'parents' },
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
  // { label: 'Client', value: 'client' },
  // { label: 'Patient', value: 'patient' },
  // { label: 'Myself', value: 'myself' },
];

export const AGENT_OPTIONS = [
  { label: 'Yes, I need to be connected', value: 'agent' },
  { label: 'No, I want to search on my own', value: 'no-agent' },
  { label: 'I am not sure', value: 'im-not-sure' },
];

export const AGE_OPTIONS = [
  // { label: 'Below 40', value: 'below-40' },
  // { label: '40-49', value: '40-49' },
  // { label: '50-59', value: '50-59' },
  { label: 'Below 60', value: 'below-60' },
  { label: '60-69', value: '60-69' },
  { label: '70-79', value: '70-79' },
  { label: '80-89', value: '80-89' },
  { label: '90+', value: '90+' },
];

export const LIVE_SEARCH_STATE = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const LOCAL_EXPERT_OPTIONS = [
  { label: 'Yes, definitely', value: 'yes' },
  { label: 'I might be', value: 'maybe' },
  { label: 'Not now', value: 'no' },
];

export const SERVICES_OPTIONS = [
  // v2 SERVICES
  { label: 'Moving, packing, and/or estate sales', value: 'moving' },
  { label: 'Private caregiving services at home', value: 'private-caregiving' },
  { label: 'Selling an existing home', value: 'home-sale' },
  { label: 'Cell phone or tablet designed for seniors', value: 'celltab-seniors' },
  { label: 'Subscription for Life Alert monitoring', value: 'subscriptions-lifealert' },
  { label: 'Not interested in any of these services at this time', value: 'none' },
  // v1_1 SERVICES
  // { label: 'Power of Attorney, wills, or other legal help', value: 'legal' },
  // { label: 'Moving, packing, and/or estate sales', value: 'moving' },
  // { label: 'Private caregiving services at home', value: 'private-caregiving' },
  // { label: 'Making an existing home more accessible', value: 'home-accessibility' },
  // { label: 'Selling an existing home', value: 'home-sale' },
  // { label: 'Reverse mortgages on an existing home', value: 'reverse-mortgage' },
  // { label: 'Not interested in any of these services at this time', value: 'none' },
];
export const COEXISTING_SERVICES_OPTIONS = {
  moving: ['moving', 'private-caregiving', 'home-sale', 'celltab-seniors', 'subscriptions-lifealert'],
  'private-caregiving': ['moving', 'private-caregiving', 'home-sale', 'celltab-seniors', 'subscriptions-lifealert'],
  'home-sale': ['moving', 'private-caregiving', 'home-sale', 'celltab-seniors', 'subscriptions-lifealert'],
  'celltab-seniors': ['moving', 'private-caregiving', 'home-sale', 'celltab-seniors', 'subscriptions-lifealert'],
  'subscriptions-lifealert': ['moving', 'private-caregiving', 'home-sale', 'celltab-seniors', 'subscriptions-lifealert'],
  none: ['none'],
};

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
  // version 2 options
  { label: 'Memory care (wandering risk, increased confusion, etc.)', value: 'memory-care' },
  { label: 'Activities of daily living (bathing, dressing, eating, etc.)', value: 'adl-general' },
  { label: 'Medication management', value: 'medication-management' },
  { label: "I'm not sure", value: 'im-not-sure' },
  // version 1 options
  // { label: 'Memory care', value: 'memory-care' },
  // { label: 'Bathing', value: 'bathing' },
  // { label: 'Dressing', value: 'dressing' },
  // { label: 'Transferring', value: 'transferring' },
  // { label: 'Toileting', value: 'toileting' },
  // { label: 'Eating', value: 'eating' },
  // { label: 'Medication management', value: 'medication-management' },
  // { label: 'Other', value: 'other' },
  // { label: 'None', value: 'none' },
  // { label: "I'm not sure", value: 'im-not-sure' },
];

export const EXPERIMENT_ADL_OPTIONS = [
  { label: 'Memory care (wandering risk, increased confusion, etc.)', value: 'memory-care' },
  { label: 'Light Supervision (medication management, meals, laundry)', value: 'care-light' },
  { label: 'More Advanced Care (Bathing, dressing, transferring)', value: 'care-heavy' },
  { label: 'No care needs, looking for independent living', value: 'none' },
];

export const COEXISTING_ADL_OPTIONS = {
  'memory-care': ['memory-care', 'adl-general', 'medication-management', 'im-not-sure', 'care-light', 'care-heavy'],
  'adl-general': ['memory-care', 'adl-general', 'medication-management', 'im-not-sure'],
  'medication-management': ['memory-care', 'adl-general', 'medication-management', 'im-not-sure'],
  none: ['none'],
  'im-not-sure': ['memory-care', 'adl-general', 'medication-management', 'im-not-sure'],
  'care-light': ['care-light', 'memory-care'],
  'care-heavy': ['care-heavy', 'memory-care'],
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
  // v1 options below
  // { label: 'Just starting to research communities', value: 'starting' },
  // { label: 'Working with a senior living advisor', value: 'working' },
  // { label: 'Inquired directly to communities', value: 'inquired' },
  // { label: 'Toured one or more communities', value: 'toured' },
  // { label: 'Already chosen a community and am just comparing', value: 'already-chosen' },
  // v2 options below
  { label: 'Need to find a community as soon as possible', value: 'asap' },
  { label: 'Exploring options for the near future', value: 'researching' },
  { label: 'No rush, I’m planning ahead for the next few years', value: 'planning' },
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
  veterans: ['veterans', 'long-term-care-insurance', 'life-insurance', 'equity-home', 'pension-plan'],
  'long-term-care-insurance': ['veterans', 'long-term-care-insurance', 'life-insurance', 'equity-home', 'pension-plan'],
  'life-insurance': ['veterans', 'long-term-care-insurance', 'life-insurance', 'equity-home', 'pension-plan'],
  'equity-home': ['veterans', 'long-term-care-insurance', 'life-insurance', 'equity-home', 'pension-plan'],
  'pension-plan': ['veterans', 'long-term-care-insurance', 'life-insurance', 'equity-home', 'pension-plan'],
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
export const ASSESSMENT_WIZARD_BANNER_DISMISSED = 'assesmentWizardBannerDismissed';

export const ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS =
  ['Intro', 'ResidentName', 'Auth', 'LocalExpert', 'Products', 'End'];


export const WIZARD_EXPERIMENT_ZIP_CODES = ['10501', '10502', '10503', '10504', '10505', '10506', '10507', '10510', '10511', '10514', '10517', '10518', '10519', '10520', '10521', '10522', '10523', '10526', '10527', '10528', '10530', '10532', '10533', '10535', '10536', '10538', '10540', '10543', '10545', '10546', '10547', '10548', '10549', '10550', '10551', '10552', '10553', '10557', '10558', '10560', '10562', '10566', '10567', '10570', '10571', '10572', '10573', '10576', '10577', '10578', '10580', '10583', '10587', '10588', '10589', '10590', '10591', '10594', '10595', '10596', '10597', '10598', '10601', '10602', '10603', '10604', '10605', '10606', '10607', '10610', '10701', '10702', '10703', '10704', '10706', '10707', '10708', '10709', '10710', '10801', '10802', '10803', '10804', '10805', '10960', '10964', '60089', '60301', '60302', '60303', '60304', '60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60610', '60611', '60612', '60613', '60614', '60616', '60618', '60622', '60625', '60630', '60631', '60639', '60640', '60641', '60645', '60646', '60647', '60654', '60656', '60657', '60659', '60660', '60661', '93930', '94002', '94003', '94005', '94010', '94011', '94012', '94013', '94014', '94015', '94016', '94017', '94018', '94019', '94020', '94021', '94025', '94026', '94027', '94028', '94029', '94030', '94031', '94037', '94038', '94044', '94045', '94059', '94060', '94061', '94062', '94063', '94064', '94065', '94066', '94067', '94070', '94074', '94080', '94083', '94096', '94098', '94099', '94101', '94102', '94103', '94104', '94105', '94106', '94107', '94108', '94109', '94110', '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94119', '94120', '94121', '94122', '94123', '94124', '94125', '94126', '94127', '94128', '94129', '94130', '94131', '94132', '94133', '94134', '94135', '94136', '94137', '94138', '94139', '94140', '94141', '94142', '94143', '94144', '94145', '94146', '94147', '94150', '94151', '94152', '94153', '94154', '94155', '94156', '94157', '94158', '94159', '94160', '94161', '94162', '94163', '94164', '94165', '94166', '94167', '94168', '94169', '94170', '94171', '94172', '94175', '94177', '94188', '94199', '94301', '94302', '94303', '94304', '94306', '94307', '94308', '94309', '94310', '94401', '94402', '94403', '94404', '94405', '94406', '94407', '94408', '94409', '94497', '94501', '94502', '94514', '94536', '94537', '94538', '94539', '94540', '94541', '94542', '94543', '94544', '94545', '94546', '94552', '94555', '94557', '94560', '94568', '94577', '94578', '94579', '94580', '94586', '94587', '94588', '94601', '94602', '94603', '94604', '94605', '94606', '94607', '94608', '94609', '94610', '94611', '94612', '94613', '94614', '94615', '94617', '94618', '94619', '94621', '94622', '94623', '94624', '94625', '94626', '94627', '94643', '94649', '94659', '94660', '94661', '94662', '94666', '94701', '94702', '94703', '94704', '94705', '94706', '94707', '94708', '94709', '94710', '94712', '94720', '94901', '94903', '94904', '94912', '94913', '94914', '94915', '94920', '94924', '94925', '94929', '94930', '94933', '94937', '94938', '94939', '94940', '94941', '94942', '94945', '94946', '94947', '94948', '94949', '94950', '94956', '94957', '94960', '94963', '94964', '94965', '94966', '94970', '94971', '94973', '94974', '94976', '94977', '94978', '94979', '94998', '95035', '95036'];
export const WIZARD_EXPERIMENT_STATES = ['CA', 'IL', 'NY', 'FL', 'NJ'];
