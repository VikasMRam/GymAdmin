export const setDisplayName = (Component, displayName = 'Unknown') => {
  Component.displayName = displayName;
  return Component;
};
