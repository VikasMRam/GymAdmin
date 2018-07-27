import LookingFor from './LookingFor';
import CareNeeds from './CareNeeds';
import BuyingOrRenting from './BuyingOrRenting';
import MonthlyBudget from './MonthlyBudget';
import CitySearch from './CitySearch';
import LeadFound from './LeadFound';

const stepComponents = {
  LookingFor,
  CareNeeds,
  BuyingOrRenting,
  MonthlyBudget,
  CitySearch,
  LeadFound,
};

export const getStepComponent = (name) => {
  return stepComponents[name];
};
