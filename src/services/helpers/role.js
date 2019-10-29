export const userIs = (user, role) => {
  /* eslint-disable-next-line no-bitwise */
  return user.roleID & role;
};

