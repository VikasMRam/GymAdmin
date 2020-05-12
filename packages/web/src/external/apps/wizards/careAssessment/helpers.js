import { required, minLength, usPhone, email } from 'sly/web/services/validation';
import { STEP_INPUT_FIELD_NAMES } from 'sly/web/external/constants/steps';

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
export const getStepInputFieldValidations = () => {
  const validations = {};
  validations[STEP_INPUT_FIELD_NAMES.LookingFor[0]] = [required];
  validations[STEP_INPUT_FIELD_NAMES.CareNeeds[0]] = [required];
  validations[STEP_INPUT_FIELD_NAMES.BuyingOrRenting[0]] = [required];
  validations[STEP_INPUT_FIELD_NAMES.MonthlyBudget[0]] = [required];
  validations[STEP_INPUT_FIELD_NAMES.CitySearch[0]] = [required, minLength(3)];
  validations[STEP_INPUT_FIELD_NAMES.LeadFound[0]] = [required];
  validations[STEP_INPUT_FIELD_NAMES.LeadFound[1]] = [required, email];
  validations[STEP_INPUT_FIELD_NAMES.LeadFound[2]] = [required, usPhone];
  return validations;
};
export const getStepInputFieldDefaultValues = () => {
  const defaultValues = {};
  defaultValues[STEP_INPUT_FIELD_NAMES.LookingFor[0]] = undefined;
  defaultValues[STEP_INPUT_FIELD_NAMES.CareNeeds[0]] = [];
  defaultValues[STEP_INPUT_FIELD_NAMES.BuyingOrRenting[0]] = undefined;
  defaultValues[STEP_INPUT_FIELD_NAMES.MonthlyBudget[0]] = 3500;
  defaultValues[STEP_INPUT_FIELD_NAMES.CitySearch[0]] = undefined;
  defaultValues[STEP_INPUT_FIELD_NAMES.LeadFound[0]] = undefined;
  defaultValues[STEP_INPUT_FIELD_NAMES.LeadFound[1]] = undefined;
  defaultValues[STEP_INPUT_FIELD_NAMES.LeadFound[2]] = undefined;
  return defaultValues;
};

export const converStepInputToString = (inp) => {
  switch (typeof inp) {
    case 'string':
      return inp;
    case 'object':
      return JSON.stringify(inp);
    default:
      if (inp.toString) {
        return inp.toString();
      }
      return inp;
  }
};
