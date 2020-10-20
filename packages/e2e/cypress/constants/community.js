export const TEST_COMMUNITY = 'almavia-of-san-francisco';

// single value: Mom, Dad, Parents, Myself and spouse, Wife, Husband, Grandmother, Grandfather, Mother-in-law, Father-in-law, Aunt, Uncle, Brother, Sister, Friend, Client, Patient, Myself
export const LOOKING_FOR = 'Parents';

// single value: 'I\'m feeling excited about it', 'I have mixed feelings about it', 'I\'m feeling anxious about it'
export const SEARCH_FEELING = 'I have mixed feelings about it';

// multiple: Bathing, Dressing, Transferring, Toileting, Eating, Medication management
// (included in test: None, I'm not sure)
export const HELP_REQUIRED = ['Bathing', 'Eating', 'Medication management'];

// multiple: risk-of-wandering, forget-names, forget-to-do-things, no, iam-not-sure
export const FORGETFULNESS = ['forget-names', 'forget-to-do-things', 'risk-of-wandering'];

// multiple: starting, working, inquired, toured, already-chosen
export const SEARCH_TIMING = ['inquired', 'toured'];

// single value: waiting, home, another-community, other, not-sure
// parents or myself-and-spouse : home-with-child
// others : home-with-spouse-or-child
export const CURRENT_LIVING = 'home-with-child';

// multiple: veterans, long-term-care-insurance, life-insurance, equity-home, pension-plan, dont-have, not-sure
export const BUDGET_PLAN = ['veterans', 'long-term-care-insurance'];

// single value: yes, no, not-sure
export const MEDICAID_ALLOWANCE = 'yes';
