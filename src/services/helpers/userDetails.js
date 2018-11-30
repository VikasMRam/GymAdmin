export const getUserDetailsFromUAAndForm = ({ userDetails, formData }) => {
  let userDataFromUA = {};
  if (userDetails) {
    userDataFromUA = {
      full_name: userDetails.fullName,
      phone: userDetails.phone,
      medicaid_coverage: userDetails.medicaidCoverage,
      contact_by_text_msg: userDetails.contactByTextMsg,
    };
  }
  let userDataFromForm = {};
  if (formData) {
    userDataFromForm = {
      full_name: formData.name,
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
  return { ...userDataFromUA, ...sanitizedUserDataFromForm };
};
