export const userIs = (user, role) => {
  // !! for converting result to boolean
  /* eslint-disable-next-line no-bitwise */
  return !!(user && user.roleID & role);
};


export const userExact = (user, role) => {
  /* eslint-disable-next-line no-bitwise */
  return user && user.roleID === role;
};
