export const withPreventDefault = handler => (e) => {
  e.preventDefault();
  handler(e);
};

export const selectFormData = (state, form, defaultValue = null) => (!state.form || !state.form[form])
  ? defaultValue
  : state.form[form].values || defaultValue;

export const trimFormData = (data) => {
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (typeof value === 'string' || value instanceof String) {
      data[key] = value.trim();
    }
  });
};
