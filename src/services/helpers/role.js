import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';

export const userHasAdminRole = (user) => {
  const { roleID } = user;
  return roleID & PLATFORM_ADMIN_ROLE;
};
