export const STEP_ORDERS = {
  flow1: ['LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'CitySearch', 'LeadFound'],
  flow2: ['CitySearch', 'LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'LeadFound'],
};

export const DEFAULT_STEP_ORDER = 'flow2';

export const STEP_INPUT_FIELD_NAMES = {
  LookingFor: ['lookingFor'],
  CareNeeds: ['careNeeds'],
  BuyingOrRenting: ['rentingOrBuying'],
  MonthlyBudget: ['monthlyBudget', 'medicaidCoverage'],
  CitySearch: ['location'],
  LeadFound: ['name', 'email', 'phone'],
};
