export const setDisplayName = (Component, displayName = 'Unknown') => {
  Component.displayName = displayName;
  return Component;
};

export * from './color';
export * from './spacing';
export * from './text';
export * from './display';
