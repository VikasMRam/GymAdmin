export const setDisplayName = (Component, displayName = 'Unknown') => {
  Component.displayName = displayName;
  return Component;
};

export * from './snap';
export * from './alignment';
export * from './border';
export * from './color';
export * from './spacing';
export * from './text';
export * from './display';
