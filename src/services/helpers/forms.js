export const withPreventDefault = handler => (e) => {
  e.preventDefault();
  handler(e);
};
