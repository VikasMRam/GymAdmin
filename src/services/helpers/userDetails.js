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
  if (result.interest) {
    result.interest.push(formData.interest);
  } else {
    result.interest = [formData.interest];
  }
  return result;
};
