export const STEP_ORDERS = {
  flow1: ['LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'CitySearch', 'LeadFound'],
  flow2: ['CitySearch', 'LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'LeadFound'],
};

export const DEFAULT_STEP_ORDER = 'flow2';

export const STEP_INPUT_FIELD_NAMES = {
  LookingFor: ['looking_for'],
  CareNeeds: ['care_needs'],
  BuyingOrRenting: ['renting_or_buying'],
  MonthlyBudget: ['monthly_budget', 'medicaid_coverage'],
  CitySearch: ['location'],
  LeadFound: ['fullName', 'email', 'phone'],
};
