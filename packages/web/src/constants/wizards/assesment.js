export const WHO_PERSON_OPTIONS = [
  { label: 'Mom', value: 'mom' },
  { label: 'Dad', value: 'dad' },
  { label: 'Parents', value: 'parents' },
  { label: 'Myself and spouse', value: 'myself-and-spouse' },
  { label: 'Wife', value: 'wife' },
  { label: 'Husband', value: 'husband' },
  { label: 'Grandmother', value: 'grandmother' },
  { label: 'Grandfather', value: 'grandfather' },
  { label: 'Mother-in-law', value: 'mother-in-law' },
  { label: 'Father-in-law', value: 'father-in-law' },
  { label: 'Aunt', value: 'aunt' },
  { label: 'Uncle', value: 'uncle' },
  { label: 'Brother', value: 'brother' },
  { label: 'Sister', value: 'sister' },
  { label: 'Friend', value: 'friend' },
  { label: 'Client', value: 'client' },
  { label: 'Patient', value: 'patient' },
  { label: 'Myself', value: 'myself' },
];

export const FEELING_OPTIONS = [
  { label: "I'm feeling excited about it", value: 'excited' },
  { label: 'I have mixed feelings about it', value: 'mixed-feelings' },
  { label: "I'm feeling anxious about it", value: 'anxious' },
];

export const ADL_OPTIONS = [
  { label: 'Bathing', value: 'bathing' },
  { label: 'Dressing', value: 'dressing' },
  { label: 'Transferring', value: 'transferring' },
  { label: 'Toileting', value: 'toileting' },
  { label: 'Eating', value: 'eating' },
  { label: 'Medication management', value: 'medication-management' },
  { label: 'None', value: 'none' },
  { label: "I'm not sure", value: 'im-not-sure' },
];

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
  { label: 'Yes, he often forget the names of friends and family', value: 'forget-names' },
  { label: 'Yes, he often forget to do things like take medicine', value: 'forget-to-do-things' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'iam-not-sure' },
];

const femaleDementiaForgetfulDefaultOptions = [
  { label: 'Yes, she is also at risk of wandering', value: 'risk-of-wandering' },
  { label: 'Yes, she often forget the names of friends and family', value: 'forget-names' },
  { label: 'Yes, she often forget to do things like take medicine', value: 'forget-to-do-things' },
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
