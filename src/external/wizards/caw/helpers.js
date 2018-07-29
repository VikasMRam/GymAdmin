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
