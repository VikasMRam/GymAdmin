// clamping in react native is different.
// So just skip this so that we can use withClamping universally
export const withClamping = ({ clamped }) => {
  if (clamped) {
    // eslint-disable-next-line no-console
    console.warn('Use numberOfLines={1} prop for clamping.');
  }
};
