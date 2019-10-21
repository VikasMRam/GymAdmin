export const userIs = (user, role) => {
  /* eslint-disable-next-line no-bitwise */
  return user.role_id & role;
};

