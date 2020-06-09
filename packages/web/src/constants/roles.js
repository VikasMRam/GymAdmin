export const CUSTOMER_ROLE = 1;
export const PROVIDER_OD_ROLE = 2;
export const AGENT_ND_ROLE = 4;
export const AGENT_ADMIN_ROLE = 8;
export const PLATFORM_ADMIN_ROLE = 128;

export const CUSTOMER_ROLE_PARAM = 'user';
export const PROVIDER_ROLE_PARAM = 'provider';
export const AGENT_ROLE_PARAM = 'agent';
export const PLATFORM_ROLE_PARAM = 'admin';

export const roleNames = {
  [PROVIDER_OD_ROLE]: 'Housing Partner',
  [AGENT_ND_ROLE]: 'Partner Agent',
};
