import get from 'lodash/get';

export const getUserDetailsFromUAAndForm = ({ userDetails, formData }) => {
  let userDataFromUA = {};
  if (userDetails) {
    userDataFromUA = {
      full_name: userDetails.fullName,
      email: userDetails.email,
      phone: userDetails.phone,
      medicaid_coverage: userDetails.medicaidCoverage,
      contact_by_text_msg: userDetails.contactByTextMsg,
      interest: userDetails.interest,
      careType: userDetails.careType,
      roomType: userDetails.roomType,
      budget: userDetails.budget,
    };
  }
  let userDataFromForm = {};
  if (formData) {
    userDataFromForm = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      medicaid_coverage: formData.medicaidCoverage,
      contact_by_text_msg: formData.contactByTextMsg,
    };
  }
  const sanitizedUserDataFromForm = {};
  Object.keys(userDataFromForm).forEach((key) => {
    const value = userDataFromForm[key];
    if (value !== undefined) {
      sanitizedUserDataFromForm[key] = value;
    }
  });
  const result = { ...userDataFromUA, ...sanitizedUserDataFromForm };
  if (formData.interest) {
    if (result.interest) {
      result.interest.push(formData.interest);
    } else {
      result.interest = [formData.interest];
    }
  }
  if (formData.careType) {
    result.careType = formData.careType;
  }
  if (formData.roomType) {
    result.roomType = formData.roomType;
  }
  if (formData.budget) {
    result.budget = formData.budget;
  }
  return result;
};

export const medicareToBool = (medicare) => {
  if (medicare === 'not-sure') return null;
  return medicare === 'yes';
};

export const boolToMedicare = (medicare) => {
  if (medicare === null || typeof medicare === 'undefined') return 'not-sure';
  return medicare ? 'yes' : 'no';
};
