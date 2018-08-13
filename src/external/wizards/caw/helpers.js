import { required, minLength, usPhone, email } from 'sly/services/validation';

export const stepOrders = {
  flow1: ['LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'CitySearch', 'LeadFound'],
  flow2: ['CitySearch', 'LookingFor', 'CareNeeds', 'BuyingOrRenting', 'MonthlyBudget', 'LeadFound'],
};
export const defaultStepOrder = 'flow2';
export const inputBasedNextSteps = {
  /* flow1: {
    LookingFor: [
      {
        condition: (data) => {
          return data.looking_for === 'Myself';
        },
        nextStep: 'MonthlyBudget',
      },
    ],
  }, */
};
export const stepInputFieldNames = {
  LookingFor: ['looking_for'],
  CareNeeds: ['care_needs'],
  BuyingOrRenting: ['renting_or_buying'],
  MonthlyBudget: ['monthly_budget', 'medicaid_coverage'],
  CitySearch: ['location'],
  LeadFound: ['full_name', 'email', 'phone'],
};
export const getStepInputFieldValidations = () => {
  const validations = {};
  validations[stepInputFieldNames.LookingFor[0]] = [required];
  validations[stepInputFieldNames.CareNeeds[0]] = [required];
  validations[stepInputFieldNames.BuyingOrRenting[0]] = [required];
  validations[stepInputFieldNames.MonthlyBudget[0]] = [required];
  validations[stepInputFieldNames.CitySearch[0]] = [required, minLength(3)];
  validations[stepInputFieldNames.LeadFound[0]] = [required];
  validations[stepInputFieldNames.LeadFound[1]] = [required, email];
  validations[stepInputFieldNames.LeadFound[2]] = [required, usPhone];
  return validations;
};
export const getStepInputFieldDefaultValues = () => {
  const defaultValues = {};
  defaultValues[stepInputFieldNames.LookingFor[0]] = null;
  defaultValues[stepInputFieldNames.CareNeeds[0]] = {};
  defaultValues[stepInputFieldNames.BuyingOrRenting[0]] = null;
  defaultValues[stepInputFieldNames.MonthlyBudget[0]] = 3500;
  defaultValues[stepInputFieldNames.CitySearch[0]] = null;
  defaultValues[stepInputFieldNames.LeadFound[0]] = null;
  defaultValues[stepInputFieldNames.LeadFound[1]] = null;
  defaultValues[stepInputFieldNames.LeadFound[2]] = null;
  return defaultValues;
};

export const converStepInputToString = (inp) => {
  switch (typeof inp) {
    case 'string':
      return inp;
    case 'object':
      return JSON.stringify(inp);
    default:
      return inp;
  }
};
