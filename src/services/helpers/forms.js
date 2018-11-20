export const withPreventDefault = handler => (e) => {
  e.preventDefault();
  handler(e);
};

export const selectFormData = (state, form, defaultValue = null) => (!state.form || !state.form[form])
  ? defaultValue
  : state.form[form].values || defaultValue;
